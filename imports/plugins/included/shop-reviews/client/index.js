import "./templates/shopReview.html";
import "./templates/shopReview.js";
import { registerComponent } from "@reactioncommerce/reaction-components";

import { ShopReview } from "./components";
import { ShopRating } from "./components";


registerComponent("ShopReview", ShopReview);
registerComponent("ShopRating", ShopRating);
