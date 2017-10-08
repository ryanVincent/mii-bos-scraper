// TODO: refactor into Pages

const login = async (page, credentials) => {
	await page.goto('https://online.bankofscotland.co.uk/personal/logon/login.jsp', {waitUntil: 'networkidle'});
	// Type our query into the search bar

	await page.click('input[name="frmLogin:strCustomerLogin_userID"]')
	await page.type(credentials.username);
	await page.click('input[name="frmLogin:strCustomerLogin_pwd"]')
	await page.type(credentials.password);
	await page.click('input[type="submit"]');

	// Wait for the memorable info page
	await page.waitForSelector('#frmentermemorableinformation1');

	const characters = await page.evaluate(() => {
		const labels = Array.from(document.querySelectorAll('.memInfoSelect label'));
		return labels.map(label => label.textContent.split(' ')[1]);
	});


	let i = 0;

	for (let character of characters) {
		i++;
		const char = credentials.memorableInfo.charAt(character - 1);
		await page.click(`select[name="frmentermemorableinformation1:strEnterMemorableInformation_memInfo${i}"]`)
		await page.type(char)
		await page.press('Enter');
	}

	await page.click('input[name="frmentermemorableinformation1:btnContinue"]');
	await page.waitForSelector('.m-hf-02-logged-in');
	console.log('LOGGED IN');
	};

	module.exports = login;