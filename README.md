# API Garotos de Programa

Link da api: https://testedeploybackm5-8b207db3eb59.herokuapp.com/ ;

Bem-vindo à API Garotos de Programa! Esta API permite que você registre e edite usuários, faça login e cadastre clientes. Tudo com validações rigorosas para garantir a segurança dos dados.

# Endpoint SignUP

- **Cadastro de Usuário**: `POST /signUp`

- :bulb: **Observação: Todos os dados obrigatórios estão identificados com "\*". E caso não sejam preenchidos ou enviados com valor vazio haverá um retorno com os seguintes dados:**

> status(400)

Dados não enviados:

> {
> message: O campo "nome do campo" é obrigatório.
> }

Envio de dados vazios:

> {
> message: O campo "nome do campo" não pode estar vazio.
> }

### Dados de Entrada

Para cadastrar um novo usuário, você deve fornecer os seguintes dados:

- `nome` \* : **Nome do usuário** (deve conter nome e sobrenome, sendo apenas letras e espaços).

- `email`\* : **Endereço de e-mail válido** (Se já estiver cadastrado será retonado um erro).

- `password`\* : **Senha com pelo menos 8 caracteres**, incluindo pelo menos um número, um caractere especial e uma letra maiúscula.

## Exemplo de Requisição

- Aqui está um exemplo de como fazer uma requisição para cadastrar um novo usuário:

> POST /signup
> Content-Type: application/json
>
> {
> "nome": "Exemplo",
> "email": "exemplo@email.com",
> "password": "Senha123!"
> }

**Respostas:**
Sucesso (Status 201):

- Se todas as validações forem bem-sucedidas, o usuário será cadastrado e a API retornará uma mensagem de sucesso:

{
"message": "Usuário cadastrado com sucesso!"
}

**Erros Possíveis:**

- A API retornará mensagens de erro específicas para cada validação não atendida. Aqui estão alguns exemplos:

Status 400 (Bad Request) - Validação de Nome:

> { "message": "Nome deve conter apenas letras ou espaços." }

Status 400 (Bad Request) - Validação de E-mail:

> {"message": "Endereço de e-mail inválido."}

Status 400 (Bad Request) - E-mail já registrado:

> { "message": "Email já cadastrado." }

Status 400 (Bad Request) - Validação de Senha:

> { "message": "A senha deve ter pelo menos 8 caracteres, incluindo um número, um caractere especial e uma letra maiúscula." }

---

# Endpoint Login

- **Login de Usuário**: `POST /login`

### Dados de Entrada

Para fazer login, você deve fornecer os seguintes dados:

- `email`\*: Endereço de e-mail registrado.
- `password`\*: Senha correspondente à conta.

## Exemplo de Requisição

Aqui está um exemplo de como fazer uma requisição para fazer login:

> POST /login
> Content-Type: application/json
>
> {
> "email": "exemplo@email.com",
> "password": "Senha123!"
> }

**Respostas:**
Sucesso (Status 200):

- Se as credenciais de login estiverem corretas, a API retornará um objeto contendo o nome do usuário, seu e-mail e um token de autenticação:

> {
> "name": "Exemplo",
> "email": "exemplo@email.com",
> "token": "seu-token-de-autenticacao"
> }

**Erros Possíveis:**

- A API retornará mensagens de erro específicas em caso de problemas durante o processo de login:

Status 404 (Not Found) - Usuário não encontrado:

> { "message": "Usuário não encontrado." }

Status 404 (Not Found) - Senha incorreta:

> { "message": "A senha não confere." }

---

# Endpoint getUser

- **Cadastro de Usuário**: `GET /user/id`

### Dados de Entrada

- **O usuário deve estar autenticado para poder fazer o get de informações**

  - Não precisa enviar o ID do usuário na rota pois o ID é validado pelo token do usuário logado

## Exemplo de Requisição

> GET /user
> Content-Type: application/json
> headers: {
> 'Authorization': `Bearer ${token}`
> };

**Respostas:**
Sucesso (Status 200):

- Se todas as validações forem bem-sucedidas, o usuário será cadastrado e a API retornará um objeto contendo as informações do usuario:

> {
> "nome": "Novo Nome",
> "email": "novo@email.com",
> "cpf": "12345678901",
> "telephone": "1234567890",
> "password": "senhaCriptografadaHash"
> }

**Erros Possíveis:**

- A API retornará mensagens de erro específicas para cada validação não atendida. Aqui estão alguns exemplos:

Status 404 (Not Found) - Validação de ID:

> { "message": "Usuário não encontrado." }

---

# Endpoint Edição de Usuário

