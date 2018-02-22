import React, { Component } from "react";
import moment from "moment";
import { DateRange } from "react-date-range";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Orders } from "/lib/collections";
import { transformForBarChart } from "../helpers";
import { BarChartData } from "../components";

class ActionableAnalyticsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      startDate: moment().subtract(7, "d").format("ll"),
      endDate: moment().format("ll"),
      toggleDateRangeShow: false
    };
  }

  componentWillMount() {
    this.fetchOrders();
  }

  fetchOrders = () => {
    const orders = Orders.find().fetch({
      createdAt: {
        $gte: new Date(this.state.startDate),
        $lte: new Date(this.state.endDate)
      }
    });
    this.setState({ orders });
  }

  handleSelect = (range) => {
    this.setState({
      startDate: range.startDate.format("ll"),
      endDate: range.endDate.format("ll")
    }, () => {
      // fetch orders again.
      this.fetchOrders();
    });
  }
  toggleDateRangeShow = () => {
    this.setState({
      toggleDateRangeShow: !this.state.toggleDateRangeShow
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div>
          <button className="btn btn-default btn-lg" onClick={this.toggleDateRangeShow}>
            {this.state.startDate} <i className="fa fa-arrow-right" /> {this.state.endDate}
          </button>
          {
            this.state.toggleDateRangeShow &&
          <DateRange
            onChange={this.handleSelect}
          />
          }
          <BarChartData data={transformForBarChart(this.state.orders)} />
        </div>
      </div>
    );
  }
}

registerComponent("ActionableAnalyticsContainer", ActionableAnalyticsContainer);

export default ActionableAnalyticsContainer;
