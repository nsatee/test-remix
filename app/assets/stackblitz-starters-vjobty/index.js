const express = require("express");
const app = express();
const InstagramClient = require("./testScrapper");

const port = 3010;

app.get("/", async (req, res) => {
	try {
		const client = new InstagramClient();
		await client.start();

		console.log("@kyliejenner:", await client.getFollowers("kyliejenner"));

		return res.json({ hello: "there" });
	} catch (error) {
		console.log(error);
		return res.json({ error: true });
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
