const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsBookService');

const parser = xml2js.Parser({
  explicitArray: false
});

function goodReadsBookService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=kG4jZqX6P5XcVT10HDOQ`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              resolve(result.GoodreadsResponse.book);
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
    getBookById
  };
}
module.exports = goodReadsBookService();
