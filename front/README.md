# Job Board Front

### You need to install
- [Node](https://nodejs.org/en/download/package-manager/)
- [yarn](https://classic.yarnpkg.com/fr/docs/install/#debian-stable) or [npm](https://www.npmjs.com/get-npm)

### Dependencies
check that you are in `~/<repos>/front/`
```bash
$ yarn
```
or
```bash
$ npm install
```
<!--
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
``` -->

### Run
Run in develpment
Always since `~/<repos>/front/`
```bash
$ yarn start
```
or
```bash
$ npm run start
```