- **Edição de Usuário**: `PUT /user/update`

### Dados de Entrada

- Para editar um usuário existente, você pode fornecer os seguintes dados:

- `nome`\*: Nome do usuário (deve conter apenas letras).
- `email`\*: Endereço de e-mail válido (não pode já estar registrado no banco de dados).
- `cpf`: CPF válido com exatamente 11 caracteres (apenas números).
- `telefone`: Número de telefone (apenas números).
- `password`\* : : **Senha com pelo menos 8 caracteres**, incluindo pelo menos um número, um caractere especial e uma letra maiúscula.

## Exemplo de Requisição

- Aqui está um exemplo de como fazer uma requisição para editar um usuário existente:

- **O usuário deve estar autenticado para poder fazer a alteração de suas informações**

  - Não precisa enviar o ID do usuário na rota pois o ID é validado pelo token do usuário logado

> PUT /user/update
> Content-Type: application/json
>
> headers: {
> 'Authorization': `Bearer ${token}`
> };
>
> {
> "nome": "Novo Nome",
> "email": "novo@email.com",
> "cpf": "12345678901",
> "telefone": "1234567890"
> }

**Respostas:**

Sucesso (Status 200):

- Se todas as validações forem bem-sucedidas, o usuário será atualizado e a API retornará uma mensagem de sucesso:

> {"message": "Usuário atualizado com sucesso!"}

**Erros Possíveis:**

- A API retornará mensagens de erro específicas para cada validação não atendida. Aqui estão alguns exemplos:

Status 400 (Bad Request) - Nenhum dado foi alterado:

> {"message": "Ao menos um campo deve ser alterado."}

Status 400 (Bad Request) - Validação de Nome:

> {"message": "Nome deve conter apenas letras e espaços."}

Status 400 (Bad Request) - Validação de E-mail:

> {"message": "Endereço de e-mail inválido."}

Status 400 (Bad Request) - E-mail já registrado:

> {"message": "Email já está registrado."}

Status 400 (Bad Request) - Validação de CPF:

> {"message": "CPF inválido. Deve conter exatamente 11 dígitos."}

Status 400 (Bad Request) - Validação de Telefone:

> {"message": "O campo telefone deve conter apenas números."}

Status 400 (Bad Request) - Validação de Senha:

> { "message": "A senha deve ter pelo menos 8 caracteres, incluindo um número, um caractere especial e uma letra maiúscula." }

---

# Cadastro de Cliente

- **Cadastro de Cliente**: `POST /customer`

## Dados de Entrada

- Para cadastrar um novo cliente, você deve fornecer os seguintes dados:

- `id_responsable`\*: Esse dado é fornecido automáticamente de acordo com o token do usuário logado.
- `nome`\*: Nome do cliente (deve conter apenas letras).
- `email`\*: Endereço de e-mail válido (não pode já haver o mesmo e-mail de cliente cadastrado).
- `telephone`\*: Número de telefone (apenas números).
- `cep`\*: CEP válido com no máximo 8 caracteres (apenas números).
- `logradouro`\*: Logradouro (deve ser obrigatório).
- `complemento`\*: Complemento (não é obrigatório).
- `bairro`\*: Bairro (obrigatório).
- `cidade`\*: Cidade (obrigatória).
- `estado`\*: Estado (obrigatório e somente letras).

## Exemplo de Requisição

- Aqui está um exemplo de como fazer uma requisição para cadastrar um novo cliente:

- **O usuário deve estar autenticado para poder cadastrar um novo cliente**

  - Não precisa enviar o ID do usuário na rota pois o ID é validado pelo token do usuário logado

> POST /customer
> Content-Type: application/json
>
> headers: {
> 'Authorization': `Bearer ${token}`
> };
>
> {
> "nome": "Cliente Exemplo",
> "email": "cliente@email.com",
> "cpf": "11122233345",
> "telephone": "1234567890",
> "cep": "12345678",
> "logradouro": "Rua Exemplo, 123",
> "complemento": "Apto 123",
> "bairro": "Bairro Exemplo",
> "cidade": "Cidade Exemplo",
> "estado": "SP"
> }

**Respostas:**

Sucesso (Status 201):

Se todas as validações forem bem-sucedidas, o cliente será cadastrado e a API retornará uma mensagem de sucesso:

> {"message": "Cliente cadastrado com sucesso!"}

Erros Possíveis:

A API retornará mensagens de erro específicas para cada validação não atendida. Aqui estão alguns exemplos:

Status 400 (Bad Request) - Validação de Nome:

> {"message": "Nome deve conter apenas letras."}

