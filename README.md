# 🏨 Mia Encanto da Serra HOTEL - Sistema de Reservas e Pagamento online

Sistema completo de um hotel fictício, desenvolvido com uma arquitetura moderna baseada em TypeScript e Node.js. O projeto conta com autenticação de usuários, CRUD de reservas e um fluxo de pagamento robusto e automatizado via Mercado Pago.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando uma stack full-stack em JavaScript/TypeScript.

| Área | Tecnologia | Badge |
| :--- | :--- | :--- |
| **Frontend** | TypeScript | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |
| **Frontend** | HTML & CSS | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) |
| **Estilização** | Tailwind CSS | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Backend** | Node.js | ![Node.js](https://img.shields.io/badge/Node.js-%2343853D.svg?style=flat-square&logo=node.js&logoColor=white) |
| **API** | Express | ![Express](https://img-shields.io/badge/Express-%23404d59.svg?style=flat-square&logo=express&logoColor=white) |
| **Banco de Dados** | PostgreSQL | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white) |
| **ORM** | Prisma ORM | ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white) |

---

### 🛠️ Ferramentas e Infraestrutura

- **Editor de Código**: Visual Studio Code
- **Controle de Versão**: Git & GitHub
- **Hospedagem Frontend**: Vercel (Utilizando o Root Directory `apps/client`)
- **Hospedagem Backend**: Render (Utilizando o Root Directory `apps/server`)
- **Validação**: Zod (para validação de schemas)

---

## ✨ Funcionalidades em Destaque

O projeto foi construído focado em oferecer um sistema de reservas escalável e seguro.

### 💳 Sistema de Pagamento e Webhooks (Ponto Alto)

O sistema de pagamento é o core do projeto e utiliza a API do **Mercado Pago** no modelo **Checkout Pro** para segurança e confiabilidade:

* **Pagamento Integrado:** Redirecionamento seguro para a página de Checkout Pro após a criação da reserva.
* **Webhooks de Confirmação:** Utilização de um endpoint de *Webhook* que recebe notificações do Mercado Pago para confirmar o pagamento em tempo real. **A reserva é confirmada no banco de dados e o quarto é marcado como ocupado somente após a confirmação do pagamento.**

### ⚙️ Gestão de Reservas Automatizada

* **Validação de Disponibilidade:** O sistema verifica em tempo real a quantidade de quartos disponíveis para as datas e categorias solicitadas, impedindo overbooking.
* **Cancelamento Automático (CronJob):** Um **CronJob** (tarefa agendada) é executado periodicamente para monitorar reservas. Se uma reserva for criada, mas o pagamento não for confirmado em **24 horas**, a reserva é automaticamente cancelada e o quarto é liberado para novos clientes.
* **CRUD de Reservas:** Funcionalidades completas para listar, visualizar, criar e gerenciar reservas.

### 🔐 Segurança e Usabilidade

* **Autenticação JWT:** Cadastro e login de usuários com tokens JWT para sessões seguras.
* **Recuperação de Senha por E-mail:** Implementação de um fluxo de recuperação de senha seguro, utilizando a biblioteca **Nodemailer** para envio de tokens temporários por e-mail.
* **Validação de Dados:** Todas as entradas de formulário e dados da API são validadas estritamente utilizando a biblioteca **Zod**.
* **Layout Responsivo:** O frontend é totalmente responsivo para garantir a melhor experiência em dispositivos desktop e mobile.

---

## 📸 Visualização

**

---

## 🌐 Link do Projeto

Acesse e teste o sistema de reservas e pagamento em produção:

[🌐 **Mia Encanto da Serra - Hotel Fictício**](https://mia-encanto-da-serra-hotel.vercel.app/)

