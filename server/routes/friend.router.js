const express = require("express");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route to get current user from db
 */
router.get("/:user", (req, res) => {
  const queryText = `SELECT "username", "id" FROM "user" WHERE "username" = $1;`;
  pool
    .query(queryText, [req.params.user])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      res.sendStatus(500);
      alert("error in GET", error);
    });
});


/**
 * POST route to add user to friend list
 */
router.post("/", (req, res) => {        
    const queryText = `INSERT INTO "friend_list" ("user_id", "friend_id") VALUES ($1, $2);`;
    pool
      .query(queryText, [
        +req.user.id,
        req.body.id
      ])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log("error in add book", error);
      });
});

module.exports = router;
