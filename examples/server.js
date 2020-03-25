const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')


const app = express()
const complier = webpack(WebpackConfig)

app.use(webpackDevMiddleware(complier, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(complier))
// app.use(express.static(__dirname, {
//   setHeaders(res) {
//     res.cookie('XSRF-TOKEN-D', Math.random().toString(16).slice(2))
//   }
// })) 

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

registerSimpleRouter()
registerBaseRouter()

function registerSimpleRouter() {
  router.get('/simple/get', function (req, res) {
    res.json({
      msg: 'hello world'
    })
  })
}

function registerBaseRouter() {
  router.get('/base/get', function (req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function (req, res) {
    res.json(req.body)
  })
}

function registerErrorRouter() {
  router.get('/error/timeout', function (req, res) {
    setTimeout(() => {
        res.json({
            msg: 'hello world'
        })
    }, 3000)
  })
}


app.use(router)
const port = process.env.PORT || 3000

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
});