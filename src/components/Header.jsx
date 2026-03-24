import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-slate-800 text-white shadow-md z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-blue-400">GestãoEstoque</h1>
        <div className="space-x-6">
          <Link title="Produtos" to="/" className="hover:text-blue-300 transition">Produtos Cadastrados</Link>
          <Link title="Faturamento" to="/faturamento" className="hover:text-blue-300 transition">Faturamento</Link>
          <Link title="Cadastrar" to="/cadastro" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">Cadastrar Produto</Link>
        </div>
      </nav>
    </header>
  );
}