import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class MetadataForm extends React.Component {

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
            },
            {
              "name": "Kundnummer2",
              "id": "Kundnummer",
              "type": "text",
              "placeholder": "XYZ123456"
            }
          ]
      }
    ]

  documentTypes = new Map();

  constructor(props) {
    super(props);
    this.search = props.search;
    this.types = {};
    this.config.map(item => { this.documentTypes[item.name] = item.fields; return true; });
    this.docType = 'Sakskador';
    this.fields = this.documentTypes[this.docType];
    this.state = {
      form: this.fields.map((item, index) => { return this.getForm(item); })
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
    this.docType = v;
    this.fields = this.documentTypes[v];
    this.setState({
      form: this.fields.map(item => {
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
    let urlParams = "?type=" + this.docType;
    for (var i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      urlParams += "&" + field['name'] + "=" + this.getValueById(field['id']);
    }
    this.search(urlParams);
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <h4>Metadata för dokumenten</h4>
          <hr style={{
            color: 'gray',
            backgroundColor: 'gray',
            height: .5,
            borderColor: 'gray'
          }} />
          <Label for="documentTypes">Dokumenttyp</Label>
          <Input type="select" name="select" id="documentTypes" onChange={(e) => { this.handleChange(e.target.value) }}>
            {this.getDocumentTypes()}
          </Input>
        </FormGroup>
        {this.state.form}
      </Form>
    );
  }
}