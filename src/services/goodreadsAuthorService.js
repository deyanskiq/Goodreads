const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsBookService');

const parser = xml2js.Parser({
  explicitArray: false
});

function goodReadsBookService() {
  function getAuthorById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/author/show/${id}.xml?key=kG4jZqX6P5XcVT10HDOQ`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              resolve(result.GoodreadsResponse.author);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }
  return {
    getAuthorById
  };
}
module.exports = goodReadsBookService();
