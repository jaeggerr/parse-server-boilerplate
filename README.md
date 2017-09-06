# Parse Server project Docker boilerplate

## Description

Boilerplate project for Parse Server running in [Docker](https://hub.docker.com/r/parseplatform/parse-server/)
* DB adapter is [PostgreSQL](https://hub.docker.com/_/postgres/)
* Files adapter is [parse-server-fs-adapter](https://github.com/parse-server-modules/parse-server-fs-adapter)
* Cloud code is written in [Typescript](https://www.typescriptlang.org/)

## Prerequisites

* Have [Docker](https://www.docker.com/) installed on your machine
* Have [parse-server-fs-adapter](https://github.com/parse-server-modules/parse-server-fs-adapter) globally installed ( *npm install -g parse-server-fs-adapter* )

## Cloud Code
The main file of the Cloud code is located in /parse-server/cloud/main.ts.
Do not edit *.js files as they will be will regenerated everytime you transpile the code.
**Warning** - Javascript files in Cloud code are added to .gitignore.

### Transpile cloud code
```sh
$ npm run transpile
```
Watch mode is enabled by default, meaning that the the transpiler will watch for file changes and retranspile the code.
You can disable this behaviour in tsconfig.json by setting "watch": false.
Feel free to change the Typescript configuration to your needs.

## Edit configuration
You can edit the Parse configuration in ./docker-compose.yml. More documentation can be found on the Docker repositories of the used images.
You can use the configuration as-is but you should at least change:
* The database password **POSTGRES_PASSWORD**.
Do not forget to also change the password written in PARSE_SERVER_DATABASE_URI.
* **PARSE_SERVER_APPLICATION_ID** if you want your Parse application to have a sexier name.
* Your Parse application master key **PARSE_SERVER_MASTER_KEY**.

## Run the server
Make sure you have [Docker](https://www.docker.com/) installed and run the command
```sh
# In the project root folder
$ npm run transpile # Transpile the cloud code if not already done
$ docker-compose up
```
