import ReactDOM from 'react-dom'
import createReactClass from'create-react-class'
import './stylesheets/image.css';
import './stylesheets/illustration.css';
import React, { Component } from 'react';

import SingleImage from './single_image';
import MultiImage from './multi_image';
import Masonry from'masonry-layout';



class ImageModal extends Component {
    constructor(props) {
      super(props);
    }

  changeImageSource = (source) => {

  }

  render() {

    return (
      <div id='images-modal'>
        <img src={this.props.url}/>
      </div>
      
    );
  }


}

export default ImageModal;