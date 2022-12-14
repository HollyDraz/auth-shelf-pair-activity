const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  console.log(req.user)
  if(req.isAuthenticated()){
    let queryText = `SELECT * FROM "item"`;
    pool.query(queryText).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });

  } else {
    res.sendStatus(403) // Forbidden
  }

});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  // endpoint functionality
  console.log('/shelf POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "item" ("description", "image_url", "user_id")
                        VALUES ($1, $2, $3)`;
  pool.query(queryText, [ req.body.item ,req.body.image , req.user.id])
  .then(() => {
    res.sendStatus(201);
  }).catch((e) => {
    res.sendStatus(500);
  })
  } else {
    res.sendStatus(403);
  }
});

/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
