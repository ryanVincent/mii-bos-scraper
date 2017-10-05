const Page = require('./Page');

class AccountOverview extends Page {
		constructor(page) {
			super(page);
		}

	async launch() {
		await this.page.goto('https://secure.bankofscotland.co.uk/personal/a/account_overview_personal', {waitUntil: 'networkidle'});
		return;
	}

	async accounts() {
		return await this.page.evaluate(() => {
			const tiles = Array.from(document.querySelectorAll('.des-m-sat-xx-account-tile'));
			return tiles.map((tile, i) => {

				const getAccountValues = tile => {
					const rows = Array.from(tile.querySelectorAll('.account-values tr'));
					return rows.map((row) => ({
						description: row.querySelector('td'),
						value: Number.parseFloat(row.querySelector('th').textContent.replace('£ ', '').replace(',', ''))
					}));
				};

				const models = {
					CurrentAccountTile: 'current',
					SavingsAccountTile: 'savings',
					CreditCardTile: 'credit',
				}

				return {
					position: i + 1,
					id: tile.getAttribute('data-ajax-identifier'),
					name: tile.querySelector('.account-name a').textContent,
					balance: Number.parseFloat(tile.querySelector('.balance span').textContent.replace('£ ', '').replace(',', '')),
					accountValues: getAccountValues(tile),
					type: models[tile.getAttribute('data-tracking-model')],
				}
			});
		});
	}
}

module.exports = AccountOverview;