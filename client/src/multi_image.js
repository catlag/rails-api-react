import ReactDOM from 'react-dom'
import createReactClass from'create-react-class'

import './stylesheets/image.css';
import SingleImage from './single_image';

import React, { Component } from 'react';

class MultiImage extends Component {
  render() {

    return (
      <div className='multi-images-wrapper grid-item grid-item--width2 grid-item--height2'>
        <div className='multi-grid-wrapper'>
          <p className='multi-project-title' >&nbsp;&nbsp;{this.props.projectName}&nbsp;&nbsp;</p>
          <div className='multi-grid'>
            {this.props.urls.map (image =>  <SingleImage url={image} class='grid-item-multi mutli-image' onClickFunction={this.props.onClickFunction}/>)}
          </div>
        </div>
      </div>

    );
  }
}

export default MultiImage;