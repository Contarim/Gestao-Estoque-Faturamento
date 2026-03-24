# 📦 Sistema de Gestão de Estoque e Faturamento

Este projeto é uma **Single Page Application (SPA)** desenvolvida em **React** para um desafio técnico de Desenvolvedor Frontend Júnior. O sistema permite o gerenciamento completo de produtos e a visualização do histórico de vendas, integrando-se a uma API REST simulada.

---

## 🚀 Demonstração

* **Link do Deploy (Vercel):** [CLIQUE AQUI PARA ACESSAR](https://gestao-estoque-faturamento.vercel.app)
* **Repositório:** [https://github.com/Contarim/Gestao-Estoque-Faturamento](https://github.com/Contarim/Gestao-Estoque-Faturamento)

---

## 🛠️ Tecnologias e Ferramentas

* **React 18**: Framework base para construção da interface.
* **Tailwind CSS**: Estilização moderna, responsiva e utilitária.
* **React Router Dom**: Gerenciamento de rotas e navegação entre telas.
* **Axios**: Cliente HTTP para consumo da API REST.
* **Context API**: Gerenciamento de estado global (Produtos, Vendas e Grupos).
* **Lucide React**: Biblioteca de ícones leves e modernos.
* **React-Toastify**: Sistema de notificações para feedbacks de sucesso/erro.

---

## 📋 Funcionalidades Implementadas

### 1. Produtos Cadastrados
- Listagem dinâmica de produtos consumindo o endpoint `/produtos_cadastrados`.
- **Filtro em tempo real**: Busca por nome ou grupo.
- **Ordenação**: Clique nas colunas para ordenar (ASC/DESC).
- **Alerta de Estoque**: Cores dinâmicas para estoque crítico (≤ 5) e atenção (≤ 10).
- **CRUD**: Funções de Cadastro (POST), Edição (PUT) e Exclusão (DELETE).

### 2. Faturamento
- Exibição do histórico de vendas via `/vendas`.
- Busca específica por **Número do Pedido**.
- Formatação de moedas e datas no padrão brasileiro (pt-BR).

### 3. Cadastro e Edição
- Formulário inteligente que identifica se o usuário deseja cadastrar ou editar um item.
- Validação de campos obrigatórios com alerta visual (Toast).
- **Bug Fix**: Tratamento de IDs únicos (Timestamp) para evitar duplicação em APIs simuladas.

---

## ⚙️ Arquitetura do Projeto

A estrutura foi organizada seguindo boas práticas de separação de responsabilidades:
- `src/components`: Componentes reutilizáveis (Header, etc).
- `src/contexts`: Centralização da lógica de dados e estado global.
- `src/pages`: Telas principais da aplicação.
- `src/services`: Configuração da instância Axios (URL base da API).

---

## 🏁 Como Rodar Localmente

1. **Clone o repositório:**
    ```bash
    git clone [https://github.com/Contarim/Gestao-Estoque-Faturamento.git](https://github.com/Contarim/Gestao-Estoque-Faturamento.git)
    ```
2. **Acesse a pasta:**
    ```bash
    cd Gestao-Estoque-Faturamento
    ```
3. **Instale as dependências:**
    ```bash
    npm install
    ```
4. **Inicie o projeto:**
    ```bash
    npm start
    ```

---

## 💡 Observações sobre o Deploy (Vercel)

O projeto foi configurado para rodar na **Vercel** com suporte a rotas do React Router. Foi utilizado um arquivo `vercel.json` para realizar o redirecionamento automático das requisições para o `index.html`, evitando erros 404 ao atualizar a página (F5).

---
**Desenvolvido por João Contarim** 
*Conecte-se comigo no [LinkedIn](https://linkedin.com/in/contarim)*