//https://www.npmjs.com/package/react-pdf-highlighter

import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { Button } from 'reactstrap';

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

  forward = () => {
    if (this.state.pageNumber < this.state.numPages)
      this.setState({ pageNumber: this.state.pageNumber + 1 });
  }

  backward = () => {
    if (this.state.pageNumber > 1)
      this.setState({ pageNumber: this.state.pageNumber - 1 });
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Button color="secondary" onClick={this.forward}>&#187;</Button>{' '}
        <Button color="secondary" onClick={this.backward}>&#171;</Button>
        <p>Sida {pageNumber} av {numPages}</p>
        <Document
          file={"http://35.228.104.97/view/" + this.state.filename}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <Button color="secondary" onClick={this.forward}>&#187;</Button>{' '}
        <Button color="secondary" onClick={this.backward}>&#171;</Button>
        <p>Sida {pageNumber} av {numPages}</p>
      </div>
    );
  }
}