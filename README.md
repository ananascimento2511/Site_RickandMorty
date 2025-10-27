# 💫 Rick & Morty Characters — API Cards

Uma aplicação web que consome a **Rick and Morty API** em tempo real para exibir personagens em um layout moderno e responsivo.  

---

## 🚀 Funcionalidades

✅ **Busca dinâmica** por nome de personagem  
✅ **Filtro por status** (Alive, Dead, Unknown ou Favoritos)  
✅ **Paginação automática** para navegar entre páginas de resultados  
✅ **Favoritos salvos no Local Storage** ❤️  
✅ **Design responsivo e moderno** com efeitos em CSS  
✅ **Consumo de API em tempo real** via `fetch`  
✅ **Criação dinâmica de elementos DOM** via JavaScript

---

## 🧠 Conceitos Utilizados

- **API (Application Programming Interface):**  
  O projeto faz requisições HTTP à [Rick and Morty API](https://rickandmortyapi.com/) para obter dados atualizados dos personagens.

- **Consumo de dados em tempo real:**  
  Utilizando `fetch()`, os dados são carregados diretamente da API e exibidos sem necessidade de recarregar a página.

- **Manipulação do DOM:**  
  Através de JavaScript, elementos HTML (cards) são criados dinamicamente conforme os dados recebidos da API.

- **Armazenamento local:**  
  Os favoritos são salvos no `localStorage`, permitindo que o usuário mantenha seus personagens preferidos mesmo após fechar o navegador.

---

## 🧩 Estrutura do Projeto

📁 projeto-rick-and-morty/  
├── index.html   
├── css/  
│ └── styles.css   
├── js/  
│ └── script.js   

---

## 🖥️ Tecnologias Utilizadas

| Tecnologia | Função |
|-------------|--------|
| **HTML5** | Estrutura e acessibilidade da página |
| **CSS3** | Estilo visual, variáveis e layout responsivo |
| **JavaScript (ES6+)** | Consumo da API e criação dinâmica de conteúdo |
| **Rick and Morty API** | Fonte de dados externa em tempo real |

---

## 🎮 Como Usar

1. Clone este repositório:
   ```bash
   git clone https://github.com/ananascimento2511/rickandmorty-cards.git
Abra o arquivo index.html no navegador.

Use o campo de busca e o filtro de status para explorar os personagens.

Clique no coração ❤️ para adicionar aos favoritos.

💬 Créditos  
API: Rick and Morty API

Desenvolvimento: Ana Luiza Santos do Nascimento — RA: 77929
