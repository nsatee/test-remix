const puppeteer = require("puppeteer");

class InstagramClient {
	async start() {
		this.browser = await puppeteer.launch({
			headless: true, //When set to true, a new browser window will ge opened
		});
	}

	async stop() {
		await this.browser.close();
	}

	async getFollowers(username) {
		if (!this.browser) throw new Error("Browser not started");
		const page = await this.browser.newPage();
		await page.setUserAgent(
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
		);
		await page.goto(`https://instagram.com/${username}/`);
		const pageExists = await page.evaluate((_) => {
			return document.querySelector(".error-container") === null;
		});
		if (!pageExists) {
			throw new Error(`Page of ${username} doesn't exist`);
		}

		// console.log(page);
		// //Wait until the page got completly renderer
		await page.waitForSelector(`a[href="/${username}/followers/"]`);

		const followers = await page.evaluate(async (username) => {
			//This code will get executed on the instagram page
			// console.log(firstResponse);
			// return document.body.childNodes;
			const followers = document.querySelector(
				`a[href="/${username}/followers/"]`
			).textContent;
			console.log(followers);

			//Get the number of followers
			// console.log(document.querySelector("h1"));
			// const followers = document
			// 	.querySelector(
			// 		`a[href="/accounts/login/?next=%2F${username}%2Ffollowers%2F&source=followed_by_list"]`
			// 	)
			// 	.querySelector("span").innerText;
			// //Return the number of followers back to the node process
			// return followers;
		}, username);

		page.close();

		return followers;
	}
}

module.exports = InstagramClient;
