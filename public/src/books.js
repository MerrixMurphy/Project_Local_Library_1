function findAuthorById(authors, id) {
  // loop through each author to find one with a matching Id.
  return authors.find((author) => id === author.id);
}

function findBookById(books, id) {
  // loop through each book to find one with a matching Id.
  return books.find((book) => id === book.id);
}

function partitionBooksByBorrowedStatus(books) {
  // array holder for borrowed and returned books.
  const masterArray = [];
  // filter to go through books and find books not returned.
  const borrowed = books.filter((borrow) => {
    const status = borrow.borrows[0].returned;
    if (!status) {
      return borrow;
    }
  });
  // filter to go through books and find returned.
  const returned = books.filter((returns) => {
    const status = returns.borrows[0].returned;
    if (status) {
      return returns;
    }
  });
  // push both filters into the array holder and return the holder.
  masterArray.push(borrowed);
  masterArray.push(returned);
  return masterArray;
}

function getBorrowersForBook(book, accounts) {
  // var and constant to hold account info and the book's borrow history respectfully.
  let accountInfo = {};
  const bookHistory = book.borrows;
  // function to find an account by id and delete the id listed already before pushing it into the var holder.
  function getAccount(accountId) {
    accounts.find((eachAccount) => {
      if (eachAccount.id === accountId) {
        delete eachAccount.id;
        accountInfo = eachAccount;
      }
    });
  }
  // const to map the borrowers for the book.
  const recentBookHistory = bookHistory.map((eachTrans) => {
    const borrowerId = eachTrans.id;
    getAccount(borrowerId);
    // return const to hold the new object containing each of the books borrow history and the accounts associated.
    const bookBorrowers = {
      ...eachTrans,
      ...accountInfo,
    };
    return bookBorrowers;
  });
  // return the first 10 results of the new object.
  return recentBookHistory.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
