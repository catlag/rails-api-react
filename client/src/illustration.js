import ReactDOM from 'react-dom'
import createReactClass from'create-react-class'
import React, { Component } from 'react';
import Masonry from'masonry-layout';
import Modal from 'react-modal';

import './stylesheets/image.css';
import SingleImage from './single_image';
import MultiImage from './multi_image';
import PdfImage from './pdf_image';
import AddForm from './add_form'
import pdfFile from './pdf/linda_martinez_resume.pdf'
import pagePdfFile from './pdf/many_page_pdf.pdf'

import ComponentStore from './stores/ComponentsStore';


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

class Illustaration extends Component {
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
        pdfFile     : '',
        editMode    : false,
        childrenComponents    : []
      };
      this.getComponents.bind(this)
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {

      this.getComponents()

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



    getComponents () {
      ComponentStore.getComponents({type:'illustration'}).then(function(data){
        let components = ComponentStore.cachedComponents()
         this.setState({
          childrenComponents: components,
        });
      }.bind(this))
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

    edit = () => {
     this.setState((prevState) => ({
          editMode : !prevState.editMode,
        }))
    }

    addComponent = (type, urls) => {

      // console.log(type, urls)
      var component = {type: type, urls: urls}
      // console.log(component)
      var components = this.state.childrenComponents
      components.push(component)
      this.setState((prevState) => ({
        childrenComponents : components,
      }))
      // console.log(this.state.childrenComponents)
    }

  render() {
    const imgModal = this.state.imageModal === true ? 'active' : 'hidden'
    const pdfModal = this.state.pdfModal === true ? 'active' : 'hidden'
    const children = []
    console.log(this.state.childrenComponents.length)
    for (var i = 0; i < this.state.childrenComponents.length; i += 1) {
      console.log(this.state.childrenComponents[i])
      if (this.state.childrenComponents[i].name === 'single'){
        children.push(<SingleImage key={i} number={i} class='grid-item single-image' url={this.state.childrenComponents[i].urls} onClickFunction={this.openModal}/>);
      }
      console.log(children)
    };


    const urls3 = ['https://i.imgur.com/mEHyl.jpg','https://i.imgur.com/cnE57.jpg','https://i.imgur.com/NA9RU.jpg']
    const urls5 = ['https://i.imgur.com/v2ebb.jpg','https://i.imgur.com/94NJP.jpg','https://i.imgur.com/bBbRT.jpg','https://i.imgur.com/4Za7M.jpg','https://i.imgur.com/1qaRz.jpg']
    const urls = ['https://i.imgur.com/17BFu.jpg','https://i.imgur.com/yy7iq.jpg','https://i.imgur.com/szZlA.jpg','https://i.imgur.com/OC5Cc.jpg']
    return (
      <div className='grid-wrapper'>

          <li>
            <a
              style={{ cursor: 'pointer' }}
              onClick={this.edit}
            >
              Edit
            </a>
          </li>

        {
          this.state.editMode &&(
            <AddForm onClickFunction={this.addComponent}/>
          )
        }
        <div className='grid-pad'></div>
        <div className='images-wrapper grid'>
         {children}
          {/*<PdfImage className="grid-item single-image" pdfFile={pdfFile} onClickFunction={this.openModal}  width={this.state.pdfWidth}/ >
          <SingleImage class="grid-item single-image" url={'https://apf4jw.bn.files.1drv.com/y4mCktIp7eQueXltUGy3JoEX9lC2oXeU9D7SbbwehahwS-5L-2XSV_zzr4BF2TzzMu_OV77r1fKGTXGL84QMOIHJuSYmEtqIKvwNuOQQVQgBGBYLX3Jqw-KxCpM6W3qZG1pu-hVBjMsuY8cRDAonrv00vRIu8s_LnF9ppz8RPkwlBOQXIOwbDPr2hxTi_CPD2IkFXEfm4t11aWCe9QZoBgYOQ?width=1000&height=1545&cropmode=none'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80cc10e4966bd4a43a8ad7/1518390290349/TheGatheringStormFinal_web.jpg?format=750w'}  onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80caa18165f5c700b06948/1518389926761/VeiledOasisweb.png?format=750w'} onClickFunction={this.openModal}/>
          <PdfImage className="grid-item single-image" pdfFile={pagePdfFile} onClickFunction={this.openModal}  width={this.state.pdfWidth}/ >
          
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80ca15e4966bd4a43a09df/1518389785299/RangersWeb-2013Final.png?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5ac019842b6a28a926068bf3/1522538891210/DuskPatrolREDOWEB.png?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80cce0f9619ab1a97736a0/1518390503329/GalvanicBindingweb.png?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80cf0e71c10b61a5f0ac8b/1518391094046/?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80cfa5ec212d81181359fc/1518391208756/SmaugfinalREDOWEB.png?format=1000w'} onClickFunction={this.openModal}/>

          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d11c8165f5c700b21408/1518391587682/ForestCaveWEB.jpg?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d13ae2c48393c510f7f9/1518391627536/MidnightLairEnvironBWQWEB.png?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80cdadc830253b863f1b38/1518390737454/GoblinoftheRocketry_ENTRY_lighter.png?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5ac018e403ce648731a15740/1522538731200/?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d23b8165f5c700b25a67/1518391873629/Canyon.png?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5ac017d08a922d9f463c0f3e/1522538450966/?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5ac017f488251bcf7a29484e/1522538489237/MountainscapeWEB.jpg?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5ac018bd575d1f2de643556b/1522538693060/ObsidianTundrarecropweb.png?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5a80d2619140b73f5d4d2600/1518391909977/ProtoCaveWEB.jpg?format=750w'} onClickFunction={this.openModal}/>
          <SingleImage class="grid-item single-image" url={'https://static1.squarespace.com/static/568850517086d7b18186c30b/t/5ac01884aa4a998a3b7477a9/1522538684525/?format=750w'} onClickFunction={this.openModal}/>
          <MultiImage projectName ={'Project 1' } urls={urls3}  onClickFunction={this.openModal}/>
          <MultiImage projectName ={'Project 2'} urls={urls} onClickFunction={this.openModal}/>
          <MultiImage  projectName ={' Project 3'} urls={urls} onClickFunction={this.openModal}/>
          <MultiImage  projectName ={' Project 4'} urls={urls5} onClickFunction={this.openModal}/>*/}
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

export default Illustaration;