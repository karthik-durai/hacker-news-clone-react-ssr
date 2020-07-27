# Hacker News Client using React SSR

Used **renderToString** method from **ReactDOMServer** package.

On request, the html is generated and passed to renderToString method and the returned value is sent as the response from the server.

Used **hyderate** method from **ReactDOM** package to mount the Server side rendered HTML.
