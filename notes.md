* Utilizar os comandos no terminal.

* Comando padrão no NodeJS.

- npm (vai ser usando em todos os comandos do node) como a função de um comando prefixo. Para executar scripts e bibliotecas instaladas. (Uso geral: para instalar pacotes)
- npm: gerenciador de pacote padrão aka (node package manager).

- npx (executador de pacotes)
- npx: executador de pacotes node

* Criando um novo projeto NodeJS.

- npm init: iniciar um novo projeto node.
- npm init (criar o projeto node para ser configurado manualmente).
- npm init -y (criar o projeto node com um preenchimento padrão).

* * Fazendo isso será criado um arquivo package.json (file que trás informações básicas do projeto Node).

* Framework/Módulos
* * Ao instalar qualquer Framework, irá ser criado um arquivo package-lock.json, e uma pasta node_modules.
- não modificar nada no arquivo package-lock.json, ele guarda todo o histórico de módulos utilizados no projeto.
- na pasta node_modules ficaram todos os módulos instalados,  não se preocupe se aparecer vários pastas e arquivos dentro dele, pois além do modulo instalado, ex:express, também serão instalados outros módulos por causa das dependências.

* * * Caso você esteja preocupado pelo espaço que a pasta node_modules está ocupando, não se preocupe você pode excluir ela a qualquer momento, para usar de novo é só utilizar o comando (npm install) que vai instalar todos os módulos que foram utilizados anteriormente, que estão guardados no histórico (fica no package-lock.json).

* * Express
- express: para lidar com requisições e respostas.
- express: para instalar (npm install express -save).

* * Nodemon
- nodemon: serve para reiniciar o servidor sempre que salvar alguma mudança no projeto.
- nodemon: (npm install nodemon --save dev)(dev = dependência de desenvolvimento, utilizado apenas em desenvolvimento).

* Executando scripts

- npm (+ comando), ex: npm start (executando o script start).
- npm run (+ comando), para executar scripts que não é padrão.



* SQL
* * Comandos DDL (Data Definition Language)

- CREATE = criar
- DROP = excluir
- ALTER = alterar

* * Comandos DML (Data Manipulation Language)

- C - Create = INSERT
- R - Read = SELECT
- U - Update = UPDATE
- D - Delete = DELETE
