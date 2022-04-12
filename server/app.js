const express = require('express');
const cors = require('cors');
const path = require("path");


const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.CORS_ORIGIN || `http://localhost:${PORT}`
console.log('CORS_ORIGIN', ORIGIN)
const corsOptions = {
  // origin: ORIGIN,
  optionsSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions))
app.use(express.json())
// app.use(express.static(path.join(__dirname, "../build")));
app.use(express.static(path.join(__dirname, "../dist")));


const api = require('./api/index.js');

app.get('', (req, res) => {
  res.send('index.html')
})


app.get('/product/data', (req, res) => {
  console.log('GET req at /product/data', req.url)
  // console.log(req.query)

  const newId = req.query.productId || null;
  const endpoints = req.query.endpoints ? req.query.endpoints.split(';') : null;
  if (newId && endpoints) {
    api.get.productData(newId, endpoints)
      .then(productRes => res.status(200).send(productRes))
      .catch(err => console.log('api.get.allProductData err', err))
  } else {
    res.status(406).send('No product id attached')
  }
})




app.post('/new',  (req, res) => {
  console.log('\nPOST req at /new', req.url)
  // console.log('query', req.query)
  // console.log('body', req.body)

  const { typeId, productId, type, post } = req.body;
  if (type && post) {
    api.post[type](post, productId, typeId)
      .then(postRes => res.status(204).send('created'))
      .catch(err => console.log('api.post err', req.body,  err))
  } else {
    res.status(406).send('Type/body not attached')
  }
})


app.post('/report',  (req, res) => {
  console.log('\nREPORT req at /report', req.url)
  // console.log('query', req.query)
  // console.log('body', req.body)

  const { typeId, productId, type } = req.body;
  if (type && typeId) {
    api.post[type].report(typeId, productId)
      .then(postRes => res.status(204).send('created'))
      .catch(err => console.log('api.post.report err', req.body,  err))
  } else {
    res.status(406).send('Type/body not attached')
  }
})

app.post('/upvote',  (req, res) => {
  console.log('\nUPVOTE req at /upvote', req.url)
  // console.log('query', req.query)
  // console.log('body', req.body)

  const { typeId, productId, type } = req.body;
  if (type && typeId) {
    api.post[type].helpful(typeId, productId)
      .then(postRes => res.status(204).send('created'))
      .catch(err => console.log('api.post.upvote err', req.body, err))
  } else {
    res.status(406).send('Type/body not attached')
  }
})

app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);