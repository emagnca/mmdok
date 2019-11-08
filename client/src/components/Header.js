import React, { Component } from 'react';
import classnames from 'classnames';
import logo from '../edoklogo.jpg';

import {
  Container, Row, Col, Form, Input, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const AVATAR = 'https://scontent-arn2-2.xx.fbcdn.net/v/t1.0-1/c25.0.150.150a/15148_3941206343959_900959515_n.jpg?_nc_cat=109&_nc_oc=AQn7s8RJPFy6ye_FD1lsfreT8xG2gVcpyHyTQHkfPxuGK1b-jJlbe5ek4DXE7OkdPSFSAGk9eZCalLkqr_yCgD51&_nc_ht=scontent-arn2-2.xx&oh=a59d2c145f6646cff2ef7a9c70e37fdf&oe=5E2D1787';

class Header extends Component {

  constructor(props) {
    super(props);
    this.filter = props.filter;
    this.showSearch = props.showSearch;
    this.showWrite = props.showWrite;
  }
  
  handleKeyUp = (e) => {
    this.filter(e.target.value);
  }

    render = () => {
      return (
    <header>
      <Navbar fixed="top" color="light" light expand="xs" className="d-flex border-bottom border-gray bg-white" style={{ height: 80 }}>
        <Container>
          <Row noGutters className="position-relative w-100 align-items-center">

            <Col className="d-flex d-lg-flex justify-content-start">
              <Nav className="mrx-auto" navbar tabs>

                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="/">
                    <img src={AVATAR} alt="avatar" className="img-fluid rounded-circle" style={{ width: 36 }} />
                  </NavLink>
                </NavItem>

                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" onClick={() => { this.showSearch(); }}>Sökning</NavLink>
                </NavItem>

                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" onClick={() => { this.showWrite(); }}>Inläsning</NavLink>
                </NavItem>

                <UncontrolledDropdown className="d-flex align-items-center" nav inNavbar>
                  <DropdownToggle className="font-weight-bold" nav caret>Hjälp</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Dokumentation</DropdownItem>
                    <DropdownItem>Support</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Om MMDok</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                </Nav>
            </Col>

            <Col className="d-flex justify-content-xs-start justify-content-lg-center">
              <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 80 }}>
                <img src={logo} alt="logo" className="position-relative img-fluid" />
              </NavbarBrand>
            </Col>

            <Col className="d-flex d-lg-flex justify-content-end">
              <Form inline>
                <Input type="text" className="mr-3" placeholder="Sök metadata" onKeyUp={(v) => this.handleKeyUp(v)} />
              </Form>
            </Col>

          </Row>
        </Container>
      </Navbar>
    </header>
      );
  }
}


export default Header;
