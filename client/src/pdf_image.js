import ReactDOM from 'react-dom'
import createReactClass from'create-react-class'
import './stylesheets/image.css';
import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';


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
        <Document
          file={this.props.pdfFile}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} width={this.props.width}/>
        </Document>
        <p>{pageNumber} of {numPages}</p>
      </div>
      
    );
  }


}

export default PdfImage;