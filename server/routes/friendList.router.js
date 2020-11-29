const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route to grab usernames from friend list
 */
router.get("/", (req, res) => {
    // console.log('friendlist get');   
  const queryText = `SELECT "user"."id", "username" FROM "user" JOIN "friend_list" on "friend_list".friend_id = "user".id WHERE "friend_list".user_id = $1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      alert("error in GET", error);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
