const http = require('http');
const handler = require('./handler.js')
const server = http.createServer(handler);
const env2 = require('env2')('.env');

const port = process.env.DB_PORT;

server.listen(port);

console.log(`Server running on port ${port}`);
