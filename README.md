# Parse Server project boilerplate

## Description

Boilerplate project for Parse Server
* DB adapter is PostgreSQL
* Files adapter is [parse-server-fs-adapter](https://github.com/parse-server-modules/parse-server-fs-adapter)
* Cloud code is written in [Typescript](https://www.typescriptlang.org/)

## Cloud Code
The main file of the Cloud code is located in ./cloud/main.ts.

**Warning** - Javascript files in Cloud code are added to .gitignore.

## PostgreSQL examples
There are plenty of ways to configure your database. Here are some basic example.

### Create a new user for Parse and create a new database for your application

```sh
# Create a new user
$ createuser parse

# Set the password
$ psql -d postgres
postgres=# \password parse
postgres=# \q

# Create a new database
$ psql -U parse -d postgres
postgres=# CREATE DATABASE myApplication OWNER parse;
```

### Dump the database

```sh
$ pg_dump -U parse -d myApplication > db-dump.sql
```

### Load a dump to a database

```sh
$  psql -d myApplication -f db-dump.sql
```

## Edit the Parse configuration
You can declare all the common configuration in ./config.common.json.
The list of options can be found [here](https://github.com/parse-community/parse-server#configuration).

Specific settings to your environment must be declared in config.*environment*.json. You can have as many environments as you want.

Both of those files will be merged when initializing the Parse server.
By default, if not specified, the prod environment will be used.


## Run the server
```sh
# In the project root folder
$ npm run start -- --env <environment> # Run the server in the wished environemnt. You can just run npm start to use the default prod environment.
```
