const tape = require('tape');
const shot = require('shot');

const handler = require('../src/handler.js');

tape('first test', (t) => {
  t.equal(true, true, 'true is equal to true');
  t.end();
})

tape('test a get request to the / endpoint and return the correct html file', (t) => {
  shot.inject(handler, {method: 'get', url: '/'}, (res) => {
    t.equal(res.statusCode, 200, '/ has status code of 200');
    t.ok(res.payload.includes('<title>Hello world</title>'));
    t.equal(res.headers['Content-Type'], 'text/html', "correct file type");
    t.end();
  });
})

tape('test a get request for the url that we wont be handling', (t) => {
  shot.inject(handler, {method: 'get', url: '/dshfsdfnvskjdnhvjkdf'}, (res) => {
    t.equal(res.statusCode, 404, '/dshfsdfnvskjdnhvjkdf throws a 404 error');
    t.end();
  });
})

tape('tests tha server responds with our script.js file', (t) => {
  shot.inject(handler, {method: 'get', url: '/public/script.js'}, (res) => {
    t.equal(res.statusCode, 200, 'public/script.js has status code of 200');
    t.ok(res.payload.includes('function'), 'finds the public/script.js file')
    t.end();
  });
})

tape('tests tha server responds with our script.js file', (t) => {
  shot.inject(handler, {method: 'get', url: '/get-data'}, (res) => {
    t.equal(res.statusCode, 200, '/get-data has status code of 200');
    t.ok(res.payload.includes('data'), 'gets the get-data string')
    t.end();
  });
})
