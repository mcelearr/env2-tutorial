const fs = require('fs');

const handler = (req, res) => {
  const url = req.url;
  if (url === "/"){
    fs.readFile(__dirname + '/../public/index.html', (err, data) => {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  } else if (url.includes('/public')) {
    const ext = url.split('.')[1];
    fs.readFile(__dirname + '/..' + url, (err, data) => {
      if(err) throw err;
      res.writeHead(200, {'Content-Type': 'text/' + ext});
      res.end(data);
    });
  } else if (url === '/get-data') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('data from the server')
  } else {
    res.writeHead(404);
    res.end('sorry, I can\'t find that file');
  }
}

module.exports = handler;
