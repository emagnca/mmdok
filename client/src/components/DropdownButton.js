import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class DropdownButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.filename = props.filename;
    console.log(this.filename);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  edit() {
  
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Åtgärder
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Öppna</DropdownItem>
          <DropdownItem>Metadata</DropdownItem>
          <DropdownItem onClick={this.edit()}>Editera</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Skicka som epost</DropdownItem>
          <DropdownItem>Skicka som epost</DropdownItem>
          <DropdownItem>Skicka som epost</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}