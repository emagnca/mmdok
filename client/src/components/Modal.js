import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PdfViewer from "./PdfViewer";
import PropTypes from 'prop-types';

class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      size: 'modal-xl',
      body: ''
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle(data) {
    this.setState({
      modal: !this.state.modal,
      body: this.getMetadata(data),
      document: this.getDocument()
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  hide = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
//        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>


  getTableContent(data){
    const arr = [];
    for (var property in data) {
      arr.push(<tr><td style={{textAlign: "right"}}>{property}:</td><td style={{textAlign: "left"}}>{data[property]}</td></tr>);
    }
    return arr.map((row, index) => {
      return row
    })
  }


  getMetadata(data){
    return <table>
      {this.getTableContent(data)}
         </table>

  }

  getDocument(){
    return <PdfViewer />
  }

  /*
  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Dokumenttitel</ModalHeader>
          <ModalBody>
            {this.state.body}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.hide}>Visa dokument</Button>{' '}
            <Button color="secondary" onClick={this.hide}>Stäng</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
*/

render() {
  return (
    <div>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Dokumenttitel</ModalHeader>
        <ModalBody>
          {this.state.body}
          <br />
          <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
            <ModalBody>{this.state.document}</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleNested}>Visa metadata</Button>{' '}
              <Button color="secondary" onClick={this.toggleAll}>Stäng</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleNested}>Visa dokument</Button>{' '}
          <Button color="secondary" onClick={this.hide}>Stäng</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
}


export default MyModal;