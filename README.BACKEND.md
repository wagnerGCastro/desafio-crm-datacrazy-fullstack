# Desafio Node.js e React.js

### Dependências utilizadas

- Node.js v18.17.0
- Nest.js v9.0.0
- TypeScript
- TypeOrm
- PostgreSQL
- Docker

### Baixe e execute o projeto localmente

**1 -** Atenção!! Para iniciar este projeto sem erro precisa primeiro iniciar a API do Backend

**2 -** Clone o projeto e instale as dependências:

```
$ git https://github.com/wagnerGCastro/desafio-crm-datacrazy-fullstack
$ cd desafio-crm-datacrazy-fullstack
```

**2 -** Executar os camandos docker para subir o Banco de Dados, Backend Localmente,

```
1- $ docker-compose -f docker-compose.dev.yml --compatibility build --no-cache backend postgres pgadmin

2- $ docker-compose --project-name crm-data-crazy -f docker-compose.dev.yml --compatibility up  --remove-orphans backend

```

**3 -** Aguardar alguns segundos para o container executar, para acessar o banco com usuário default:

```
- Usuário Admin
  user: admin
  password: postgres
  database: postgres
```

**4 -** Depois do banco Postgres ter subido sem erro, agora pode acessar o backend:

Abra o navegador e acesse [http://localhost:3071](http://localhost:3071) para visualizar o projeto.

**5 -** O arquivo api.example.http dentro da pasta backend contém os endpoints da APi de exemplo
para executar o aquivo precisar instalar o plugin REST Client do Vscode

```
$ ./desafio-crm-datacrazy-fullstack/backend/api.example.http
```
