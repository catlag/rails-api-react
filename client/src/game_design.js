import ReactDOM from 'react-dom'
import createReactClass from'create-react-class'
import React, { Component } from 'react';
import Masonry from'masonry-layout';
import Modal from 'react-modal';

import './stylesheets/image.css';
import SingleImage from './single_image';
import MultiImage from './multi_image';
import PdfImage from './pdf_image';
import pdfFile from './pdf/linda_martinez_resume.pdf'
import pagePdfFile from './pdf/many_page_pdf.pdf'





const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    border                : 'none',
    padding               : 'none',
    right                 : 'auto',
    bottom                : 'auto',
    heigth                : '90%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

var style = {
    height: 'auto',
    width: 'auto',
    writable: true
  };

class GameDesign extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        width       : 0,
        height      : 0,
        url         : "",
        modalIsOpen : false,
        style       : {
          height : 'auto',
          width  : 'auto'
        },
        directionStyle : {
          height : 'auto',
          width  : 'auto',
        },
        pdfWidth    : 200,
        imageModal  : true,
        pdfModal    : false,
        pdfFile     : ''
      };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
      this.updateWindowDimensions();
      var width = 200,
      height = 190;
      if (window.innerWidth < 700){
        width = 100;
        height = 90
      }
      window.addEventListener('resize', this.updateWindowDimensions);
      var elem = document.querySelector('.grid');
      var msnry = new Masonry( elem, {
        itemSelector: '.grid-item',
        columnWidth: width
      });

      var multiGrid = document.querySelector('.multi-grid');
      var msnryMulti = new Masonry( multiGrid, {
        itemSelector: '.grid-item-multi',
        columnWidth: width,
        columnHeight: height,
        
      });
    }

    componentWillMount() {
      Modal.setAppElement('#images-modal')

    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
      var width = 200;
      if (window.innerWidth < 700){
        width = 80;
      }
      this.setState({ width: window.innerWidth, height: window.innerHeight, pdfWidth:  width});
      }

    imageResize = (imgWidth, imgHeight) => {
      var heightDifference = 50
      if (window.innerWidth < 700){
        heightDifference = 175;
      }
      var tooTall = (imgWidth >= this.state.width);
      var tooWide = (imgHeight >= this.state.height);
      if (tooTall || tooWide){
          this.setState((prevState) => ({
            style:{
              width  : 'auto'-40,
              height : (parseInt(prevState.height) - heightDifference )
            },
            directionStyle:{
              height : (parseInt(prevState.height) - heightDifference ),
              width  : "50%"
            }
          }))
      }else{
        this.setState((prevState) => ({
          directionStyle:{
            height : imgHeight,
            width  : (imgWidth /2)
          }
        }));
      }
    }

    openModal = (imageUrl, imgWidth, imgHeight) => {
      if (imgWidth && imgHeight){
        this.imageResize(imgHeight, imgHeight)
        this.setState((prevState) => ({
          url         : imageUrl,
          modalIsOpen : true,
          imageModal  : true,
          pdfModal    : false,
        }));
      }else{
        this.setState((prevState) => ({
          pdfFile     : imageUrl,
          modalIsOpen : true,
          imageModal  : false,
          pdfModal    : true,
          style       :{
            height : (prevState.height -50),
            width  : (prevState.width /1.5)
          },
          directionStyle : {
            height: (prevState.height -50),
            width  : (prevState.width /1.5) /2
          }
        }));
      }
      

    }
   
    afterOpenModal() {
      // this.subtitle.style.color = '#f00';
    }
   
    closeModal = () => {
      this.setState({
        modalIsOpen : false
      });
    }

    nextClick = (e) => {
      var image = document.getElementById(this.state.url).nextSibling != null ? document.getElementById(this.state.url).nextSibling : document.getElementById(this.state.url).parentElement.parentElement.parentElement.nextSibling;
      if (image && image.classList.contains('multi-images-wrapper')){
        image = image.children[0].children[1].children[0]
      }
      if (image){
        this.imageResize(image.naturalWidth, image.naturalHeight)
        this.setState((prevState) => ({
          url: image.id
        }));
      }else{
        console.log('none')
      }
      console.log('next image')
    }

    previousClick = (e) => {
      var image = document.getElementById(this.state.url).previousSibling != null ? document.getElementById(this.state.url).previousSibling : document.getElementById(this.state.url).parentElement.parentElement.parentElement.previousSibling;
      if (image && image.classList.contains('multi-images-wrapper')){
        image = image.children[0].children[1].children[0]
      }
      if (image){
        this.imageResize(image.naturalWidth, image.naturalHeight)
        this.setState((prevState) => ({
          url: image.id
        }));
      }else{
        console.log('none')
      }
      console.log('previous image')
    }

  render() {
    const imgModal = this.state.imageModal === true ? 'active' : 'hidden'
    const pdfModal = this.state.pdfModal === true ? 'active' : 'hidden'
    console.log(this.state.pdfWidth)
    const LudumDare37= ['https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d52124a694ef1959e5b0/1518392609351/roguesprites.gif?format=300w','https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d51e652deaf340051476/1518392607084/SpiderMonster_run_hires.gif?format=300w', 'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d5198165f5c700b309ea/1518392606301/PortPage.png?format=1000w']
    const NearEarthObject = ['https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d6da652deaf340057c89/1518393118651/Theia_TitleHUD-01.png?format=750w','https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d69e71c10b61a5f28984/1518393020441/Theia_HUD_exampleB.png?format=750w']
    const ZombieHouse = ['https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d906ec212d8118159e59/1518393609093/ZombiehouseWebPortpage.png?format=750w','https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d90e71c10b61a5f32002/1518393622667/?format=750w']
    return (
      <div className='grid-wrapper'>
        <div className='grid-pad'></div>
        <div className='images-wrapper grid'>
          <PdfImage className="grid-item single-image" pdfFile={pdfFile} onClickFunction={this.openModal}  width={this.state.pdfWidth}/ >
          <MultiImage projectName ={'LudumDare 37' } urls={LudumDare37}  onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d48c8165f5c700b2e8d4/1518392465630/Droplet_conceptpage_2.png?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d47cc830253b8640ce8b/1518392453509/BreakoutWebConceptSheet.png?format=750w'}  onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5add6d83f950b79d823da155/1524460959259/lineup.png?format=2500w'} onClickFunction={this.openModal}/>
          <PdfImage className="grid-item single-image" pdfFile={pagePdfFile} onClickFunction={this.openModal}  width={this.state.pdfWidth}/ >
          
          <MultiImage projectName ={'N.E.O Near Earth Objects'} urls={NearEarthObject} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5ac125aa1ae6cf734d8e9301/1522607578636/?format=2500w'} onClickFunction={this.openModal}/>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className='imageModal'>
              <div className='previous' style ={this.state.directionStyle} onClick={this.previousClick}></div>
              <img style ={this.state.style} src={this.state.url} className={imgModal}/>
              <object data={this.state.pdfFile} type="application/pdf" className={pdfModal} style ={this.state.style}>
                <embed src={this.state.pdfFile}  type="application/pdf" />
              </object>
              <div className='next' style ={this.state.directionStyle} onClick={this.nextClick}></div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }


}

export default GameDesign;