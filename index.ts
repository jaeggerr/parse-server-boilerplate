import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'
import * as express from 'express'
import * as minimist from 'minimist'
import { ParseServer } from 'parse-server'

const CONFIG_COMMON_FILE_PATH = './config.common.json'
const CONFIG_DEFAULT_FILE_PATH = './config.prod.json'

const argv = minimist(process.argv.slice(2))
let config = require(CONFIG_COMMON_FILE_PATH)

const environment = argv['env']
if (environment) {
  try {
    config = Object.assign(config, require(`./config.${environment}.json`))
  } catch (error) {
    console.warn(`You must create a configuration file in the root folder of your project with the name 'config.${environment}.json'`)
    process.exit(1)
  }
} else {
  config = Object.assign(config, require('./config.prod.json'))
}

if (!config.cloud) {
  config.cloud = path.join(__dirname, 'cloud/main.js')
}

let app = express()
let server

// Add IP address in headers
app.use(function (req, res, next) {
  let ip = req.ip
  if (ip.substr(0, 7) === '::ffff:') {
    ip = ip.substr(7)
  }
  req.headers['client-ip'] = ip
  next()
})

app.use('/parse', new ParseServer(config))

if (config.https) {
  // HTTPS
  const privateKey = fs.readFileSync(config.https.key, 'utf8')
  const certificate = fs.readFileSync(config.https.cert, 'utf8')
  server = https.createServer({key: privateKey, cert: certificate}, app)
  server.listen(config['port'], function () {
    console.log(`${config.appName} parse server running on port ${config.port}`)
  })

  if (config.https.rejectUnauthorized === false) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }
} else {
  // No HTTPS
  server = app.listen(config['port'], function () {
    console.log(`${config.appName} parse server running on port ${config.port}`)
  })
}

// Create Live Query server
if (config.liveQuery) {
  ParseServer.createLiveQueryServer(server)
}

// Useful logs
console.log('Launch parse dashboard with this command:')
console.log(`parse-dashboard --appId ${config.appId} --masterKey ${config.masterKey} --serverURL "${config.serverURL}" --appName "${config.appName}"`)
