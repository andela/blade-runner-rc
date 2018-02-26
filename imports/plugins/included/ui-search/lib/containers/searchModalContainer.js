import React, { Component } from "react";
import { compose } from "recompose";
import _ from "lodash";
import { Reaction } from "/client/api";
import { registerComponent } from "@reactioncommerce/reaction-components";
import SearchSubscription from "./searchSubscription";

function tagToggle(arr, val) {
  if (arr.length === _.pull(arr, val).length) {
    arr.push(val);
  }
  return arr;
}

const wrapComponent = (Comp) => (
  class SearchModalContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collection: "products",
        value: localStorage.getItem("searchValue") || "",
        renderChild: true,
        facets: [],
        sortKey: {},
        filterKey: null
      };
    }

    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        this.setState({
          renderChild: false
        });
      }
    }

    handleChange = (event, value) => {
      localStorage.setItem("searchValue", value);

      this.setState({ value });
    }

    handleClick = () => {
      localStorage.setItem("searchValue", "");
      this.setState({ value: "" });
    }

    handleAccountClick = (event) => {
      Reaction.Router.go("account/profile", {}, { userId: event._id });
      this.handleChildUnmount();
    }

    handleTagClick = (tagId) => {
      const newFacet = tagId;
      const element = document.getElementById(tagId);
      element.classList.toggle("active-tag");

      this.setState({
        facets: tagToggle(this.state.facets, newFacet)
      });
    }

    handleToggle = (collection) => {
      this.setState({ collection });
    }

    handleChildUnmount = () => {
      this.setState({ renderChild: false });
    }

    handleSort = (id) => {
      const sortValue = document.getElementById(id).value;
      switch (sortValue) {
        case "Price: low-high":
          this.setState(() => ({
            sortKey: { "price.min": 1 }
          }));
          break;
        case "Price: high-low":
          this.setState(() => ({
            sortKey: { "price.max": -1 }
          }));
          break;
        case "newest":
          this.setState(() => ({
            sortKey: { createdAt: -1 }
          }));
          break;
        case "oldest":
          this.setState(() => ({
            sortKey: { createdAt: 1 }
          }));
          break;
        case "digital":
          this.setState(() => ({
            filterKey: "digital"
          }));
          break;
        case "physical":
          this.setState(() => ({
            filterKey: "physical"
          }));
          break;
        case "allTypes":
          this.setState(() => ({
            filterKey: null
          }));
          break;
        default:
          this.setState({
            sortKey: {}
          });
      }
    }

    render() {
      return (
        <div>
          {this.state.renderChild ?
            <div className="rui search-modal js-search-modal">
              <Comp
                handleChange={this.handleChange}
                handleClick={this.handleClick}
                handleToggle={this.handleToggle}
                handleAccountClick={this.handleAccountClick}
                handleTagClick={this.handleTagClick}
                value={this.state.value}
                unmountMe={this.handleChildUnmount}
                handleSort={this.handleSort}
                searchCollection={this.state.collection}
                facets={this.state.facets}
                sortKey={this.state.sortKey}
                filterKey={this.state.filterKey}
              />
            </div> : null
          }
        </div>
      );
    }
  }
);

registerComponent("SearchSubscription", SearchSubscription, [wrapComponent]);

export default compose(wrapComponent)(SearchSubscription);
