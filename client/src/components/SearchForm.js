import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class SearchForm extends React.Component {

  config =
    [
      {
        "name": "Sakskador",
        "fields":
          [
            {
              "name": "Skadenummer",
              "id": "Skadenummer",
              "type": "text",
              "placeholder": "FF12345678"
            },
            {
              "name": "Dokumenttyp",
              "id": "Dokumenttyp",
              "type": "select",
              "values": ["Typ1", "Typ2", "Typ3"]
            }
          ]
      },
      {
        "name": "Livskador",
        "fields":
          [
            {
              "name": "Kundnummer",
              "id": "Kundnummer",
              "type": "text",
              "placeholder": "ABC123456"
            }
          ]
      }
    ]

  documentTypes = new Map();

  constructor(props) {
    super(props);
    this.search = props.search;
    this.types = {};
    this.config.map(item => { this.documentTypes[item.name] = item.fields; });
    this.docType = this.documentTypes['Sakskador'];
    this.state = {
      form: this.docType.map((item, index) => { return this.getForm(item); })
    };
  }

  getTextForm(item) {
    return (
      <FormGroup key={item.id}>
        <Label>{item.name}</Label>
        <Input type="text" id={item.id} placeholder={item.placeholder} />
      </FormGroup>
    );
  }

  getSelectForm(item) {
    return (
      <FormGroup key={item.id}>
        <Label name={item.name}>{item.name}</Label>
        <Input type="select" id={item.id} >
          {item.values.map((v, i) => { return <option key={i}>{v}</option> })}
        </Input>
      </FormGroup>
    );
  }

  getForm(item) {
    if (item.type === 'text') return this.getTextForm(item);
    else if (item.type === 'select') return this.getSelectForm(item);
  }

  handleChange(v) {
    this.docType = this.documentTypes[v];
    this.setState({
      form: this.docType.map(item => {
        return this.getForm(item);
      })
    });
  }

  getDocumentTypes = () => {
    return this.config.map((entry, index) => <option key={index}>{entry.name}</option>)
  }

  getValueById = (id) => {
    return document.getElementById(id).value;
  }

  onFormSubmit = () => {
    let urlParams = "";
    for (var i = 0; i<this.docType.length; i++){
      const field = this.docType[i]; 
      urlParams += urlParams.length > 0 ? "&":"?"; 
      urlParams += field['name'] + "=" + this.getValueById(field['id']);
    }
    this.search(urlParams);
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="documentTypes">Sökningar</Label>
          <Input type="select" name="select" id="documentTypes" onChange={(e) => { this.handleChange(e.target.value) }}>
            {this.getDocumentTypes()}
          </Input>
        </FormGroup>
        {this.state.form}
        <Button onClick={this.onFormSubmit}>Sök</Button>
      </Form>
    );
  }
}