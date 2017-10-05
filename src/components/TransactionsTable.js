const Component = require('./Component');

class TransactionsTable extends Component {
	constructor(page) {
		super(page);
	}

	async getTransactions() {
		await this.page.waitForSelector('#statementTable');

		return await this.page.evaluate(() => {

			const parseMoney = text => Number.parseFloat(text.replace(',', ''))

			const toTransaction = (row) => ({
				date: row.querySelector('td:first-child').textContent,
				description: row.querySelector('td:nth-child(2)').textContent,
				type: row.querySelector('td:nth-child(3)').textContent,
				in: parseMoney(row.querySelector('td:nth-child(4)').textContent),
				out: parseMoney(row.querySelector('td:nth-child(5)').textContent),
				balance: parseMoney(row.querySelector('td:nth-child(6) span:first-child').textContent),
			});

			return Array.from(document.querySelectorAll('#statementTable tr.clickableLine')).map(toTransaction);
		});
	}
}

module.exports = TransactionsTable;