function findAccountById(accounts, id) {
  return accounts.find((accountId) => accountId.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((firstLastName, secLastName) =>
    firstLastName.name.last.toLowerCase() > secLastName.name.last.toLowerCase()
      ? 1
      : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  const accountID = account.id;
  const timesBorrowed = [];
  books.filter((borrowed) => {
    let borrowHistory = borrowed.borrows;
    for (let eachBorrow in borrowHistory) {
      if (accountID == borrowHistory[eachBorrow].id) {
        return timesBorrowed.push(1);
      }
    }
  });
  return timesBorrowed.reduce((acc, numBorrowed) => acc + numBorrowed, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let authorInfo = [];
  function findAuthorInfo() {
    authors.find((spec) => {
      if (spec.id === authorInfo[0]) {
        authorInfo = spec;
      }
    });
  }
  const check = books.filter((eachBook) => {
    const borrowerId = eachBook.borrows[0].id;
    const accountId = account.id;
    const borrowerStatus = eachBook.borrows[0].returned;
    if (accountId === borrowerId) {
      if (!borrowerStatus) {
        authorInfo.push(eachBook.authorId);
        return eachBook;
      }
    }
  });

  const bookMap = check.map((indivBorrow) => {
    findAuthorInfo();
    indivBorrow.author = authorInfo;
    return indivBorrow;
  });

  return bookMap;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
