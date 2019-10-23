// example of the book format

const book = {
  "title": "",
  "author": "",
  "pages": 0,
  "era": "",
  "series": "",
  "searchTerms": [""],
}

const userBook = {
  ...book,
  "status": ["read", "wishlist", "not read", "in progress"],
  "platform": ["book", "audiobook"],
  "rating": "1 - 5",
  "date-read": ""
}