# Parse Server project Docker boilerplate

## Description

Boilerplate project for Parse Server
* DB adapter is [PostgreSQL](https://hub.docker.com/_/postgres/) running in [Docker](https://hub.docker.com/r/parseplatform/parse-server/)
* Files adapter is [parse-server-fs-adapter](https://github.com/parse-server-modules/parse-server-fs-adapter)
* Cloud code is written in [Typescript](https://www.typescriptlang.org/)

## Prerequisites

* Have [Docker](https://www.docker.com/) installed on your machine

## Cloud Code
The main file of the Cloud code is located in ./cloud/main.ts.

Do not edit *.js files as they will be will be regenerated everytime you transpile the code.

**Warning** - Javascript files in Cloud code are added to .gitignore.

### Transpile cloud code
```sh
$ npm run transpile
```
Watch mode is enabled by default, meaning that the the transpiler will watch for file changes and retranspile the code.
You can disable this behaviour in tsconfig.json by setting "watch": false.
Feel free to change the Typescript configuration to your needs.

## Edit PostgreSQL configuration
You can edit the database configuration in ./docker-compose.yml.

More documentation can be found on the [Docker repository](https://hub.docker.com/_/postgres/) of the used image.

You can use the configuration as-is but you should at least change:
* The database password **POSTGRES_PASSWORD**.
Do not forget to also change the passwords in the Parse config files.

## Edit the Parse configuration
You can declare all the common configuration in ./config.common.json.
The list of options can be found [here](https://github.com/parse-community/parse-server#configuration).

Specific settings to your environment must be declared in config.*environment*.json. You can have as many environments as you want.

Both of those files will be merged when initializing the Parse server.
By default, if not specified, the prod environment will be used.


## Run the server
Make sure you have [Docker](https://www.docker.com/) installed and run the command
```sh
# In the project root folder
$ npm run transpile # Transpile the cloud code if not already done
$ docker-compose up # Run the database
$ npm run start -- --env <environment> # Run the server in the wished environemnt. You can just run npm start to use the default prod environment.
```
