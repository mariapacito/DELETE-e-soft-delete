const express = require('express')
const { readJSON, writeJSON } = require('./utils/file')
const app = express()
app.use(express.json())


app.delete('/products/:id', async (req, res) => {
  const id = Number(req.params.id)
  const products = await readJSON('products.json')
  const idx = products.findIndex(p => p.id === id)
  if (idx === -1) return res.status(404).json({ erro: 'Produto não encontrado' })

  products.splice(idx, 1) // remove do array
  await writeJSON('products.json', products)
  res.status(204).end()
})


app.delete('/products-soft/:id', async (req, res) => {
  const id = Number(req.params.id)
  const products = await readJSON('products.json')
  const product = products.find(p => p.id === id)
  if (!product) return res.status(404).json({ erro: 'Produto não encontrado' })
  if (product.deletedAt) return res.status(409).json({ erro: 'Já removido' })

  product.deletedAt = new Date().toISOString()
  await writeJSON('products.json', products)
  res.status(204).end()
})

app.get('/products', async (req, res) => {
  const products = await readJSON('products.json')
  res.json(products.filter(p => !p.deletedAt))
})


app.delete('/users/:id', async (req, res) => {
  const id = Number(req.params.id)
  const force = req.query.force === 'true'
  const users = await readJSON('users.json')
  const user = users.find(u => u.id === id)
  if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' })

  if (force) {
    const idx = users.findIndex(u => u.id === id)
    users.splice(idx, 1)
    await writeJSON('users.json', users)
    return res.status(204).end()
  }

  if (user.deletedAt) return res.status(409).json({ erro: 'Já removido' })
  user.deletedAt = new Date().toISOString()
  await writeJSON('users.json', users)
  res.status(204).end()
})

app.get('/users', async (req, res) => {
  const users = await readJSON('users.json')
  res.json(users.filter(u => !u.deletedAt))
})

app.patch('/users/:id/restore', async (req, res) => {
  const id = Number(req.params.id)
  const users = await readJSON('users.json')
  const user = users.find(u => u.id === id)
  if (!user) return res.status(404).json({ erro: 'Não encontrado' })
  user.deletedAt = null
  await writeJSON('users.json', users)
  res.json(user)
})

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000')
})
