const fetchTransactions = async (page, accountId, page_num, month, size) => {
	page.on('console', (...args) => {
		for (let i = 0; i < args.length; ++i)
			console.log(`${i}: ${args[i]}`);
	});

	return await page.evaluate(async (accountId, page_num, month, size) => {

		const buildOptions = () => ({
			credentials: 'include'
		})

		const baseUrl = 'https://secure.bankofscotland.co.uk/personal/retail/statement-api/browser/v1/arrangements';
		const buildUrl = (accountId, page_num, month, size, time) =>
			`${baseUrl}/${accountId}/statements?_=${time}&month=${month}&analytics=%5Bobject%20Object%5D&encryptedArrangementId=${accountId}&page=${page_num}&size=${size}`

		const url = buildUrl(accountId, page_num, month, size, new Date().getTime());

		console.log(url);
		const options = buildOptions();

		const request = new Request(url, {
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
			})
		})

		return await fetch(request, options)
			.then(response => response.json())
	}, accountId, page_num, month, size);
}

const fetchPendingTransactions = async (page, accountId) => {

	return await page.evaluate(async (accountId) => {

		const buildOptions = () => ({
			credentials: 'include'
		})

		const baseUrl = 'https://secure.bankofscotland.co.uk/personal/retail/statement-api/browser/v1/arrangements';
		const buildUrl = (accountId, time) =>
			`${baseUrl}/${accountId}/pendingTransactions?_=${time}&id=thisIsAKey&encryptedArrangementId=${accountId}&currentMonth=all`

		const url = buildUrl(accountId, new Date().getTime());

		console.log(url);
		const options = buildOptions();

		const request = new Request(url, {
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
			})
		})

		return await fetch(request, options)
			.then(response => response.json())
	}, accountId);

}



module.exports = {
	fetchTransactions,
	fetchPendingTransactions
}
