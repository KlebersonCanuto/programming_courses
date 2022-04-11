## Programming Courses API
Manual de uso da API

### Preparativos

Primeiramente, intale as dependências com o seuginte comando:

`npm install`

Após isso, preencha as variáveis de ambiente, com as seguintes variáveis:

```
PORT # Porta na qual a API será hospedada (8080 caso não seja utilizado o parâmetro)
JWTTOKEN # Chave privada do JWT
HASH # Salt do bcrypt 

DB_USERNAME # Usuário do seu banco de dados (já criado)
DB_PASSWORD # Senha do usuário do seu banco de dados
DB_HOST # Host do seu banco de dados
DB_PORT # Porta do seu banco de dados
DB_NAME # Nome do seu banco de dados

AWS_ACCESS_KEY_ID # Access key ID da AWS
AWS_SECRET_ACCESS_KEY # Access key secret da AWS
AWS_IMAGE_BUCKET # Bucket de imagens
AWS_CODE_BUCKET # Bucket de códigos
```

Então realize a migração do banco de dados, com o seguinte comando:

`npm run migrate`

Para popular o sistema com um usuário admin, preencha as seguintes variáveis de ambiente:

```
ADMIN_EMAIL # Email do usuário padrão
ADMIN_PASSWORD # Senha do usuário padrão
```

Em seguida execute o seguinte comando:

`npm run seed`

### Execução

Com tudo devidamente configurado, basta executar um dos seguintes comandos:

`npm start`
`docker-compose up`

Então o sistema estará executando em sua máquina.

### Testes

Para executar os testes, preencha as seguintes variáveis de ambiente:

```
TEST_FILE # Path do arquivo de código para testes
TEST_IMAGE_FILE # Path do arquivo de imagem para testes
DB_TEST_NAME # Nome de um banco de dados de teste
```

Então execute o seguinte comando:

`npm run test`