import connection from "../connection.js";
import CustomError from "../classes/CustomError.js";

function index(req, res) {
  //set number of books per page
  const limit = 2;
  const { page } = req.query;
  const offset = limit * (page - 1);
  const sqlCount = "SELECT COUNT(*) AS `count` FROM `books`";
  connection.query(sqlCount, (err, results) => {
    if (err) res.status(500).json({ error: "Errore del server" });
    const count = results[0].count;
    //console.log(results);
    const sql = "SELECT * FROM `books` LIMIT ? OFFSET ?";
    connection.query(sql, [limit, offset], (err, results) => {
      if (err) res.status(500).json({ error: "Errore del server" });
      //console.log(results);
      const response = {
        count,
        items: results,
      };
      res.json(response);
    });
  });
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const sql = `SELECT books.*, AVG(reviews.vote) AS vote_average FROM books
  JOIN reviews ON reviews.book_id = books.id
  WHERE 	books.id = ?
  GROUP BY reviews.book_id`;
  connection.query(sql, [id], (err, results) => {
    if (err) res.status(500).json({ error: "Errore del server" });
    const item = results[0];
    //console.log(results);
    if (!item) return res.status(404).json({ error: "Not Found" });
    const sqlReviews =
      "SELECT * FROM `reviews` WHERE `book_id` = ? ORDER BY created_at DESC";
    connection.query(sqlReviews, [id], (err, reviews) => {
      if (err) res.status(500).json({ error: "Errore del server" });
      item.reviews = reviews;
      res.json(item);
    });
    //console.log(results[0]);
  });
}

function store(req, res) {
  console.log(req.body);
  console.log(req.file);
  res.json({ success: true });
}
function storeReview(req, res) {
  // Recuperiamo l'id
  const { id } = req.params;

  // Recuperiamo il body
  const { text, name, vote } = req.body;

  // Prepariamo la query
  const sql =
    "INSERT INTO reviews (text, name, vote, book_id) VALUES (?, ?, ?, ?)";

  // Eseguiamo la query
  //console.log(results); // results contains rows returned by server
  //  console.log(fields); // fields contains extra meta data about results, if available
  connection.query(sql, [text, name, vote, id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    //console.log(results);
    res.status(201);
    res.json({ message: "Review added", id: results.insertId });
  });
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
  const sql = "DELETE FROM `books` WHERE  `id` = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) res.status(500).json({ error: "Errore del server" });
    // const item = results;
    // console.log(results);
    // if (!item) res.status(404).json({ error: "Not Found" });
    res.sendStatus(204);
  });
}

export { index, show, store, storeReview, update, destroy };