Status 400 (Bad Request) - Verificação existência de CPF:

> {"message": "CPF já cadastrado"}

Status 400 (Bad Request) - Validação de CPF:

> {"message": "O CPF deve conter exatamente 11 caracteres"}

Status 400 (Bad Request) - Validação de CPF:

> {"message": "O CPF deve conter apenas números"}

Status 400 (Bad Request) - Validação de E-mail:

> {"message": "O e-mail deve ter um formato válido, exemplo: email@email.com"}

Status 400 (Bad Request) - E-mail já cadastrado:

> {"message": "Email já está cadastrado."}

Status 400 (Bad Request) - Validação de Telefone:

> {"message": "Número de telefone inválido. Deve conter apenas dígitos numéricos."}

Status 400 (Bad Request) - Validação de CEP:

> {"message": "O CEP deve ter no máximo 8 caracteres."}

Status 400 (Bad Request) - Validação de Estado:

> {"message": "Estado inválido. Deve conter apenas letras."}

---

# Listagem de Clientes

- **Listagem de Cliente**: `GET /customer`

## Dados de Entrada

- **O usuário deve estar autenticado para poder fazer o get de clientes**

  - Não precisa enviar o ID do cliente na rota pois o ID do responsável pelos cliente é validado pelo token do usuário logado

## Exemplo de Requisição
  > GET /customer
> Content-Type: application/json
> headers: {
> 'Authorization': `Bearer ${token}`
> };

**Respostas:**
Sucesso (Status 200):
		{
			"id": 1,
			"id_responsable": 58,
			"name": "teste",
			"email": "teste@email.com",
			"cpf": "12345678912",
			"telephone": "77998050515",
			"cep": "47862612",
			"logradouro": "bem ali",
			"complemento": "na casa",
			"bairro": "qualquer",
			"cidade": "qualqueruma",
			"estado": "feliz",
			"status": true
		}
**Erros Possíveis:**

- A API retornará mensagens de erro específicas para cada validação não atendida. Aqui estão alguns exemplos:

Status 404 (Not Found) - Validação de ID:

> { "message": "Cliente não encontrado." }

---

# Listagem de Cliente especifico

- **Listagem de Cliente por ID**: `GET /customer/:id`

## Dados de Entrada

- **O usuário deve estar autenticado para poder fazer o get de clientes**

  - Enviar o id do cliente no params para ver os dados.

## Exemplo de Requisição
  > GET /customer/1
> Content-Type: application/json
> headers: {
> 'Authorization': `Bearer ${token}`
> };

**Respostas:**
Sucesso (Status 200):
	{
	"id": 2,
	"id_responsable": 58,
	"name": "teste",
	"email": "teste8@email.com",
	"cpf": "12345678910",
	"telephone": "77998050515",
	"cep": "47862612",
	"logradouro": "bem ali",
	"complemento": "na casa",
	"bairro": "qualquer",
	"cidade": "qualqueruma",
	"estado": "feliz"
}
**Erros Possíveis:**

- A API retornará mensagens de erro específicas para cada validação não atendida. Aqui estão alguns exemplos:

Status 404 (Not Found) - Validação de ID:

> { "message": "Cliente não encontrado." }

---

# Cadastro de Cobrança

- **Cadastro de Cobrança**: `POST /charge`

## Dados de Entrada

- Para cadastrar uma nova cobrança, você deve fornecer os seguintes dados:

- `idCustomer`\*: Esse dado deve ser enviado de acordo ao cliente que for feita a cobrança (deve ser obrigatório).
- `value`\*: valor da cobraça (deve conter apenas numeros positivos)(deve ser obrigatório).
- `duedate`\*: data de vencimento (deve ser obrigatório).
- `status`\*: deve ser true ou false (deve ser obrigatório).
- `description`\*: descrição da cobrança deve ser uma string (deve ser obrigatório).

## Exemplo de Requisição

- Aqui está um exemplo de como fazer uma requisição para cadastrar uma nova cobrança:

- **O usuário deve estar autenticado para poder cadastrar umam nova cobrança**

> POST /charge
> Content-Type: application/json
>
> headers: {
> 'Authorization': `Bearer ${token}`
> };
>{
>"idcustomer": "2"
>"value": 123,
> "duedate": "10/03/2020",
>"status": "false",
>"description":"pagamento"	
>}

**Respostas:**

Sucesso (Status 201):

Se todas as validações forem bem-sucedidas, o cobrança será cadastrado e a API retornará uma mensagem de sucesso:

> {"message": "Cobrança cadastrado com sucesso!"}

Erros Possíveis:

