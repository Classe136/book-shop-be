import express from "express";
import * as multer from "multer";
// console.log(multer);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/books/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer.default({ storage: storage });
//const upload = multer.default({ dest: "./public/img/books/" });

const router = express.Router();

import {
  index,
  show,
  store,
  storeReview,
  update,
  destroy,
} from "../controllers/bookController.js";
//Rotte

// Index - Read all
router.get("/", index);

// Show - Read one -
router.get("/:id", show);

//Store - Create
router.post("/", upload.single("image"), store);

// Store - create review
router.post("/:id/reviews", storeReview);

//Update - Update  totale
router.put("/:id", update);

// Modify - Update (partial)
// router.patch("/:id", (req, res) => {
//   res.send("Modifica parziale item con id: " + req.params.id);
// });

// Destroy - Delete
router.delete("/:id", destroy);

//export router
export default router;
