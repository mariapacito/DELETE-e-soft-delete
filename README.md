# Soft Delete API

Uma API simples em **Node.js + Express** que demonstra três níveis de exclusão de dados:

- **Hard delete de produtos** (`DELETE /products/:id`)
- **Soft delete de produtos** (`DELETE /products-soft/:id`) com filtro em `GET /products`
- **Exclusão de usuários com opção de force delete** (`DELETE /users/:id?force=true`)
