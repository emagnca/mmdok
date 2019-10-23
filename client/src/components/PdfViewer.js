//https://www.npmjs.com/package/react-pdf-highlighter

import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';

export default class PdfViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      filename: this.props.data['filename']
    }
  }


  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document
          file={"http://35.228.104.97/view/" + this.state.filename}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Sida {pageNumber} av {numPages}</p>
      </div>
    );
  }
}