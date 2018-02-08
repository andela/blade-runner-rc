import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";

import { PaystackApi } from "./paystackapi";

const paymentMethod = {
  processor: "Generic",
  storedCard: "Visa 4242",
  paymentPackageId: "vrXutd72c2m7Lenqw",
  paymentSettingsKey: "paystack-payment-method",
  status: "captured",
  mode: "authorize",
  createdAt: new Date()
};


describe("PaystackApi", function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("should return data from ThirdPartyAPI authorize", function () {
    const cardData = {
      name: "Test User",
      email: "a@mail.com"
    };
    const paymentData = {
      currency: "USD",
      total: "19.99"
    };

    const transactionType = "authorize";
    const transaction = PaystackApi.methods.authorize.call({
      transactionType,
      cardData,
      paymentData
    });
    expect(transaction).to.not.be.undefined;
  });

  it("should return risk status for flagged test card", function () {
    const cardData = {
      name: "Test User",
      email: "a@mail.com"
    };
    const paymentData = {
      currency: "USD",
      total: "19.99"
    };

    const transactionType = "authorize";
    const transaction = PaystackApi.methods.authorize.call({
      transactionType: transactionType,
      cardData: cardData,
      paymentData: paymentData
    });

    expect(transaction.riskStatus).to.be.defined;
  });

  it("should return data from ThirdPartAPI capture", function (done) {
    const authorizationId = "abc123";
    const amount = 19.99;
    const results = PaystackApi.methods.capture.call({
      authorizationId,
      amount
    });
    expect(results).to.not.be.undefined;
    done();
  });
});


describe("Submit payment", function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("should call PaystackApi API with card and payment data", function () {
    // this is a ridiculous timeout for a test that should run in subseconds
    // but a bug in the Meteor test runner (or something) seems to make this test stall
    // it actually stalls after the entire test is completed
    this.timeout(30000);
    const cardData = {
      name: "Test User",
      email: "a@mail.com"
    };
    const paymentData = {
      currency: "USD",
      total: "19.99"
    };

    const authorizeResult = {
      saved: true,
      currency: "USD"
    };

    const authorizeStub = sandbox.stub(PaystackApi.methods.authorize, "call", () => authorizeResult);
    const results = Meteor.call("paystackSubmit", "authorize", cardData, paymentData);
    expect(authorizeStub).to.have.been.calledWith({
      transactionType: "authorize",
      cardData: cardData,
      paymentData: paymentData
    });
    expect(results.saved).to.be.true;
  });

  it("should throw an error if card data is not correct", function () {
    const badCardData = {
      name: "Test User",
      email: "a@mail.com"
    };

    const paymentData = {
      currency: "USD",
      total: "19.99"
    };

    // Notice how you need to wrap this call in another function
    expect(function () {
      Meteor.call("paystackSubmit", "authorize", badCardData, paymentData);
    }
    ).to.throw;
  });
});

describe("Capture payment", function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("should call PaystackApi with transaction ID", function () {
    const captureResults = { success: true };
    const authorizationId = "abc1234";
    paymentMethod.transactionId = authorizationId;
    paymentMethod.amount = 19.99;

    const captureStub = sandbox.stub(PaystackApi.methods.capture, "call", () => captureResults);
    const results = Meteor.call("paystack/payment/capture", paymentMethod);
    expect(captureStub).to.have.been.calledWith({
      authorizationId: authorizationId,
      amount: 19.99
    });
    expect(results.saved).to.be.true;
  });

  it("should throw an error if transaction ID is not found", function () {
    sandbox.stub(PaystackApi.methods, "capture", function () {
      throw new Meteor.Error("Not Found");
    });
    expect(function () {
      Meteor.call("paystack/payment/capture", "abc123");
    }).to.throw;
  });
});

describe("Refund", function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("should call PaystackApi with transaction ID", function () {
    const refundResults = { success: true };
    const transactionId = "abc1234";
    const amount = 19.99;
    paymentMethod.transactionId = transactionId;
    const refundStub = sandbox.stub(PaystackApi.methods.refund, "call", () => refundResults);
    Meteor.call("paystack/refund/create", paymentMethod, amount);
    expect(refundStub).to.have.been.calledWith({
      transactionId: transactionId,
      amount: amount
    });
  });

  it("should throw an error if transaction ID is not found", function () {
    sandbox.stub(PaystackApi.methods.refund, "call", function () {
      throw new Meteor.Error("404", "Not Found");
    });
    const transactionId = "abc1234";
    paymentMethod.transactionId =  transactionId;
    expect(function () {
      Meteor.call("paystack/refund/create", paymentMethod, 19.99);
    }).to.throw(Meteor.Error, /Not Found/);
  });
});

describe("List Refunds", function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("should call PaystackApi with transaction ID", function () {
    const refundResults = { refunds: [] };
    const refundArgs = {
      transactionId: "abc1234"
    };
    const refundStub = sandbox.stub(PaystackApi.methods.refunds, "call", () => refundResults);
    Meteor.call("paystack/refund/list", paymentMethod);
    expect(refundStub).to.have.been.calledWith(refundArgs);
  });

  it("should throw an error if transaction ID is not found", function () {
    sandbox.stub(PaystackApi.methods, "refunds", function () {
      throw new Meteor.Error("404", "Not Found");
    });
    expect(() => Meteor.call("paystack/refund/list", paymentMethod)).to.throw(Meteor.Error, /Not Found/);
  });
});

