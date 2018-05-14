import ReactDOM from 'react-dom'
import Modal from 'react-modal';

import createReactClass from'create-react-class'

import './stylesheets/image.css';
import React, { Component } from 'react';


// const file = acceptedFiles.find(f => f)


class SingleImage extends Component {
  constructor(props) {
    super(props);
    this.state ={
        imgWidth: 0,
        imgHeight: 0
    }
  }

  handleClick =() => {
    this.props.onClickFunction(this.props.url, this.state.imgWidth, this.state.imgHeight)
  };

  _onLoad = (e) => {
    this.setState({ imgWidth: e.target.naturalWidth, imgHeight: e.target.naturalHeight});
  }

  render() {
    return (
      <img id={this.props.url} className={this.props.class} src={this.props.url} onLoad={this._onLoad} onClick={this.handleClick}/>

    );
  }
}

export default SingleImage;