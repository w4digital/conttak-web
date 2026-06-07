## Visão Geral

Este projeto é um sistema de gestão financeira pessoal com foco em clareza, simplicidade e evolução incremental.

O sistema inicialmente será utilizado pelo próprio desenvolvedor como ferramenta diária de controle financeiro, servindo também como ambiente real de aprendizado, validação de arquitetura e evolução contínua do produto.

A proposta não é criar apenas um “app de finanças comum”, mas uma plataforma que combine:

- Clareza temporal do dinheiro;
- Organização simples e objetiva;
- Evolução gradual sem overengineering;
- Arquitetura escalável;
- Boa experiência de uso;
- Possibilidade futura de multiusuário e SaaS.

---

# Objetivos do Projeto

## Objetivos iniciais (MVP)

- Registrar receitas e despesas;
- Organizar transações por contas;
- Visualizar saldo consolidado;
- Acompanhar movimentação temporal;
- Criar categorização simples;
- Permitir uso diário rápido;
- Minimizar fricção no lançamento financeiro.

## Objetivos futuros

- Open Finance;
- Automação financeira;
- Importação bancária;
- IA para insights financeiros;
- Metas financeiras;
- Planejamento financeiro;
- Multiusuário;
- Multiempresa;
- Mobile;
- Sistema SaaS.

---

# Filosofia do Produto

## 1. Clareza acima de complexidade

Toda funcionalidade deve priorizar:

- entendimento rápido;
- leitura simples;
- fluxo intuitivo;
- baixa carga cognitiva.

Evitar dashboards excessivamente complexos.

---

## 2. Evolução incremental

O sistema será desenvolvido em camadas:

1. MVP funcional;
2. Estruturação arquitetural;
3. Automações;
4. Inteligência financeira;
5. Escalabilidade SaaS.

Não implementar complexidade antes da necessidade real.

---

## 3. Dados financeiros são históricos

Toda modelagem deve considerar:

- rastreabilidade;
- auditoria;
- imutabilidade lógica;
- histórico confiável.

Evitar deleções destrutivas.

Preferir:

- soft delete;
- versionamento;
- eventos;
- logs.

---

# Stack Oficial do Projeto

## Stack obrigatória inicial

O projeto deve utilizar obrigatoriamente as seguintes tecnologias:

### Frontend

- Next.js;
- React;
- TypeScript;
- TailwindCSS;
- Shadcn/UI

### Backend Inicial

- Next.js API Routes ou Server Actions;
- TypeScript.

### Banco de Dados

- PostgreSQL.

### ORM

- Prisma ORM.

### Autenticação

- JWT;
- Auth.js ou implementação própria.

### Infraestrutura inicial

- Vercel para frontend;
- Banco PostgreSQL gerenciado.

---

## Stack futura aprovada

As seguintes tecnologias podem ser adicionadas futuramente:

- NestJS;
- Java + Spring Boot;
- Redis;
- filas;
- WebSockets;
- event-driven;
- IA;
- automações;
- realtime.

---

## Restrições técnicas

Evitar introduzir novas stacks sem necessidade clara.

Toda nova dependência deve responder:

- Qual problema resolve?
- O custo operacional compensa?
- Existe solução mais simples?
- A complexidade adicional vale a pena?

---

## Padronização obrigatória

Evitar múltiplas bibliotecas para o mesmo propósito.

Exemplos:

- apenas um ORM;
- apenas uma estratégia principal de estado;
- apenas um padrão de estilização;
- evitar mistura desnecessária de arquiteturas.

---

# Diretrizes Arquiteturais

## Estrutura modular

Separar responsabilidades por domínio:

- auth;
- accounts;
- transactions;
- categories;
- reports;
- goals;
- automation.

---

## Regras importantes

### Não acoplar UI à regra de negócio

Toda regra importante deve ficar:

- em services;
- use cases;
- domain layer.

---

### Evitar lógica financeira espalhada

Cálculos financeiros devem ser centralizados.

Exemplos:

- saldo;
- projeções;
- consolidações;
- recorrências.

---

### Datas são críticas

Todo desenvolvimento deve considerar:

- timezone;
- recorrência;
- fechamento mensal;
- consistência temporal.

---

# Conceitos do Sistema

## Conta

Conta representa uma origem financeira.

Exemplos:

- carteira;
- banco;
- conta digital;
- cartão;
- investimento.

A conta funciona como:

- agrupador;
- visualização;
- origem das transações.

---

## Transação

Toda movimentação financeira.

Tipos:

- receita;
- despesa;
- transferência.

Toda transação deve possuir:

- valor;
- data;
- categoria;
- conta;
- descrição opcional.

---

## Categoria

Usada para organização e análise.

Inicialmente simples.

Evitar:

- excesso de categorias;
- hierarquia complexa prematura.

---

# UX e Experiência

## Regras de UX

- lançamento rápido;
- poucos cliques;
- visão clara do mês;
- foco em mobile-first;
- feedback visual imediato.

---

## Princípio de interface

O sistema deve transmitir:

- controle;
- clareza;
- leveza;
- previsibilidade.

Não parecer um ERP complexo.

---

# Segurança

## Regras obrigatórias

- validação server-side;
- autenticação segura;
- proteção contra vazamento de dados;
- logs críticos;
- criptografia quando necessário.

---

# Qualidade de Código

## Padrões

- Clean Code;
- SOLID;
- modularização;
- tipagem forte;
- nomenclatura consistente.

---

## Evitar

- overengineering;
- abstrações desnecessárias;
- dependências excessivas;
- acoplamento prematuro.

---

# Estratégia Técnica

## MVP primeiro

Antes de otimizar:

1. validar uso real;
2. validar fluxo;
3. validar retenção;
4. validar utilidade.

---

## Crescimento guiado por necessidade

Adicionar:

- microserviços;
- filas;
- cache;
- event sourcing;
- IA;
- realtime;

somente quando houver necessidade concreta.

---

# Futuras Integrações

## Possíveis integrações

- bancos;
- Open Finance;
- WhatsApp;
- Telegram;
- IA;
- importadores OFX/CSV;
- notificações.

---

# Missão do Projeto

Criar um sistema financeiro que ajude pessoas a entenderem o próprio dinheiro com clareza, simplicidade e inteligência, começando por uma solução pessoal real e evoluindo gradualmente para uma plataforma robusta e escalável.
