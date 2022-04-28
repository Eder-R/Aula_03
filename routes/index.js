var express = require('express');
var router = express.Router();

router.get('/', async function(req, res) {
  const registros = await global.db.listarLivros()
  res.render('index', { registros });
});


router.get('/novoLivro', function(req, res){
  res.render('formLivro', { titulo:'Novo livro', acao:'/novoLivro', livro:{}})
})

router.post('/novoLivro', async function(req, res) {
  const titulo = req.body.edtTitulo
  const ano = parseInt(req.body.edtAno)
  const genero = parseInt(req.body.selGenero)

  await global.db.inserirLivro({titulo,ano,genero})
  res.redirect('/')
} )

router.get('/alteraLivro/:id', async function(req, res) {
  const codigo = parseInt(req.params.id)
  const livro = await global.db.recuperarLivro(codigo)
  res.render('formLivro',{ titulo:'Alteração de livro', acao:'/alteraLivro/'+codigo,livro})
})

router.post('/alteraLivro/:id', async function(req, res) {
  const codigo = parseInt(req.params.id)
  const titulo = req.body.edtTitulo
  const ano = parseInt(req.body.edtAno)
  const genero = parseInt(req.body.selGenero)
  await global.db.alterarLivro({codigo, titulo, ano, genero})
  res.redirect('/')
})

router.get('/apagaLivro/:id', async function(req, res){
  const codigo = parseInt(req.params.id)
  await global.db.apagarLivro(codigo)
  res.redirect('/')
})



module.exports = router;
