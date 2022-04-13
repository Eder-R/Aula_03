const mysql = require('mysql2/promise');

async function connect() {
  if(global.connection && global.connection.state !== 'disconected')
  {
      return global.connection
  }
  const connection = await mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : '',
    database  : 'livraria',
    port      : 3306
  });
  global.connection = connection
  return connection;
}

async function listarLivros() {
  const connection = await connect();
  const [registros] = await connection.query('SELECT * FROM livros');
  return registros;
}

module.exports = { listarLivros };