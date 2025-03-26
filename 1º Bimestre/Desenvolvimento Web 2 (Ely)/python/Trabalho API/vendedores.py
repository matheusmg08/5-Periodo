import pymysql
from db_config import connect_db
from flask import jsonify
from flask import flash, request, Blueprint

vendedor_bp = Blueprint("vendedor", __name__)


@vendedor_bp.route('/vendedor')
def vendedores():
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM vendedor")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@vendedor_bp.route('/vendedor/<id>')
def vendedorbyid(id):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM vendedor WHERE idvendedor = %s", (id))
        rows = cursor.fetchall()
        resp = jsonify(rows[0])
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@vendedor_bp.route('/vendedor', methods=["POST"])
def vendedornovo():
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        #pegar os dados do JSON
        vendedor = request.json
        nome = vendedor['nome']
        telefone = vendedor['telefone']
        email = vendedor['email']
        cidade = vendedor['cidade']
        
        cursor.execute("INSERT INTO vendedor (nome, telefone, email, cidade) VALUES (%s, %s, %s, %s)", (nome, telefone, email, cidade))

        conn.commit()
        resp = jsonify({"message": "Vendedor inserido com sucesso!"})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

#PUT
@vendedor_bp.route('/vendedor/<id>', methods=["PUT"])
def vendedoralterar(id):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        #pegar os dados do JSON
        vendedor = request.json
        nome = vendedor['nome']
        telefone = vendedor['telefone']
        email = vendedor['email']
        cidade = vendedor['cidade']
        cursor.execute("UPDATE vendedor set nome = %s, telefone = %s, email = %s, cidade = %s WHERE idvendedor = %s " ,(nome, telefone, email, cidade, id))

        conn.commit()
        resp = jsonify({"message": "Vendedor alterado com sucesso!"})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

#DELETE
@vendedor_bp.route('/vendedor/<id>', methods=["DELETE"])
def vendedorexcluir(id):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        cursor.execute("DELETE FROM vendedor WHERE idvendedor = %s ", (id))

        conn.commit()
        resp = jsonify({"message": "Vendedor excluído com sucesso!"})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()
