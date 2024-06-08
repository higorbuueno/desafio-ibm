# **_DESAFIO IBM_**

![Imagem do desafio](https://i.imgur.com/iqf0dMG.png)

O desafio consiste em criar uma aplicação web que simule
transações financeiras de um banco.

Essa aplicação contém os seguintes tópicos implementados:

- Cadastro de clientes com os campos: nome, idade, endereço de email e número da conta.
- Cadastro de Débito e Crédito na conta do cliente.
- Extrato em tela da conta do cliente com saldo total (no topo da página).

A aplicação está feita conforme abaixo:

- FrontEnd: **Angular**.
- BackEnd: **Java (springBoot)**.
- Banco de dados: **MySQL**.

---

## Como rodar o desafio?

Ambas aplicações, tanto FrontEnd quanto BackEnd estão rodando no mesmo docker-compose para facilitar o teste do desafio, então abaixo estão as instruções para conseguir subir as aplicações.

Será necessário que contenhas instalado os softwares abaixo:

- **Docker**

Clone o repositório:

```bash
git clone https://github.com/higorbuueno/desafio-ibm.git
```

Entre na pasta do repositório clonado e rode o container docker:

```bash
docker compose up
```

Pronto!
Agora só acessar aplicação clicando **[aqui](http://localhost:4200/customers)** (http://localhost:4200/customers).