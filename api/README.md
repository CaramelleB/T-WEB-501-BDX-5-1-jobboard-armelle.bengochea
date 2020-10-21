# Job Board API

### You need to install
- [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/) or [MariaDB](https://mariadb.com/kb/en/getting-installing-and-upgrading-mariadb/)
- [Python 3.6](https://www.python.org/downloads/) or latest
- [pip3](https://pip.pypa.io/en/stable/installing/)

### Add permissions
check that you are in `~/<repos>/api/`

```bash
$ sudo chmod +x ./bin/*
```

### Dependencies
```bash
$ pip3 install -r requirements.txt
```

Add `.env` file with your mysql logins
Always since `~/<repos>/api/`

```bash
echo \
"
MYSQL_HOST='127.0.0.1'
MYSQL_USER='<USER>'
MYSQL_PASSWORD='<PASSWORD>'
MYSQL_DB='jobboard'
"\
> ./.env
```

### Create Database
```bash
$ bin/get_db.sh
```

### Run
Run in develpment
```bash
$ bin/server.debug.sh
```
