import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header';
import TablePagination from './components/TablePagination';
import SearchForm from './components/SearchForm';
import Filedrop from './components/Filedrop';

export default class App extends Component {

	constructor() {
		super();
		this.state = { showSearch: true };
	}

	filter = txt => {
		this.refs.table.filter(txt);
	}

	search = params => {
		this.refs.table.search(params);
	}

	showSearch = () => {
		this.setState({ showSearch: true });
	}

	showWrite = () => {
		this.setState({ showSearch: false });
	}


	render = () => {
		if (this.state.showSearch) {
			return (
				<Fragment>
					<Header filter={this.filter} showSearch={this.showSearch} showWrite={this.showWrite} />
					<main className="my-5 py-5">
						<Container className="px-0">
							<Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
								<Col key={1} xs={{ order: 1 }} md={{ size: 2, order: 1 }} tag="aside" className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0">
									<SearchForm search={this.search} />
								</Col>
								<Col key={2} xs={{ order: 2 }} md={{ size: 9, offset: 1 }} tag="section" className="py-5 mb-5 py-md-0 mb-md-0">
									<TablePagination ref='table' />
								</Col>
							</Row>
						</Container>
					</main>
				</Fragment>
			);
		}
		else return (
			<Fragment>
			<Header filter={this.filter} showSearch={this.showSearch} showWrite={this.showWrite} />
			<main className="my-5 py-5">
			<Filedrop/>
			</main>
			</Fragment>
		);
	}
}



