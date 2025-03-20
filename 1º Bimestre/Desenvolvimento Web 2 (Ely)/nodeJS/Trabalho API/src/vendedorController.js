async function connect() {
    if (global.connection && global.connection.state != 'disconnect') {
        return global.connection;
    }

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(
        {
            host: '127.0.0.1' , user: 'root', password: '0207', database: 'vendedores'
        }
    );
    global.connection = connection;
    return connection;

} 

exports.post = async (req, res, next) => {
    const con = await connect();
    const sql = "INSERT INTO vendedor " + " (nome, telefone, email, cidade) " + " VALUES (?,?,?,?)";
    const values = [req.body.nome, req.body.telefone, req.body.email, req.body.cidade];
    await con.query(sql, values);
    res.status(201).send("ok");
}
exports.put = async (req, res, next) => {
    let id = req.params.id;
    const con = await connect();
    const sql = "UPDATE vendedor " + " SET nome = ?, telefone = ?, " + " email = ?, cidade = ? " + " WHERE idvendedor =?";
    const values = [req.body.nome, req.body.telefone, req.body.email, req.body.cidade, id];
    await con.query(sql, values);
    res.status(201).send("Vendedor alterado com sucesso!");
}
exports.delete = async (req, res, next) => {
    let id = req.params.id;
    const con = await connect();
    const sql = "DELETE FROM vendedor " + " WHERE idvendedor =?";
    const values = [id];
    await con.query(sql, values);
    res.status(200).send("Vendedor excluído com sucesso! ");
}
exports.get = async (req, res, next) => {
    const con = await connect();
    const [rows] = await con.query("select * from vendedor");
        res.status(200).send(rows);
}
exports.getById = async (req, res, next) => {
    //pega o id por parâmetro
    let id = req.params.id;
    //abre conexão com o banco
    const con = await connect();
    try{
        //executar o select com um critério para retornar apenas o registro com id
        const sql = "SELECT * FROM vendedor " + " WHERE idvendedor =?";
        const values = [id];
        const [rows] = await con.query(sql, values);
        //verifica se existe o vendedor
        if(rows.length != 0) {
            res.status(200).send(rows[0]);
        }
        else{
            res.status(404).send("Not Found");
        }
    }catch(error){
        res.status(500).send("Erro ao buscar vendedor!");
    }
}