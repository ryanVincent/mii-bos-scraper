const puppeteer = require('puppeteer');
const Moment = require('moment');
const MomentRange = require('moment-range');

const login = require('./login');

const { AccountOverview, AccountDetails } = require('./pages');
const api = require('./api');

const moment = MomentRange.extendMoment(Moment);

class BosScraper {
	constructor(credentials) {
		this.credentials = credentials
	}

	async login() {
		this.browser = await puppeteer.launch({ headless: false, slowMo: 50 });
		this.page = await this.browser.newPage();

		this.pages = {
			AccountOverview: new AccountOverview(this.page),
			AccountDetails: new AccountDetails(this.page),
		};

		await login(this.page, this.credentials);
		return;
	}

	async logout() {
		await this.browser.close();
	}

	async getAccounts() {
		await this.pages.AccountOverview.launch();
		return await this.pages.AccountOverview.accounts();
	}


	async getTransactions (accountId, from, to) {
		await this.pages.AccountDetails.launch(accountId);
		await this.pages.AccountDetails.search(from, to);
		return await this.pages.AccountDetails.transactions();
	}

	async getTransactionsForMonth(accountId, month) {
		return await api.transactions.fetchTransactions(this.page, accountId, 0, month, 120);
	}

	async getPendingTransactions(accountId) {
		return await api.transactions.fetchPendingTransactions(this.page, accountId);
	}
}

module.exports = BosScraper;