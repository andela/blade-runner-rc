import { Reaction } from "/client/api";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";
import { Meteor } from "meteor/meteor";
import { StaticPages } from "/lib/collections";

Template.staticPages.onRendered(() => {
  /* global tinymce */
  tinymce.init({
    selector: "textarea.spform",
    height: 500,
    theme: "modern",
    skin_url: "/packages/teamon_tinymce/skins/lightgray", // eslint-disable-line
    plugins:
      `print preview fullpage searchreplace
        autolink directionality visualblocks visualchars fullscreen
        image link media template codesample table charmap hr pagebreak nonbreaking
        anchor toc insertdatetime advlist lists textcolor
        wordcount imagetools contextmenu colorpicker textpattern`,
    toolbar1:
      `formatselect | bold italic strikethrough forecolor backcolor | link
      | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat`
  });
});

Template.staticPagesPanel.onCreated(function () {
  this.autorun(() => {
    this.subscribe("StaticPages");
  });
});

Template.staticPagesPanel.helpers({
  staticPages() {
    const instance = Template.instance();
    if (instance.subscriptionsReady()) {
      return StaticPages.find({
        shopId: Reaction.getShopId()
      });
    }
  }
});

Template.staticPagesPanel.events({
  "click .deletePage"(event) {
    event.preventDefault();
    event.stopPropagation();

    // confirm delete
    Alerts.alert({
      title: "Remove Static Page?",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes"
    }, (confirmed) => {
      if (confirmed) {
        const _id = $(event.currentTarget).parents("tr").attr("id");
        Meteor.call("deletePage", _id);
      }
      return false;
    });
  },

  "click .editPage"(event) {
    event.preventDefault();
    event.stopPropagation();

    // Get ID of the page and then retrieve from the database
    const _id = $(event.currentTarget).parents("tr").attr("id");
    const pageDetails = StaticPages.find({ _id }).fetch();

    // Set the page form to values gotten from the form for editing
    $(".static-page").find("#sp-name").val(pageDetails[0].pageName);
    $(".static-page").find("#sp-url").val(pageDetails[0].pageAddress);
    $(".static-page").find("#sp-show").prop("checked", pageDetails[0].isEnabled === true ? true : false);
    $(".static-page").find(".edit-page-data").attr("id", pageDetails[0]._id);
    tinymce.activeEditor.setContent(pageDetails[0].pageContent);

    $(".static-page").find(".save-static-page").html("Update Page");

    // Focus section of page to the form
    $("#main").animate({
      scrollTop: $(".static-page").offset().top
    }, 800);
  }
});

Template.staticPagesForm.events({
  "submit form": (event) => {
    event.preventDefault();
    const field = event.target;
    const pageName = field.name.value;
    const pageAddress = field.url.value;
    const pageContent = field.content.value;
    const isEnabled = $("#sp-show").is(":checked") ? true : false;
    const userId = Meteor.userId();
    const shopId = Reaction.getShopId();
    let createdAt = new Date();
    const updatedAt = new Date();

    if ($(".static-page").find(".edit-page-data").attr("id") === undefined) {
      Meteor.call("insertPage", pageName, pageAddress, pageContent, userId,
        shopId, isEnabled, createdAt, function (err) {
          if (err) {
            Alerts.toast(err.message, "error");
          } else {
            Alerts.toast("Page Successfully Created", "success");
          }
        });
    } else {
      const _id = $(".static-page").find(".edit-page-data").attr("id");
      const pageDetails = StaticPages.find({ _id }).fetch();
      if (pageDetails.length > 0) {
        createdAt = pageDetails[0].createdAt;
        // Update the data in the database
        Meteor.call("updatePage", _id, pageName, pageAddress, pageContent, userId,
          shopId, isEnabled, createdAt, updatedAt, function (err) {
            if (err) {
              Alerts.toast(err.message, "error");
            } else {
              Alerts.toast("Page Successfully Modified", "success");
            }
          });
      } else {
        Alerts.toast("Oops! Page Not Found, Please create a new Static Page", "error");
      }
      $(".static-page").find(".edit-page-data").attr("id", "");
      $(".static-page").find(".save-static-page").html("Create Page");
    }

    field.name.value = "";
    field.url.value = "";
    tinymce.activeEditor.setContent("");
    $(".static-page").find("#sp-show").prop("checked", false);
  }
});

