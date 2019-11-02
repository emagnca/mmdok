import React, { Component, Fragment }  from 'react';
import FileDrop from 'react-file-drop';

class ReactFileDropDemo extends Component {
  handleDrop = (files, event) => {
    for (var i = 0; i < files.length; i++) { 
      alert(files[i].name);
    }
  }

  render() {
    const styles = { border: '1px solid black', color: 'black', padding: 20 };
    return (
        <div id="react-file-drop-demo" className="clearFix" style={styles}>
          <FileDrop onDrop={this.handleDrop}>
            Drop some files here!
          </FileDrop>
        </div>
      );
  }
}

export default ReactFileDropDemo;