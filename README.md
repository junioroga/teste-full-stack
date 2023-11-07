# Teste full-stack Hygea

#### Descrição do teste
Seu desafio consiste em desenvolver um CRUD para uma entidade já existente chamada 'USER'. Além disso, é necessário criar um front-end que consuma a API, apresentando as funcionalidades de CRUD para essa entidade de USER. Na função de LIST, defina e implemente alguns filtros.

Um ponto EXTRA será atribuído pela inclusão de uma funcionalidade de busca com autocompletar na lista de usuários.

#### Comandos para levantar o server
```bash
cd server
yarn install
yarn docker-up
yarn dev
```

#### Requisitos para o teste
- Um front-end desenvolvido em Next.js ou React Native, incorporando as seguintes funcionalidades:
    - Listagem de usuarios
    - Criação de usuarios
    - Exclusão de usuarios
    - Edição de usuarios

- A implementação dos seguintes endpoints na API já existente:
    - GET - user/list
    - GET - user/:id
    - POST - user/create
    - DELETE - user/delete/:id
    - PUT - user/:id/edit

#### Pontos que serão avaliados
- Organização
- Ferramentas utilizadas