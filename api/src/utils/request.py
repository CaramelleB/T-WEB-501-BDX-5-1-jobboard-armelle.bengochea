from src.utils.connect import connection


def do_get(sql, *params):
    conn = connection()
    cursor = conn.cursor()
    if sql is None or sql == "":
        return {"msg": "Missing SQL request!"}

    if params:
        cursor.execute(sql, params)
        res_data = cursor.fetchall()
        response = {
            "msg": "Request with params success!",
            "data": res_data if len(res_data) != 0 else "Doesn't exists!"
        }
    else:
        cursor.execute(sql)
        res_data = cursor.fetchall()
        response = {
            "msg": "Request success!",
            "data": res_data if len(res_data) != 0 else "Doesn't exists!"
        }
    conn.commit()
    conn.close()
    return response


def do_post(sql, data):
    conn = connection()
    cursor = conn.cursor()
    if sql is None or sql == "":
        return {"err": "Missing SQL request!"}
    if data is None:
        return {"err": "Missing data request!"}

    if type(sql) is tuple and type(data[0]) is tuple:
        i = 0
        for req in sql:
            cursor.execute(req, data[i])
            i += 1
        response = {"msg": "Multiple Request post success!"}
    else:
        cursor.execute(sql, data)
        response = {"msg": "Request post success!"}

    conn.commit()
    conn.close()
    return response


def do_delete(sql, params):
    conn = connection()
    cursor = conn.cursor()
    if sql is None or sql == "":
        return {"msg": "Missing SQL request!"}
    if params is None:
        return {"msg": "Missing params request!"}

    cursor.execute(sql, params)
    response = {
        "msg": "Request delete success!"
    }
    conn.commit()
    conn.close()
    return response


def do_put(sql, data):
    conn = connection()
    cursor = conn.cursor()
    if sql is None or sql == "":
        return {"msg": "Missing SQL request!"}
    if data is None:
        return {"msg": "Missing data request!"}

    if type(sql) is tuple and type(data[0]) is tuple:
        i = 0
        for req in sql:
            cursor.execute(req, data[i])
            i += 1
        response = {"msg": "Multiple Request put success!"}
    else:
        cursor.execute(sql, data)
        response = {"msg": "Request put success!"}

    conn.commit()
    conn.close()
    return response


def do_patch(sql, data):
    conn = connection()
    cursor = conn.cursor()
    if sql is None or sql == "":
        return {"msg": "Missing SQL request!"}
    if data is None or len(data) == 0:
        return {"msg": "Missing data request!"}

    cursor.execute(sql, data)
    response = {"msg": "Request patch success!"}

    conn.commit()
    conn.close()
    return response
