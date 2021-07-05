function getTotalBooksCount(books) {
  return books.reduce((acc) => {
    return acc + 1;
  }, 0);
}

function getTotalAccountsCount(accounts) {
  return accounts.reduce((acc) => {
    return acc + 1;
  }, 0);
}

function getBooksBorrowedCount(books) {
  const bookCount = books.filter((book) => {
    const status = book.borrows[0].returned;
    if (!status) {
      return book;
    }
  });
  return bookCount.length;
}

function getMostCommonGenres(books) {
  let unorganizedGenres = {};
  const unsortedGenres = [];
  const bookGenres = books.map((book) => book.genre);
  bookGenres.forEach((genre) => {
    unorganizedGenres[genre] = (unorganizedGenres[genre] || 0) + 1;
  });
  function organize() {
    const genreKeys = Object.keys(unorganizedGenres);
    const genreValues = Object.values(unorganizedGenres);
    for (let key in genreKeys) {
      let organizedGenres = {};
      organizedGenres["name"] = genreKeys[key];
      organizedGenres["count"] = genreValues[key];
      unsortedGenres.push(organizedGenres);
    }
  }
  organize();
  const sortGenres = unsortedGenres.sort((genreA, genreB) => {
    return genreA.count < genreB.count ? 1 : -1;
  });
  return sortGenres.splice(0, 5);
}

function getMostPopularBooks(books) {
  const unsortedPop = [];
  const bookTit = books.map((book) => book.title);
  const bookPop = books.map((book) => book.borrows.length);
  function organize() {
    for (let pop in bookPop) {
      let organizedPop = {};
      organizedPop["name"] = bookTit[pop];
      organizedPop["count"] = bookPop[pop];
      unsortedPop.push(organizedPop);
    }
  }
  organize();
  const sortPop = unsortedPop.sort((popA, popB) => {
    return popA.count < popB.count ? 1 : -1;
  });
  return sortPop.splice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const unsortedAuth = [];
  const bookAuth = books.map((book) => book.authorId);
  const bookPop = books.map((book) => book.borrows.length);
  const changeToAuth = bookAuth.map((auth) => {
    for (let indivAuth in authors) {
      const author = authors[indivAuth];
      const authorName = `${author.name.first} ${author.name.last}`;
      if (auth === author.id) {
        return (auth = authorName);
      }
    }
  });
  function organize() {
    for (let auth in changeToAuth) {
      let organizedAuth = {};
      organizedAuth["name"] = changeToAuth[auth];
      organizedAuth["count"] = bookPop[auth];
      unsortedAuth.push(organizedAuth);
    }
  }
  organize();
  const sortAuth = unsortedAuth.sort((authA, authB) => {
    return authA.count < authB.count ? 1 : -1;
  });
  return sortAuth.splice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
