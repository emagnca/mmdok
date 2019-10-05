//https://www.npmjs.com/package/react-pdf-highlighter

import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
 
export default class PdfViewer extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }
 
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
 
    return (
      <div>
        <Document
          file="./FolksamRekvisition.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Sida {pageNumber} av {numPages}</p>
      </div>
    );
  }
}