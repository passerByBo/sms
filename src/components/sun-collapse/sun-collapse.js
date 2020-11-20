import React, { Component } from "react";
import { Button } from 'antd';
import './sun-collapse.css'
const HEIGHT = 55;
export default class SunCollapse extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isUnfold: true
  }
  jsUnfoldSelected = () => {
    const containerHeight = this.containerEle.offsetHeight;
    if (typeof containerHeight !== 'number' || containerHeight === HEIGHT) {
      this.setState({ isUnfold: !this.state.isUnfold });
      return;
    } else if (this.state.isUnfold === true) {
      this.ele.style.height = containerHeight + 'px';
    } else if (this.state.isUnfold === false) {
      this.ele.style.height = HEIGHT + 'px';
      this.ele.style.overflow = 'hidden'
    }
    this.setState({ isUnfold: !this.state.isUnfold });
  }
  render() {
    return (
      <div className={'collapse-container'} ref={ele => this.ele = ele}>
        <div className="container-warp" ref={containerEle => this.containerEle = containerEle}>
          {this.props.children}
          <div className="button-wrap">
            <Button type="link" block onClick={this.jsUnfoldSelected}>
              {this.state.isUnfold ? '展开' : '收缩'}
            </Button></div>
        </div>
      </div>
    );
  }
}
