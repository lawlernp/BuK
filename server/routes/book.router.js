const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route for querying all books and checkouts from DB for current user
 */
router.get("/", rejectUnauthenticated, (req, res) => {
   const queryText = `SELECT "book"."id", "title", "author", "imageUrl", "publish_date", "isbn", "user_id", "comments", "checkout_id", "username" FROM "book" 
JOIN "user" ON "book".checkout_id = "user".id WHERE "user_id" = $1 ORDER BY "author";`;
  pool.query(queryText, [req.user.id])
    .then(result => {
      res.send(result.rows);
    }).catch(error => {
      res.sendStatus(500);
      alert('error in GET', error);
    });
});

/**
 * POST route to add new book
 */
router.post("/", (req, res) => {  
    const queryText = `INSERT INTO "book" ("title", "author", "imageUrl", "user_id", "comments", "publish_date", "checkout_id") VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  pool
    .query(queryText, [req.body.title, req.body.author, req.body.imageUrl, req.user.id, req.body.comments, req.body.publish_date, req.user.id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log('error in add book', error);
    });
});

/**
 * PUT route to update books on edit
 */
router.put("/", rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "book" SET "title" = $1, "imageUrl" = $2, "author" = $4 WHERE "id" = $3;`;
  pool
    .query(queryText, [req.body.title, req.body.imageUrl, req.body.id, req.body.author])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log('error in edit', error);
      
    });
});

/**
 * POST route to checkout a book
 */
router.put("/checkout", rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const queryText = `UPDATE "book" SET "checkout_id" = $1 WHERE "id" = $2;`;
  pool
    .query(queryText, [
      +req.body.user,
      req.body.id,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in edit", error);
    });
});

/**
 * DELETE route to delete book by id
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "book" WHERE "id" = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("Error deleting", error);
    });
});

module.exports = router;
