import ReactDOM from 'react-dom'
import createReactClass from'create-react-class';
import './stylesheets/image.css';


import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="about">
          <div className='title-wrapper'>
            <p className='title'>About</p>
          </div>
        <div className='about-content-wrapper'>
          <div className='profile-image-wrapper'>
            <img src="https://i.imgur.com/DKkitTR.jpg"/>
          </div>
          <div className='about-info-wrapper'>
            <article>
              <p className='about-text'>
                Aenean at posuere nisl. Integer scelerisque turpis ex, quis finibus metus egestas et. 
                Pellentesque vitae porta ex. Proin ante dui, eleifend cursus odio ut, imperdiet consequat velit.
                In elementum pretium felis non commodo. Aliquam erat volutpat. Aliquam ac tincidunt elit, nec mollis eros.
                Donec at velit orci. Integer nunc tellus, tempus non ex id, egestas porttitor velit.
                Nulla sodales, leo quis congue congue, lorem nulla fermentum tellus, vel fermentum ligula ex vitae arcu.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
              </p>
              <p className='about-text'>
                Mauris vel pharetra orci. Cras molestie venenatis purus, vitae faucibus magna pulvinar eu.
                Phasellus sed dignissim massa. Proin enim est, ornare ac lectus ac, imperdiet posuere urna.
                Sed eget bibendum est, vitae viverra risus. Nullam interdum pellentesque tortor a commodo.
                Pellentesque mollis mollis enim finibus imperdiet. Donec congue in turpis vitae posuere.
                Praesent gravida porttitor imperdiet. Donec vitae tortor lacinia, pharetra ipsum sed, molestie risus
              </p>
            </article>
            <div className='contact-wrapper'>
              <a href="#">
                <img src="https://i.imgur.com/mVEdSuq.png"/>

              </a>
              <a href="#">
                <img src="https://i.imgur.com/NMgURnG.png"/>
              </a>
               <a href="#">
                <img src="https://i.imgur.com/FTVYpTk.png"/>
              </a>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default About;