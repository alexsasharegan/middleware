const express = require("express");
const { RequestId, RequestLog } = require("../lib");

const app = express();
app.use(
	RequestId.injectMiddleware,
	RequestLog.middleware({
		newLine: RequestLog.NewLine.LF,
		stream: process.stderr,
		withColors: true,
	})
);

app.get("/", (req, res) => {
	res.setHeader("X-Request-ID", RequestId.extract(req).toString());
	res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Test</title>
</head>
<body>
    <h1>Middleware Tools</h1>
</body>
</html>
`);
	res.end();
});

app.listen(3333, () => {
	process.stderr.write(`Server ready on port 3333.\n`);
});
