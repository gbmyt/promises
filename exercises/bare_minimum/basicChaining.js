/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

// var fs = require('fs');
var Promise = require('bluebird');
var request = require('needle');
var readFile = Promise.promisify(require('fs').readFile);
var writeFile = Promise.promisify(require('fs').writeFile);
var get = Promise.promisify(request.get);
// var on = Promise.promisify(request.on);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return readFile(readFilePath).then(data => {
    data = data.toString().split('\n');
    // console.log(data[0]);
    return data[0];
  }).then((user) => {
    var url = 'https://api.github.com/users/' + user;
    var options = {
      headers: { 'User-Agent': 'request' },
    };
    return get(url, options);
  }).then(({ body }) => {
    return writeFile(writeFilePath, JSON.stringify(body));
  }).catch(err => {
    console.log(err);
  });

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};