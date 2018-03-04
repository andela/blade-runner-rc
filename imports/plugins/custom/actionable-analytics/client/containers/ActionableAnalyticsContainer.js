import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import moment from "moment";
import { DateRange } from "react-date-range";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Orders, Products, ProductReviews } from "/lib/collections";
import { Reaction } from "/client/api";
import * as Transform from "../helpers";
import { TopSelling, Overview, TopRated } from "../components";
import "react-tabs/style/react-tabs.css";

class ActionableAnalyticsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      productReviews: [],
      products: [],
      startDate: moment().subtract(7, "d").format(),
      endDate: moment().format(),
      toggleDateRangeShow: false
    };
  }

  componentWillMount() {
    this.fetchOrders();
    this.fetchProductReviews();
    this.fetchProducts();
  }

  /**
   * Fetch orders with specified dates
   */
  fetchOrders = () => {
    const orders = Orders.find({
      shopId: Reaction.getShopId(),
      createdAt: {
        $gte: new Date(this.state.startDate),
        $lte: new Date(this.state.endDate)
      }
    }).fetch();
    this.setState({ orders });
  }

  /**
   * Fetch product reviews
   */
  fetchProductReviews = () => {
    const productReviews = ProductReviews.find().fetch();
    this.setState({ productReviews });
  }

  /**
   * Fetch all products
   */
  fetchProducts = () => {
    const products = Products.find({ shopId: Reaction.getShopId() }).fetch();
    this.setState({ products });
  }

  /**
   * Handle select change for date picker component
   * @param {Object} range object containing selected dates
   */
  handleSelect = (range) => {
    this.setState({
      startDate: range.startDate.format(),
      endDate: range.endDate.format()
    }, () => {
      this.fetchOrders();
    });
  }

  /**
   * Toggles visibility of date component
   */
  toggleDateRangeShow = () => {
    this.setState({
      toggleDateRangeShow: !this.state.toggleDateRangeShow
    });
  }

  /**
   * Render date section
   */
  dateSection = () => {
    return (
      <div>
        <button
          className="btn btn-default btn-lg mt-3 date-button"
          onClick={this.toggleDateRangeShow}
        >
          {moment(this.state.startDate).format("ll")}
          <i className="fa fa-arrow-right" />
          {moment(this.state.endDate).format("ll")}
        </button>
        {
          this.state.toggleDateRangeShow &&
      <DateRange
        onChange={this.handleSelect}
      />
        }
      </div>
    );
  }

  /**
   * Component render method
  */
  render() {
    return (
      <div className="container">
        <div className="analytics-container">
          <Tabs>
            <TabList>
              <Tab>OVERVIEW</Tab>
              <Tab>TOP SELLING PRODUCTS</Tab>
              <Tab>TOP RATED PRODUCTS</Tab>
            </TabList>

            <TabPanel>
              <div>
                {this.dateSection()}
                <Overview data={Transform.forOverview(this.state.orders)} />
              </div>
            </TabPanel>

            <TabPanel>
              <div>
                {this.dateSection()}
                <TopSelling data={Transform.forTopSelling(this.state.orders)} />
              </div>
            </TabPanel>

            <TabPanel>
              <TopRated topRated={Transform.forTopRated(this.state.products, this.state.productReviews)}/>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

registerComponent("ActionableAnalyticsContainer", ActionableAnalyticsContainer);

export default ActionableAnalyticsContainer;
