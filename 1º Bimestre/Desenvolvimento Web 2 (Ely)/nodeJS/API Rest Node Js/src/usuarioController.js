async function connect() {
    if (global.connection && global.connection.state != 'disconnect') {
        return global.connection;
    }

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(
        {
            host: '54.91.193.137' , user: 'libertas', password: '123456', database: 'libertas5per'
        }
    );
    global.connection = connection;
    return connection;

} 

exports.post = async (req, res, next) => {
    const con = await connect();
    const sql = "INSERT INTO usuario " + " (nome, telefone, email, senha) " + " VALUES (?,?,?,?)";
    const values = [req.body.nome, req.body.telefone, req.body.email, req.body.senha];
    await con.query(sql, values);
    res.status(201).send("ok");
}
exports.put = async (req, res, next) => {
    let id = req.params.id;
    const con = await connect();
    const sql = "UPDATE usuario " + " SET nome = ?, telefone = ?, " + " email = ?, senha = ? " + " WHERE idusuario =?";
    const values = [req.body.nome, req.body.telefone, req.body.email, req.body.senha, id];
    await con.query(sql, values);
    res.status(201).send("Alterado com sucesso!");
}
exports.delete = async (req, res, next) => {
    let id = req.params.id;
    const con = await connect();
    const sql = "DELETE FROM usuario " + " WHERE idusuario =?";
    const values = [id];
    await con.query(sql, values);
    res.status(200).send("Deletado com sucesso! ");
}
exports.get = async (req, res, next) => {
    const con = await connect();
    const [rows] = await con.query("select * from usuario");
        res.status(200).send(rows);
}
exports.getById = async (req, res, next) => {
    //pega o id por parâmetro
    let id = req.params.id;
    //abre conexão com o banco
    const con = await connect();
    try{
        //executar o select com um critério para retornar apenas o registro com id
        const sql = "SELECT * FROM usuario " + " WHERE idusuario =?";
        const values = [id];
        const [rows] = await con.query(sql, values);
        //verifica se existe o usuário
        if(rows.length != 0) {
            res.status(200).send(rows[0]);
        }
        else{
            res.status(404).send("Not Found");
        }
    }catch(error){
        res.status(500).send("Erro ao buscar usuario!");
    }
}