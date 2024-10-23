var express = require('express');
var spa = require('express-spa');
var serveStatic = require('serve-static');
var path = require('path');
var publicDir = path.join(__dirname, 'public');
app = express();
app.use(
  (req, res, next) => {
    if (req.xhr) return next();
    if (path.extname(req.path) != '') return next();
    if (req.accepts('html', 'json', 'xml') != 'html') return next();
    res.set('content-type', 'text/html');
    next();
  },
  spa(
    publicDir + '/index.html',
    {
      '$ENV': JSON.stringify({
        API_URL: process.env.API_URL,
        WS_URL: process.env.WS_URL
      })
    }
  )
);
app.use(serveStatic(publicDir));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);
