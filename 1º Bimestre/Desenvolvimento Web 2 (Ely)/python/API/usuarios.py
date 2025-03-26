import pymysql
from db_config import connect_db
from flask import jsonify
from flask import flash, request, Blueprint

usuario_bp = Blueprint("usuario", __name__)


@usuario_bp.route('/usuario')
def usuarios():
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM usuario")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@usuario_bp.route('/usuario/<id>')
def usuariobyid(id):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM usuario WHERE idusuario = %s", (id))
        rows = cursor.fetchall()
        resp = jsonify(rows[0])
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@usuario_bp.route('/usuario', methods=["POST"])
def usuarionovo():
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        #pegar os dados do JSON
        usuario = request.json
        nome = usuario['nome']
        email = usuario['email']
        senha = usuario['senha']
        telefone = usuario['telefone']
        cursor.execute("INSERT INTO usuario (nome, email, senha, telefone) VALUES (%s, %s, %s, %s)", (nome, email, senha, telefone))

        conn.commit()
        resp = jsonify({"message": "Usuário inserido com sucesso!"})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

#PUT
@usuario_bp.route('/usuario/<id>', methods=["PUT"])
def usuarioalterar(id):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        #pegar os dados do JSON
        usuario = request.json
        nome = usuario['nome']
        email = usuario['email']
        senha = usuario['senha']
        telefone = usuario['telefone']
        cursor.execute("UPDATE usuario set nome = %s, email = %s, senha = %s, telefone = %s WHERE idusuario = %s " ,(nome, email, senha, telefone, id))

        conn.commit()
        resp = jsonify({"message": "Usuário alterado com sucesso!"})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

#DELETE
@usuario_bp.route('/usuario/<id>', methods=["DELETE"])
def usuarioexcluir(id):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        cursor.execute("DELETE FROM usuario WHERE idusuario = %s ", (id))

        conn.commit()
        resp = jsonify({"message": "Usuário excluído com sucesso!"})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()
