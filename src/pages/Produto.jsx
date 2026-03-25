import React, { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { Pencil, Trash2, ChevronUp, ChevronDown, PackageSearch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Produto() {
  const { produtos, grupos, deleteProduto, loading } = useApp();
  const [busca, setBusca] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'nome', direction: 'asc' });
  const navigate = useNavigate();

  const getNomeGrupo = (idGrupo) => {
    const grupo = grupos.find(g => g.id === Number(idGrupo));
    return grupo ? grupo.nome : 'Sem Grupo';
  };

  const produtosFiltrados = useMemo(() => {
    if (!Array.isArray(produtos)) return [];
    
    let result = produtos.map(p => ({
      ...p,
      nomeGrupo: getNomeGrupo(p.idGrupo)
    })).filter(p => 
      p.nome?.toLowerCase().includes(busca.toLowerCase()) || 
      p.nomeGrupo?.toLowerCase().includes(busca.toLowerCase())
    );

    if (sortConfig.key) {
      result.sort((a, b) => {
        const key = sortConfig.key === 'grupo' ? 'nomeGrupo' : sortConfig.key;
        const valA = a[key] ?? '';
        const valB = b[key] ?? '';
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [produtos, grupos, busca, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (loading) return <div className="mt-24 text-center font-bold text-blue-600 animate-pulse">Carregando produtos...</div>;

  return (
    // mt-32 md:mt-24: Dá mais espaço no topo para o Header empilhado no mobile
    <main className="mt-32 md:mt-24 container mx-auto p-4 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          <PackageSearch className="text-blue-600" /> Produtos Cadastrados
        </h2>
        <input 
          type="text" 
          placeholder="Filtrar por nome ou grupo..." 
          className="border p-3 rounded-xl w-full md:w-80 shadow-inner focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              {/* Coluna Nome - Principal (sempre visível) */}
              <th className="p-4 cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSort('nome')}>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Nome
                  {sortConfig.key === 'nome' && (sortConfig.direction === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
                </div>
              </th>

              {/* Coluna Grupo - md:table-cell (oculta no mobile) */}
              <th className="p-4 cursor-pointer hover:bg-gray-100 transition hidden md:table-cell" onClick={() => handleSort('grupo')}>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Grupo
                  {sortConfig.key === 'grupo' && (sortConfig.direction === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
                </div>
              </th>

              {/* Coluna Preço - Ajuste md:table-cell para ocultar o th no mobile */}
              <th className="p-4 cursor-pointer hover:bg-gray-100 transition hidden md:table-cell" onClick={() => handleSort('precoVenda')}>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Preço
                  {sortConfig.key === 'precoVenda' && (sortConfig.direction === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
                </div>
              </th>

              {/* Coluna Estoque - md:table-cell (oculta no mobile) */}
              <th className="p-4 cursor-pointer hover:bg-gray-100 transition hidden md:table-cell" onClick={() => handleSort('quantidadeEstoque')}>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Estoque
                  {sortConfig.key === 'quantidadeEstoque' && (sortConfig.direction === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
                </div>
              </th>
              
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map(prod => {
                let statusClasses = "bg-green-100 text-green-700";
                if (prod.quantidadeEstoque <= 5) statusClasses = "bg-red-100 text-red-700";
                else if (prod.quantidadeEstoque <= 10) statusClasses = "bg-amber-100 text-amber-700";

                return (
                  <tr key={prod.id} className="border-b hover:bg-slate-50 transition">
                    
                    {/* Coluna Nome + Preço no Mobile */}
                    <td className="p-4 font-medium text-gray-800">
                      <div className="flex flex-col">
                        <span>{prod.nome}</span>
                        {/* Preço aparece aqui no mobile, oculto no desktop */}
                        <span className="text-sm font-bold text-blue-600 md:hidden mt-1">
                          R$ {prod.precoVenda?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </td>

                    {/* Coluna Grupo - Oculta no Mobile */}
                    <td className="p-4 text-gray-600 hidden md:table-cell">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold border border-gray-200">
                        {prod.nomeGrupo}
                      </span>
                    </td>

                    {/* Coluna Preço - Oculta no Mobile */}
                    <td className="p-4 font-bold text-blue-600 hidden md:table-cell">
                      R$ {prod.precoVenda?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Coluna Estoque - Oculta no Mobile */}
                    <td className="p-4 hidden md:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusClasses}`}>
                        {prod.quantidadeEstoque} un.
                      </span>
                    </td>

                    {/* Coluna Ações - Sempre visível */}
                    <td className="p-4 flex justify-center gap-4">
                      <button onClick={() => navigate('/cadastro', { state: { item: prod } })} className="text-blue-500 hover:scale-110 transition-all">
                        <Pencil size={18}/>
                      </button>
                      <button onClick={() => deleteProduto(prod.id)} className="text-red-500 hover:scale-110 transition-all">
                        <Trash2 size={18}/>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-400 font-medium">Nenhum produto encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}