# 🏨 Mia Encanto da Serra HOTEL - Sistema de Reservas e Pagamento online

👉 **[Acesse o projeto aqui](https://mia-encanto-da-serra-hotel.vercel.app/)**

Sistema completo de um hotel fictício, desenvolvido com **React**, **TypeScript** e **Node.js**.  
O projeto oferece autenticação de usuários, CRUD de reservas e um fluxo de pagamento totalmente integrado e automatizado via API do **Mercado Pago**, utilizando o **Checkout Pro** para garantir transações seguras, confiáveis e em tempo real, com confirmação instantânea de reservas após o pagamento — suportado por **webhooks** que notificam o sistema automaticamente sobre o status de cada transação.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando uma stack full-stack em **JavaScript/TypeScript**, com foco em escalabilidade e boas práticas de arquitetura.

### 🖥️ Frontend

| Tecnologia       | Badge                                                                                                                        |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **React**        | ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)                             |
| **TypeScript**   | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)              |
| **Tailwind CSS** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white) |

### ⚙️ Backend

| Tecnologia     | Badge                                                                                                                  |
| :------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **Node.js**    | ![Node.js](https://img.shields.io/badge/Node.js-%2343853D.svg?style=flat-square&logo=node.js&logoColor=white)          |
| **TypeScript** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)        |
| **PostgreSQL** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white) |
| **Prisma ORM** | ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white)                    |

---

### 🛠️ Ferramentas e Infraestrutura

- **Editor de Código:** Visual Studio Code
- **Controle de Versão:** Git & GitHub
- **Hospedagem Frontend:** Vercel
- **Hospedagem Backend:** Render

---

## ✨ Funcionalidades em Destaque

O projeto foi construído focado em oferecer um sistema de reservas escalável, seguro e automatizado.

### 💳 Sistema de Pagamento e Webhooks

O sistema de pagamento utiliza a API do **Mercado Pago** no modelo **Checkout Pro** para segurança e confiabilidade:

- **Pagamento Integrado:** Redirecionamento seguro para a página de Checkout Pro após a criação da reserva.
- **Webhooks de Confirmação:** Endpoint configurado para receber notificações do Mercado Pago, confirmando o pagamento em tempo real.
- **Confirmação Automática:** A reserva é confirmada no banco de dados e o quarto é marcado como ocupado **somente após a confirmação do pagamento**.

> ⚠️ **Nota importante (versão de produção):**  
> Como este é um **projeto acadêmico**, em produção o **Checkout Pro foi desativado**.  
> No ambiente online, foi implementado um **endpoint simulando a confirmação de pagamento** para fins de demonstração, de modo que o fluxo completo possa ser testado sem necessidade de transações reais.  
> Há **imagens e vídeos** demonstrando o funcionamento real do pagamento automatizado via Mercado Pago em ambiente de desenvolvimento (sandbox).

---

### ⚙️ Gestão de Reservas Automatizada

- **Validação de Disponibilidade:** O sistema verifica em tempo real a quantidade de quartos disponíveis para as datas e categorias solicitadas, impedindo overbooking.
- **Cancelamento Automático (CronJob):** Uma tarefa agendada monitora as reservas. Caso uma reserva seja criada mas não tenha o pagamento confirmado em até **24 horas**, ela é automaticamente cancelada e o quarto é liberado.
- **CRUD Completo:** O sistema permite listar, visualizar, criar e gerenciar reservas de forma intuitiva e responsiva.

---

### 🔐 Segurança e Usabilidade

- **Autenticação JWT:** Login e cadastro de usuários com tokens JWT para sessões seguras.
- **Recuperação de Senha por E-mail:** Fluxo de recuperação de senha utilizando **SendGrid**, com envio de tokens temporários para redefinição.
- **Validação com Zod:** Toda entrada de dados é validada utilizando **Zod**, garantindo integridade e segurança.
- **Layout Responsivo:** Interface otimizada para **desktop e mobile**, utilizando **Tailwind CSS**.

---

## 📸 Visualização

### Seção Hero

![Hero](https://hwrvkyieyvjmzncivmmt.supabase.co/storage/v1/object/public/images-hotel/prints-github/hero.PNG)

### Seção quartos

![Quartos](https://hwrvkyieyvjmzncivmmt.supabase.co/storage/v1/object/public/images-hotel/prints-github/room-section.PNG)

### Confirmar reserva

![confirmar reserva](https://hwrvkyieyvjmzncivmmt.supabase.co/storage/v1/object/public/images-hotel/prints-github/confirm-reservation.PNG)

### Checkout Pro - Mercado pago

![checkoutPro](https://hwrvkyieyvjmzncivmmt.supabase.co/storage/v1/object/public/images-hotel/prints-github/checkout-pro.PNG)

### Pagamento confirmado

![pagamento confirmado](https://hwrvkyieyvjmzncivmmt.supabase.co/storage/v1/object/public/images-hotel/prints-github/reserva-e-pagamento-aprovado.PNG)

### Email - confirmação reserva

![email confirmação](https://hwrvkyieyvjmzncivmmt.supabase.co/storage/v1/object/public/images-hotel/prints-github/email-reserva-confirmada.PNG)

### Minhas reservas

![minhas reservas](https://hwrvkyieyvjmzncivmmt.supabase.co/storage/v1/object/public/images-hotel/prints-github/reserva-confirmada.PNG)

### Minhas reservas - Botão pagar - Caso de pagamento pendente

![minhas reservas - pagamento pendente](https://hwrvkyieyvjmzncivmmt.supabase.co/storage/v1/object/public/images-hotel/prints-github/btn-pgto-pendente.PNG)

---

## 📽️ Demonstração do Pagamento (Ambiente de Desenvolvimento)

Abaixo, um vídeo demonstrando o funcionamento do **Checkout Pro com Mercado Pago**, a confirmação automática via **Webhook** e o envio de **redefinição de senha** para o e-mail do usuário cadastrado.

> ⚠️ O vídeo do youtube será aberto na mesma janela; caso queira, você pode abrir em nova aba/janela pelo navegador.

[![Assista o vídeo](https://img.youtube.com/vi/JsoISZGQEOM/hqdefault.jpg)](https://www.youtube.com/watch?v=JsoISZGQEOM)

---

## 🧠 Contexto Acadêmico

Este projeto foi desenvolvido com fins **educacionais**, simulando o funcionamento de um sistema real de reservas e pagamentos online.  
O foco principal foi o **aprendizado de integração entre frontend, backend, banco de dados e API de pagamento (Mercado Pago)**, aplicando boas práticas de **segurança, escalabilidade**. Todas as imagens foram geradas por IA.

---
