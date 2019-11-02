import React, { Component, Fragment } from 'react';
import { Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import axios from 'axios';
import Datatable from './Datatable';

export default class TablePagination extends Component {

  DATA = [
    {'Name': 'Magnus', 'Age': 55, 'Location': 'Bromma'},
    {'Name': 'Masoud', 'Age': 59, 'Location': 'Södermalm'},
    {'Name': 'Stina', 'Age': 30, 'Location': 'Kista'},
    {'Name': 'Olle', 'Age': 87, 'Location': 'Älvsjö'}
]

  constructor() {

    super();
    this.data = [...this.DATA];
    this.state = {
      currentPageNo: 0,
      metadata: [],
      pageCount: 0
    };

    this.pageSize = 10;
  }

  componentDidMount() {
    //this.setState({ metadata: this.data}); this.setState({pageCount: this.getPageCount() })
    axios.get('http://jsonplaceholder.typicode.com/todos')
    //axios.get('http://35.228.104.97/filelist')
    .then(response => { this.data = response.data; 
                        this.setState({metadata: response.data}); 
                        this.setState({pageCount: this.getPageCount() }) })
      .catch(error => { console.log(error.message); })
    
  }

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({ currentPageNo: index });
  }

  currentPage = () => {
    return this.state.metadata.slice(
      this.state.currentPageNo * this.pageSize,
      (this.state.currentPageNo + 1) * this.pageSize)
  }

  getPageCount = () => {
    return Math.ceil(this.state.metadata.length / this.pageSize);
  }

  filter = (txt) => {
    let arr = this.data.filter((row) => {
      for (var key in row){
        if(row[key].toString().includes(txt)) return true;
      }
      return false;
    });
    this.setState({ currentPageNo: 0, metadata: arr, pageCount: Math.ceil(arr.length / this.pageSize)});
  }

  sort = (column, order) => {
    let arr = [...this.state.metadata];
    arr.sort(sortFunction);
    this.setState({ currentPageNo: 0, metadata: arr });

    function sortFunction(a, b) {
      a = a[column];
      b = b[column];
      let cmp = isNaN(a - b) ? (a === b) ? 0 : (a < b) ? -1 : 1 : a - b;
      return order ? cmp : cmp * -1;
    }
  }

  data = () => {
    return this.getCurrentPage();
  }

  read = () => {

  }

  render = () => {
    const currentPageNo = this.state.currentPageNo;
    return (
      <Fragment>
        
        <Datatable
          data={this.currentPage}
          sort={this.sort}
        />

        <div className="pagination-wrapper">
          <Pagination>

            <PaginationItem disabled={currentPageNo <= 0}>
              <PaginationLink
                onClick={e => this.handleClick(e, currentPageNo - 1)}
                previous
                href="#"
              />
            </PaginationItem>

            {[...Array(this.state.pageCount)].map((page, i) =>
              <PaginationItem active={i === currentPageNo} key={i}>
                <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem disabled={currentPageNo >= this.state.pageCount - 1}>
              <PaginationLink
                onClick={e => this.handleClick(e, currentPageNo + 1)}
                next
                href="#"
              />
            </PaginationItem>

          </Pagination>
        </div>

      </Fragment>
    );
  }
}


