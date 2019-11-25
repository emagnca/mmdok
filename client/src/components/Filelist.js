import React, { Component, Fragment } from 'react';
import { Button, ButtonGroup, Input, FormGroup, Label, Table } from 'reactstrap';
import DragAndDrop from './DragAndDrop';
import '../styles/Filedrop.css';
import axios from 'axios';

export default class Filelist extends Component {

  state = {
    files: [],
    showFileBrowser: false
  }

  constructor(props) {
    super(props);
  }

  importFile(e) {
    this.handleDrop(e.target.files);
  }

  handleDropNew = (files) => {
    let fileList = this.state.files;
    for (var i = 0; i < files.length; i++) {
      if (!files[i]) return
      fileList.push(files[i]);
    }
    this.setState({ files: fileList });
    this.submitFiles();
  }

  handleDrop = (files) => {
    if (!files) return;
    let fileList = this.state.files;
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return
      fileList.push(files[i]);
    }
    this.setState({ files: fileList })
    //this.submitFiles();
  }

  submitFiles() {
    let formData = new FormData();
    for (var i = 0; i < this.state.files.length; i++) {
      const file = this.state.files[i];
      const blob = new Blob([file], { type: file.type });
      formData.append('file', file, file.name);
    }
    axios.post('http://35.228.104.97/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(function () {
      alert('SUCCESS!!');
    })
      .catch(function () {
        alert('FAILURE!!');
      });
  }


  onFileBrowse = (e) => {
    //this.setState({showFileBrowser: true});
    document.getElementById('fileInput').click();
  }

  rows = () => {
    return this.state.files.map((file, index) => {
    return (
      <tr key={index}>
        <td>{file.name}</td>
        <td>{file.type}</td>
        <td>{Math.round(file.size/1028)}</td>
        <td style={{color:'red'}}>&#10006;</td>
      </tr>
    )
    })
  }
  //<td style={{color:'green'}}>&#10004;</td>
  //

  extraSpace = () => {
    const row = <tr><td><br/></td><td><br/></td><td><br/></td><td><br/></td></tr>;
      switch(this.state.files.length) {
        case 0: return <Fragment>{row}{row}{row}</Fragment>
        case 1: return <Fragment>{row}{row}</Fragment>
        case 2: return <Fragment>{row}</Fragment>
    }
  }


  render = () => {
    const styles = { textAlign: 'center', borderStyle: 'double', padding: '10px' };
    const styles2 = { display: 'none' };

    return (
      <Fragment>
        <DragAndDrop handleDrop={this.handleDrop}>
          <div style={styles}>
            <h3>Droppa filer här eller klicka på 'Välj fil'</h3>
            <FormGroup>
              <Input type="file" id="fileInput" style={styles2} multiple onChange={this.importFile.bind(this)} />
              <Button color="primary" onClick={this.onFileBrowse}>Välj fil</Button>
            </FormGroup>
            <Table striped hover>
              <thead>
                <tr><td>Filnamn</td><td>Mimetype</td><td>Storlek(MB)</td><td>Skickad</td></tr>
              </thead>
              <tbody>
                {this.rows()}
                {this.extraSpace()}
              </tbody>
            </Table>
            <ButtonGroup>
      <Button color="success">Skicka</Button>
      <Button color="danger">Rensa</Button>
      </ButtonGroup>
          </div>
        </DragAndDrop>
      </Fragment>
    );
  }
}

const extraSpace = () => {

} 
/*
<input type="file" id="fileLoader" name="files" title="Load File" />
<input type="button" id="btnOpenFileDialog" value = "Click Me !!!" onclick="openfileDialog();" />

function openfileDialog() {
    $("#fileLoader").click();
}

#fileLoader
{
    display:none;
}
*/
