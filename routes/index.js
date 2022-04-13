var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',async function(req, res) {

  const registros = await global.db.listarLivros();

  res.render('index', { registros });
});



module.exports = router;
