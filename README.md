# Middleware

A collection of express/connect middleware.

## Exports

### `RequestId`

A class to uniquely id incoming requests. Use the inject middleware at the beginning of your stack.

```ts
import express from "express";
import { RequestId } from "@alexsasharegan/middleware";

const app = express();
app.use(RequestId.injectMiddleware);
```

If you need to make use of the id for something like writing it in response headers, an extract method is available:

```ts
app.get("/", function(req, res) {
	// You can extract from either the request/response.
	let requestId = RequestId.extract(req);
	res.header.set("X-Request-ID", requestId.toString());
	res.end();
});
```

### `RequestLog`

A class to log requests. Call the middleware function to configure a middleware handler. Place is at the beginning of
your stack.

```ts
import express from "express";
import { RequestId, RequestLog } from "@alexsasharegan/middleware";

const app = express();
app.use(RequestId.injectMiddleware);
app.use(
	RequestLog.middleware({
		withColors: true, // tty color output
		newLine: RequestLog.NewLine.LF, // Linux/Mac style new line.
		stream: process.stderr, // log to any stream
	})
);
```
