import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importação do Provider (Contexto)
import { AppProvider } from './contexts/AppContext';

// Importação de Componentes Fixos
import Header from './components/Header';

// Importação das Páginas
import Produtos from './pages/Produto';
import Faturamento from './pages/Faturamento';
import FormCadastro from './pages/FormCadastro';

function App() {
  return (
    // 1. O AppProvider envolve tudo para que todas as rotas acessem os dados da API
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          
          {/* 2. Header fixo em todas as telas */}
          <Header />

          {/* 3. Container de Notificações (Toast) */}
          <ToastContainer position="bottom-right" autoClose={3000} />

          {/* 4. Definição das Rotas do Desafio */}
          <div className="pt-4"> 
            <Routes>
              {/* Tela Inicial: Listagem de Produtos */}
              <Route path="/" element={<Produtos />} />
              
              {/* Tela de Faturamento (Vendas) */}
              <Route path="/faturamento" element={<Faturamento />} />
              
              {/* Tela de Cadastro (usada para Criar e para Editar) */}
              <Route path="/cadastro" element={<FormCadastro />} />
            </Routes>
          </div>

        </div>
      </Router>
    </AppProvider>
  );
}

export default App;