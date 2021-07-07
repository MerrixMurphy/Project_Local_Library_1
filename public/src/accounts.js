function findAccountById(accounts, id) {
  //Loop through accounts to match given Id.
  return accounts.find((accountId) => accountId.id === id);
}

function sortAccountsByLastName(accounts) {
  //Look through each account, grab and organize by each account's last name.
  return accounts.sort((firstLastName, secLastName) =>
    firstLastName.name.last.toLowerCase() > secLastName.name.last.toLowerCase()
      ? 1
      : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  // constant for account's Id and an array to use as a counter.
  const accountID = account.id;
  const timesBorrowed = [];
  // filter though books and check if the account Id matches.
  books.filter((borrowed) => {
    let borrowHistory = borrowed.borrows;
    for (let eachBorrow in borrowHistory) {
      if (accountID === borrowHistory[eachBorrow].id) {
        // push a 1 into the array being used as a counter.
        return timesBorrowed.push(1);
      }
    }
  });
  // add the array together and get the total number.
  return timesBorrowed.reduce((acc, numBorrowed) => acc + numBorrowed, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  // array to hold author Id and info.
  let authorInfo = [];
  // function to sort through the authors and find the matching Id. Then update the array holder from the Id to author info.
  function findAuthorInfo() {
    authors.find((spec) => {
      if (spec.id === authorInfo[0]) {
        authorInfo = spec;
      }
    });
  }
  // filter through each book to find the author Id for the borrowed books.
  const check = books.filter((eachBook) => {
    // constants to hold borrower id, account id, and returned status.
    const borrowerId = eachBook.borrows[0].id;
    const accountId = account.id;
    const borrowerStatus = eachBook.borrows[0].returned;
    // if statement to check account and borrower id
    if (accountId === borrowerId) {
      // check the returned status and push author id into the array holder
      if (!borrowerStatus) {
        authorInfo.push(eachBook.authorId);
        return eachBook;
      }
    }
  });
  //map through the results of the books filter to add the author information to the books borrowed.
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
