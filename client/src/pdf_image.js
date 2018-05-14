import ReactDOM from 'react-dom'
import createReactClass from'create-react-class'
import './stylesheets/image.css';
import React, { Component } from 'react';
// import { Document, Page } from 'react-pdf';


class PdfImage extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }
 
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

   handleClick =() => {
    this.props.onClickFunction(this.props.pdfFile, null, null)
  };

  render() {
    const { pageNumber, numPages } = this.state;


    return (
      <div className={this.props.className} onClick={this.handleClick}>
        <object data={this.props..pdfFile} type="application/pdf" >
          <embed src={this.props.pdfFile}  type="application/pdf" />
        </object>
      </div>
      
    );
  }


}

export default PdfImage;