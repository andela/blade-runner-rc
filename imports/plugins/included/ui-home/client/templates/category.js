import { Template } from "meteor/templating";

Template.category.onRendered(function () {
  this.$(".owl-carousel").owlCarousel({
    items: 4,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  });
});
