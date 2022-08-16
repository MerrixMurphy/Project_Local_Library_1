function getTotalBooksCount(books) {
  // return a total count of all books.
  return books.reduce((acc) => {
    return acc + 1;
  }, 0);
}

function getTotalAccountsCount(accounts) {
  // return a total count of all accounts.
  return accounts.reduce((acc) => {
    return acc + 1;
  }, 0);
}

function getBooksBorrowedCount(books) {
  // filter through the books to check and return an array with each book borrowed.
  const bookCount = books.filter((book) => {
    const status = book.borrows[0].returned;
    if (!status) {
      return book;
    }
  });
  // return the length of the filtered array to see how many books were checked out.
  return bookCount.length;
}

//function to
function sorter(impKey, impVal) {
  // constant to hold objs with name key and count val var.
  const unsorted = [];
  // for loop to push the key and val var into an object with proper keys and push into the obj holder.
  for (let key in impKey) {
    let organized = {};
    organized["name"] = impKey[key];
    organized["count"] = impVal[key];
    unsorted.push(organized);
  }
  // sort through the obj holder to organize by most to least of the var.
  const sort = unsorted.sort((sortA, sortB) => {
    return sortA.count < sortB.count ? 1 : -1;
  });
  // return the first 5 results of the sorted obj.
  return sort.splice(0, 5);
}

function getMostCommonGenres(books) {
  // var to hold common genres, a var for the keys of the common genre, and for the vals.
  let unorganizedGenres = {};
  let genreKeys = [];
  let genreValues = [];
  // a var for a map of the books genre.
  const bookGenres = books.map((book) => book.genre);
  // count all of the duplicate genres and make an obj containing them and the count.
  bookGenres.forEach((genre) => {
    return (unorganizedGenres[genre] = (unorganizedGenres[genre] || 0) + 1);
  });
  // reassign the empty var with the correct information
  genreKeys = Object.keys(unorganizedGenres);
  genreValues = Object.values(unorganizedGenres);
  //take the key and val produced by the count and run them through the function.
  return sorter(genreKeys, genreValues);
}

function getMostPopularBooks(books) {
  // constants to hold the mapped titles and the borrow length of each book.
  const bookTit = books.map((book) => book.title);
  const bookPop = books.map((book) => book.borrows.length);
  //take the key and val produced by the count and run them through the function.
  return sorter(bookTit, bookPop);
}

function getMostPopularAuthors(books, authors) {
  // constants to hold the mapped author ids from each book and each books borrowed length.
  const bookAuth = books.map((book) => book.authorId);
  const bookPop = books.map((book) => book.borrows.length);
  // a map for the author ids to to find the matching author and then returning the authors first and last name.
  const changeToAuth = bookAuth.map((auth) => {
    for (let indivAuth in authors) {
      const author = authors[indivAuth];
      const authorName = `${author.name.first} ${author.name.last}`;
      if (auth === author.id) {
        return (auth = authorName);
      }
    }
  });
  //take the key and val produced by the count and run them through the function.
  return sorter(changeToAuth, bookPop);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
