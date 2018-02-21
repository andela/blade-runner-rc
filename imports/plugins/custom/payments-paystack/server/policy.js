import {
  BrowserPolicy
} from "meteor/browser-policy-common";

BrowserPolicy.content.allowOriginForAll("*.paystack.co");
BrowserPolicy.content.allowOriginForAll("https://paystack.com/");
BrowserPolicy.content.allowFrameOrigin("https://paystack.com/");
