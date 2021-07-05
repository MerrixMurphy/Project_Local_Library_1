function findAuthorById(authors, id) {
  return authors.find((author) => id === author.id);
}

function findBookById(books, id) {
  return books.find((book) => id === book.id);
}

function partitionBooksByBorrowedStatus(books) {
  const masterArray = [];
  const borrowed = books.filter((borrow) => {
    const status = borrow.borrows[0].returned;
    if (!status) {
      return borrow;
    }
  });
  const returned = books.filter((returns) => {
    const status = returns.borrows[0].returned;
    if (status) {
      return returns;
    }
  });
  masterArray.push(borrowed);
  masterArray.push(returned);
  return masterArray;
}

function getBorrowersForBook(book, accounts) {
  let accountInfo = {};
  const bookHistory = book.borrows;

  function getAccount(accountId) {
    accounts.find((eachAccount) => {
      if (eachAccount.id === accountId) {
        delete eachAccount.id;
        accountInfo = eachAccount;
      }
    });
  }

  const recentBookHistory = bookHistory.map((eachTrans) => {
    const borrowerId = eachTrans.id;
    getAccount(borrowerId);
    const bookBorrowers = {
      ...eachTrans,
      ...accountInfo,
    };
    return bookBorrowers;
  });

  return recentBookHistory.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
