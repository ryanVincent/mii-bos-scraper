const Component = require('./Component');

class SearchPanel extends Component {
	constructor(page) {
		super(page);
	}

	async open() {
		await this.page.waitForSelector('#search_trasection_ress_search_statements_ssr');
		await this.page.click('#search_trasection_ress_search_statements_ssr');
	}

	async from(from) {
		await this.page.waitForSelector('#search-date-range-from');
		await this.page.click('#search-date-range-from');
		await this.page.type(from);
	}

	async to(to) {
		await this.page.click('#search-date-range-to');
		await this.page.type(to);
	}

	async execute() {
		await this.page.click('input[name="search-module-form:btnQSearchModuleRetail"]');
		await this.page.waitForSelector('.m-705-d-search-results');
	}
}

module.exports = SearchPanel;