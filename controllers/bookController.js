import books from "../models/books.js";
import CustomError from "../classes/CustomError.js";

function index(req, res) {
  const response = {
    info: {
      totalCount: books.length,
    },
    results: [...books],
  };
  res.json(response);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const item = books.find((book) => book.id === id);

  if (!item) {
    throw new CustomError("L'elemento non esiste", 404);
  }
  res.json({ success: true, item });
}

function store(req, res) {
  let newId = 0;
  for (let i = 0; i < books.length; i++) {
    if (books[i].id > newId) {
      newId = books[i].id;
    }
  }
  newId += 1;
  const newBook = { id: newId, ...req.body };
  books.push(newBook);
  res.json({ success: true, item: newBook });
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const item = books.find((item) => item.id === id);
  if (!item) {
    throw new CustomError("L'elemento non esiste", 404);
  }

  //console.log(req.body);
  for (let key in item) {
    if (key !== "id") {
      item[key] = req.body[key];
    }
  }

  //console.log(examples);
  res.json({ success: true, item });
}
function destroy(req, res) {
  const id = parseInt(req.params.id);
  const index = books.findIndex((item) => item.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.sendStatus(204);
  } else {
    throw new CustomError("L'elemento non esiste", 404);
  }
}

export { index, show, store, update, destroy };
