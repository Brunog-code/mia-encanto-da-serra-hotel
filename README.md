# 🏨 Mia Encanto da Serra HOTEL - Sistema de Reservas e Pagamento online

Sistema completo de um hotel fictício, desenvolvido com React, TypeScript e Node.js. O projeto oferece autenticação de usuários, CRUD de reservas e um fluxo de pagamento totalmente integrado e automatizado via API do Mercado Pago, utilizando o Checkout Pro para garantir transações seguras, confiáveis e em tempo real, com confirmação instantânea de reservas após o pagamento, suportado por webhooks que notificam o sistema automaticamente sobre o status de cada transação.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando uma stack full-stack em JavaScript/TypeScript.

| Área | Tecnologia | Badge |
| :--- | :--- | :--- |
| **Frontend** | React & TypeScript | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |
| **Frontend** | HTML & CSS | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) |
| **Estilização** | Tailwind CSS | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Backend** | Node.js | ![Node.js](https://img.shields.io/badge/Node.js-%2343853D.svg?style=flat-square&logo=node.js&logoColor=white) |
| **Banco de Dados** | PostgreSQL | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white) |
| **ORM** | Prisma ORM | ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white) |

---

### 🛠️ Ferramentas e Infraestrutura

- **Editor de Código**: Visual Studio Code
- **Controle de Versão**: Git & GitHub
- **Hospedagem Frontend**: Vercel
- **Hospedagem Backend**: Render

---

## ✨ Funcionalidades em Destaque

O projeto foi construído focado em oferecer um sistema de reservas escalável e seguro.

### 💳 Sistema de Pagamento e Webhooks

O sistema de pagamento utiliza a API do **Mercado Pago** no modelo **Checkout Pro** para segurança e confiabilidade:

* **Pagamento Integrado:** Redirecionamento seguro para a página de Checkout Pro após a criação da reserva.
* **Webhooks de Confirmação:** Utilização de um endpoint de *Webhook* que recebe notificações do Mercado Pago para confirmar o pagamento em tempo real. **A reserva é confirmada no banco de dados e o quarto é marcado como ocupado somente após a confirmação do pagamento.**

### ⚙️ Gestão de Reservas Automatizada

* **Validação de Disponibilidade:** O sistema verifica em tempo real a quantidade de quartos disponíveis para as datas e categorias solicitadas, impedindo overbooking.
* **Cancelamento Automático (CronJob):** Um **CronJob** (tarefa agendada) é executado periodicamente para monitorar reservas. Se uma reserva for criada, mas o pagamento não for confirmado em **24 horas**, a reserva é automaticamente cancelada e o quarto é liberado para novos clientes.
* **CRUD de Reservas:** Funcionalidades completas para listar, visualizar, criar e gerenciar reservas.

### 🔐 Segurança e Usabilidade

* **Autenticação JWT:** Cadastro e login de usuários com tokens JWT para sessões seguras.
* **Recuperação de Senha por E-mail:** Implementação de um fluxo de recuperação de senha seguro, utilizando a biblioteca **SendGrid** para envio de tokens temporários por e-mail.
* **Validação de Dados:** Todas as entradas de formulário e dados da API são validadas estritamente utilizando a biblioteca **Zod**.
* **Layout Responsivo:** O frontend é totalmente responsivo para garantir a melhor experiência em dispositivos desktop e mobile.

---

## 📸 Visualização

**(Aqui você pode adicionar imagens ou GIFs da interface do sistema)**

---

## 🌐 Link do Projeto

Acesse o projeto através do link abaixo:

[🌐 **Mia Encanto da Serra - Hotel Fictício**](https://mia-encanto-da-serra-hotel.vercel.app/)
