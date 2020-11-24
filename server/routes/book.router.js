const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
   const queryText = `SELECT * FROM "book" WHERE "user_id" = $1 ORDER BY "author"`;
  pool.query(queryText, [req.user.id])
    .then(result => {
      res.send(result.rows);
    }).catch(error => {
      res.sendStatus(500);
      alert('error in GET', error);
    });
 // GET route code here
});

/**
 * POST route template
 */
router.post("/", (req, res) => {  
    const queryText = `INSERT INTO "book" ("title", "author", "imageUrl", "user_id", "comments", "publish_date") VALUES ($1, $2, $3, $4, $5, $6);`;
  pool
    .query(queryText, [req.body.title, req.body.author, req.body.imageUrl, req.user.id, req.body.comments, req.body.publish_date])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log('error in add book', error);
    });
  // code here
});


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


// router.delete("/", rejectUnauthenticated, (req, res) => {
//   console.log('hi from router', req.body);
  
//   const queryText = `DELETE FROM "book" WHERE "id" = $1;`;
//   pool
//     .query(queryText, [req.body.id])
//     .then((result) => {
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       res.sendStatus(500);
//     });
// });

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


//   const name = req.body.name;
//   const amount = req.body.amount;
//   console.log(`Creating new account '${name}' with initial balance ${amount}`);

//   const connection = await pool.connect();
//   try {
//     await connection.query("BEGIN");
//     const sqlAddAccount = `INSERT INTO account (name) VALUES ($1) RETURNING id`;
//     // Save the result so we can get the returned value
//     const result = await connection.query(sqlAddAccount, [name]);
//     // Get the id from the result - will have 1 row with the id
//     const accountId = result.rows[0].id;
//     const sqlInitialDeposit = `INSERT INTO register (acct_id, amount) VALUES ($1, $2);`;
//     await connection.query(sqlInitialDeposit, [accountId, amount]);
//     await connection.query("COMMIT");
//     res.sendStatus(200);
//   } catch (error) {
//     await connection.query("ROLLBACK");
//     console.log(`Transaction Error - Rolling back new account`, error);
//     res.sendStatus(500);
//   } finally {
//     connection.release();
//   }

module.exports = router;
