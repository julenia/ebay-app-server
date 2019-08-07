const Sequelize = require('sequelize')
const { Router } = require('express')
const router = new Router()
//const bodyParser = require('body-parser')

const databaseUrl = 'postgres://postgres:secret@localhost:5432/postgres'
const db = new Sequelize(databaseUrl)

const Items = db.define('items', {
  name: Sequelize.TEXT,
  surname: Sequelize.TEXT,
  title: Sequelize.TEXT,
  description: Sequelize.TEXT,
  image: Sequelize.TEXT,
  price: Sequelize.FLOAT,
  email: Sequelize.TEXT,
  phone: Sequelize.TEXT
})

db.sync()
.then(()=> console.log('database connected'))
.catch(err => console.log(err))

router.post('/item', (req, res, next) =>{
  Items.create(req.body)
  .then(item => res.json(item))
  .catch(next)
})

router.get('/item', (req, res, next)=>{
  Items.findAll()
  .then(items => res.json(items))
  .catch(next)
})

router.get('/item/:id', (req, res, next)=>{
  Items.findByPk(req.params.id)
  .then(item => res.send(item))
  .catch(next)
})

router.put('/item/:id', (req, res, next) =>{
  Items.findByPk(req.params.id)
  .then(item => item.update(req.body))
  .then(item => res.json(item))
  .catch(next)
})

router.delete('/item/:id', (req, res, next) => {
  Items.destroy({where: {id: req.params.id}})
  .then(number => res.send(number))
  .catch(next)
})

module.exports = router