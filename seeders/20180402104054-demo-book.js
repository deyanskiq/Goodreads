module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'How to win friends and influence people',
      author: 'Dale Carnegie'
    }, {
      title: 'Book2',
      author: 'Author2'
    }, {
      title: 'Book3',
      author: 'Author3'
    }], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
