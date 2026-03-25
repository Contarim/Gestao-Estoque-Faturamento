import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Package } from 'lucide-react';

export default function Header() {
  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-white' : 'text-gray-300 hover:text-white'
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-900 shadow-lg text-gray-100">
      <div className="container mx-auto px-4">
        {/* Container flexível: coluna no mobile, linha no desktop */}
        <div className="flex flex-col md:flex-row md:items-center justify-between min-h-16 py-3 md:py-0 gap-3 md:gap-0">
          
          {/* Logo Clicável - Redireciona para a Home (Produtos) */}
          <Link 
            to="/" 
            className="flex items-center gap-2 justify-center md:justify-start hover:opacity-80 transition-opacity active:scale-95"
          >
            <Package className="text-blue-400" size={24} />
            <h1 className="text-xl font-extrabold tracking-tight">
              Gestão<span className="text-blue-400">Estoque</span>
            </h1>
          </Link>

          {/* Menu de Navegação - Centralizado no mobile, direita no desktop */}
          <nav className="flex items-center gap-6 justify-center md:justify-end">
            <NavLink to="/" className={linkClasses}>
              Produtos
            </NavLink>
            <NavLink to="/faturamento" className={linkClasses}>
              Faturamento
            </NavLink>
            <NavLink
              to="/cadastro"
              className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-blue-700 transition active:scale-95 shadow-md"
            >
              + Novo Produto
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}