A API retornará mensagens de erro específicas para cada validação não atendida. Aqui estão alguns exemplos:

Status 400 (Bad Request) - Validação do value:

> {"message": "Valor deve conter apenas numeros positivos."}

Status 400 (Bad Request) - Verificação existência do status:

> {"message": "o status deve ser boolean"}

Status 400 (Bad Request) - Validação de description:

> {"message": "O campo descrição deve conter apenas letras e espaços"}

Status 400 (Bad Request) - Validação de duedate:

> {"message": "O campo data de vencimento deve ser uma data valida"}

---

# Listagem de Cobranças

- **Listagem de Cobranças**: `GET /charge/:id`

## Dados de Entrada

- **O usuário deve estar autenticado para poder fazer o get de cobranças**

  - Enviar o id do cliente no params para ver todas as cobranças relacionadas a ele.

## Exemplo de Requisição
  > GET /charge/1
> Content-Type: application/json
> headers: {
> 'Authorization': `Bearer ${token}`
> };

**Respostas:**
Sucesso (Status 200):
[
	{
		"id": 5,
		"idcustomer": 2,
		"value": 20000,
		"duedate": "2000-10-07T03:00:00.000Z",
		"status": true,
		"description": "pagamento realizado"
	},
	{
		"id": 8,
		"idcustomer": 2,
		"value": 50000,
		"duedate": "2000-10-07T03:00:00.000Z",
		"status": false,
		"description": "pagamento programado"
	}
]
**Erros Possíveis:**

- A API retornará mensagens de erro específicas para cada validação não atendida. Aqui estão alguns exemplos:

Status 404 (Not Found) - Validação de ID:

> { "message": "Cobrança não encontrada." }

---
# Endpoint Edição de Cliente

- **Edição de cliente**: `PUT /customer/:id`

### Dados de Entrada

- Para editar um cliente existente, você pode fornecer os seguintes dados:

- `id_responsable`\*: Esse dado é fornecido automáticamente de acordo com o token do usuário logado.
- `nome`\*: Nome do cliente (deve conter apenas letras).
- `email`\*: Endereço de e-mail válido (não pode já haver o mesmo e-mail de cliente cadastrado).
- `telephone`\*: Número de telefone (apenas números).
- `cep`\*: CEP válido com no máximo 8 caracteres (apenas números).
- `logradouro`\*: Logradouro (deve ser obrigatório).
- `complemento`\*: Complemento (não é obrigatório).
- `bairro`\*: Bairro (obrigatório).
- `cidade`\*: Cidade (obrigatória).
- `estado`\*: Estado (obrigatório e somente letras).

## Exemplo de Requisição

- Aqui está um exemplo de como fazer uma requisição para editar um cliente existente:

- **O usuário deve estar autenticado para poder fazer a alteração das informaçõesdo cliente**

  - Não precisa enviar o ID do usuário na rota pois o ID é validado pelo token do usuário logado

> PUT /customer/1
> Content-Type: application/json
>
> headers: {
> 'Authorization': `Bearer ${token}`
> };
>
>{
>"name": "teste maria",
> "email": "teste4@email.com",
> "cep": "47862612",
>"cpf":"12345600080",
>"telephone":"1268972",
>"logradouro":"bem ali",
>"complemento":"na casa",
>"bairro": "qualquer",
>"cidade":"qualqueruma",
>"estado":"feliz"
>}

**Respostas:**

Sucesso (Status 200):

- Se todas as validações forem bem-sucedidas, o usuário será atualizado e a API retornará uma mensagem de sucesso:

> {"message": "cliente atualizado com sucesso!"}

**Erros Possíveis:**

- A API retornará mensagens de erro específicas para cada validação não atendida. Aqui estão alguns exemplos:

Status 400 (Bad Request) - Nenhum dado foi alterado:

> {"message": "Ao menos um campo deve ser alterado."}

Status 400 (Bad Request) - Validação de Nome:

> {"message": "Nome deve conter apenas letras e espaços."}

Status 400 (Bad Request) - Validação de E-mail:

> {"message": "Endereço de e-mail inválido."}

Status 400 (Bad Request) - E-mail já registrado:

> {"message": "Email já está registrado."}

Status 400 (Bad Request) - Validação de CPF:

> {"message": "CPF inválido. Deve conter exatamente 11 dígitos."}

Status 400 (Bad Request) - Validação de Telefone:

> {"message": "O campo telefone deve conter apenas números."}

---

## Autor:

**_Equipe Garotos de Progarama_**
email: nossoemail@email.com

**Sinta-se à vontade para entrar em contato conosco caso tenha alguma dúvida ou problema!**
