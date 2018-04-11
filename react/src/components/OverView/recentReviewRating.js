import React, {Component} from "react";
import {ButtonToolbar, Button} from "react-bootstrap";
import "../../styles/common/overView.scss";
import PropTypes from "prop-types";

export default class RecentReviewRating extends Component {
  static propTypes = {
    noofstars: PropTypes.number,
    ratedStar: PropTypes.number
  };
  render() {
    const numberOfStar = this.props.noofstars;

    const Stars = [];

    for (let i = 0; i < numberOfStar; i += 1) {
      Stars.push(
        this.props.ratedStar > i ? (
          <Button bsStyle="link" className="starButtonActive">
            <span className="glyphicon glyphicon-star" />
          </Button>
        ) : (
          <Button bsStyle="link" className="starButton" >
            <span className="glyphicon glyphicon-star" />
          </Button>
        )
      );
    }

    return <ButtonToolbar className="starButtonToolbar">{Stars}</ButtonToolbar>;
  }
}
