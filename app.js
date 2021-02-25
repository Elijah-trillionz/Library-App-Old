// make a library
// in libraries, there are different sections that could be made up of arts, social science, science.
// this can also be in-depth and divided into courses of study.

// in this tutorial we will make a basic high school library app consisting arts, social sciences, and sciences.

// each section will have a class

// algorithm
/*
 ** 1: have a basic section class
 ** 2: create sections to extend to the section class
 */

//  features
/*
 ** 1: A book can be borrowed out of the library
 ** 2: Books can be read inside the library
 ** 3: A book can be returned back to its shelf the right place to be.
 ** 4: A book can be returned back to the library
 */

// PROJECT DONE by ELIJAH TRILLIONZ

class LibrarySection {
  constructor() {
    this._books;
  }
  get availableBooks() {
    return this._books.filter((book) => {
      return !book.reading && !book.borrowed;
    });
  }

  get allBookedBooks() {
    return this._books.filter((book) => {
      return book.reading;
    });
  }

  get allBorrowedBooks() {
    return this._books.filter((book) => {
      return book.borrowed && !book.isReturned;
    });
  }

  get allReturnedBooks() {
    // books originally borrowed
    return this._books.filter((book) => {
      return book.isReturned;
    });
  }

  // collecting book from shelf
  collectBook(bookTitle, author) {
    // to arrive at the exact book, you have to be specific enough
    const toUseBook = this.availableBooks.filter((book) => {
      return book.title === bookTitle && book.author === author;
    })[0];

    if (!toUseBook.reading) {
      toUseBook.reading = true;
    }
  }

  // returning book back to shelf
  returnBook(bookTitle, author) {
    const bookToReturn = this.allBookedBooks.filter((bookedBook) => {
      return bookedBook.title === bookTitle && bookedBook.author === author;
    })[0];

    delete bookToReturn.reading;
  }

  // borrowing books from library
  borrowBook(bookTitle, author, name) {
    const toUseBook = this.availableBooks.filter((book) => {
      return book.title === bookTitle && book.author === author;
    })[0];

    if (!toUseBook.borrowed) {
      toUseBook.borrowed = true;
      toUseBook.borrowedBy = name;
      toUseBook.borrowDate = new Date().toLocaleDateString();
    }
  }

  // return borrowed books
  returnBorrowedBooks(bookTitle, author, name) {
    const bookToReturn = this.allBorrowedBooks.filter((borrowedBook) => {
      return (
        borrowedBook.title === bookTitle &&
        borrowedBook.author === author &&
        borrowedBook.borrowedBy === name
      );
    })[0];

    // we won't delete anything so as to keep all borrowing records
    delete bookToReturn.borrowed;
    bookToReturn.isReturned = true;
    bookToReturn.returnDate = new Date().toLocaleDateString();
    bookToReturn.damages = null;
    if (bookToReturn.damages) {
      const numOfDamages = bookToReturn.damages * 100;
      bookToReturn.damagesCost = `$${numOfDamages}`;
    }
  }
}

class ArtSection extends LibrarySection {
  constructor() {
    super();
    const shelf = 'art'; // to know origin of book

    this._books = [
      { title: 'Book 4', author: 'No Name', ISBN: 4029, shelf },
      { title: 'Book 2', author: 'No Name', ISBN: 4129, shelf },
      { title: 'Book 1', author: 'John Doe', ISBN: 4429, shelf },
    ];
  }
}

const art = new ArtSection();

const bookToBorrow = { title: 'Book 4', author: 'No Name' };
art.borrowBook(bookToBorrow.title, bookToBorrow.author, 'Elijah');
art.borrowBook('Book 1', 'John Doe', 'Elijah');
// am done with the book
const borrowedBook = bookToBorrow;
art.returnBorrowedBooks(borrowedBook.title, borrowedBook.author, 'Elijah');
console.log(art.allBorrowedBooks);
console.log(art.availableBooks);

// class ScienceSection extends LibrarySection {
//   constructor() {
//     super();
//     const shelf = 'science'; // to know origin of book

//     this._books = [
//       { title: 'Book 4', author: 'No Name', ISBN: 4029, shelf },
//       { title: 'Book 2', author: 'No Name', ISBN: 4129, shelf },
//       { title: 'Book 1', author: 'John Doe', ISBN: 4429, shelf },
//     ];
//   }
// }

// const scienceFreek = new ScienceSection();

// console.log(scienceFreek.availableBooks);
