const mysql = require('mysql2/promise')


async function conectarBD()
{
    if (global.connection && global.connection.state !== 'disconnected')
    {
        return global.connection
    }

    const connection = await mysql.createConnection(
        {
            host     : 'localhost',
            port     : 3306,
            user     : 'root',
            password : '',
            database : 'livraria'
        }
    );

    global.connection = connection
    return global.connection
}


async function listarLivros()
{
    const conexao = await conectarBD()
    const [registros] = await conexao.query('select * from livros;')
    return registros
}

async function inserirLivro(livro)
{
    const conexao = await conectarBD()
    const sql = "insert into livros (livtitulo, livano, gencodigo) values (?,?,?);"
    return await conexao.query(sql, [livro.titulo, livro.ano, livro.genero])
}


async function apagarLivro(codigo)
{
    const conexao = await conectarBD()
    const sql = "delete from livros where livcodigo=?;"
    return await conexao.query(sql,[codigo])
}


async function recuperarLivro(codigo)
{
    const conexao = await conectarBD()
    const sql = "select * from livros where livcodigo=?;"
    const [livro] = await conexao.query(sql,[codigo])
    return livro [0]
}

async function alterarLivro(livro){
    const conexao = await conectarBD()
    const sql = "UPDATE livros SET livtitulo=?, livano=?, gencodigo=? WHERE livcodigo=?;"
    return await conexao.query(sql,[livro.titulo, livro.ano, livro.genero, livro.codigo])
}

module.exports = { listarLivros, inserirLivro, apagarLivro, recuperarLivro, alterarLivro }