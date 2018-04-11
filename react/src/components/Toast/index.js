import React, {Component} from "react";
import PropTypes from "prop-types";
import "../../styles/common/toast.scss";


class Toast extends Component {
  static propTypes = {
    message: PropTypes.string,
    showToast: PropTypes.bool,
    delay: PropTypes.number
  };
  constructor(props) {
    super(props);
    this.state = {
      toastClass: "show",
      showToast123: true,
      delay: 1000
    };
    this.setTimer = this.setTimer.bind(this);
  }
  componentDidMount() {
    this.setTimer();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.showToast) {
      this.setState({showToast123: true});
    }
    this.setTimer();
  }
  componentWillUnmount() {
    this.setState({toastClass: null});
    clearTimeout(this.timer);
  }
  setTimer() {
    if (this.timer != null) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      if (this) {
        this.setState({showToast123: false});
      }
      this.timer = null;
    }, this.props.delay);
  }
  render() {
    return this.state.showToast123 ? (
      <div id="toast123" className="toast123">
        <span>{this.props.message}</span>
      </div>
    ) : null;
  }
}

export default Toast;
