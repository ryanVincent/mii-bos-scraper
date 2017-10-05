const Page = require('./Page');
const { SearchPanel, TransactionsTable } = require('../components');

class AccountDetails extends Page {
	constructor(page) {
		super(page);
		this.searchPanel = new SearchPanel(page);
		this.transactionsTable = new TransactionsTable(page);
	}

	async launch(accountId) {
		await this.page.goto(`https://secure.bankofscotland.co.uk/personal/a/account_details_ress/${accountId}`);
		await this.page.waitForSelector('.des-m-sat-xx-account-information');
	}

	async search(from, to) {
		await this.searchPanel.open();
		await this.searchPanel.from(from);
		await this.searchPanel.to(to);
		await this.searchPanel.execute();
	}

	async transactions() {
		return await this.transactionsTable.getTransactions();
	}
}

module.exports = AccountDetails;