# Prova P2 Desenvolvimento Web — Código-base Full-stack

Projeto-base para a questão prática da prova.

## Estrutura

```text
backend-produtos/
frontend-produtos/
```

## Objetivo

Completar a aplicação full-stack de produtos implementando as funcionalidades:

1. `GET /produtos/{id}`
2. `POST /produtos`
3. `PUT /produtos/{id}`
4. `DELETE /produtos/{id}`
5. Integração no React para listar, cadastrar, editar, buscar por ID e excluir produtos.

Este projeto já contém:

- Back-end Spring Boot com endpoint `GET /produtos` funcionando.
- CORS configurado (direcionador de links).
- Lista de produtos em memória.
- Front-end React em estrutura compatível com `npx create-react-app`.
- Tela inicial com listagem de produtos via API java springboot.

## Execução

### Back-end

```bash
cd backend-produtos
mvn spring-boot:run
```

API:

```text
http://localhost:8080
```

### Front-end

```bash
cd frontend-produtos
npm install
npm start
```

Front-end:

```text
http://localhost:3000
```
