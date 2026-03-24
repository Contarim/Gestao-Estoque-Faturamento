import React, { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { ChevronUp, ChevronDown, Receipt } from 'lucide-react';

export default function Faturamento() {
  const { vendas, loading } = useApp();
  const [busca, setBusca] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'idPedido', direction: 'desc' });

  // Filtro por ID do Pedido (idPedido)
  const vendasFiltradas = useMemo(() => {
    if (!vendas || !Array.isArray(vendas)) return [];

    let result = vendas.filter(v => {
      if (!busca.trim()) return true;
      
      // Ajustado para idPedido conforme sua estrutura de API
      const idStr = v?.idPedido?.toString() || "";
      return idStr.includes(busca);
    });

    if (sortConfig.key) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key] ?? '';
        const valB = b[sortConfig.key] ?? '';
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [vendas, busca, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (loading) return <div className="mt-24 text-center animate-pulse text-blue-600 font-bold">Carregando faturamento...</div>;

  return (
    <main className="mt-24 container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          <Receipt className="text-blue-600" /> Histórico de Vendas
        </h2>
        <input 
          type="text" 
          placeholder="Buscar pelo número do pedido..." 
          className="border p-2 rounded-lg w-full md:w-80 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              {[
                { label: 'Cód. Pedido', key: 'idPedido' },
                { label: 'Data', key: 'data' },
                { label: 'Total Itens', key: 'totalItensPedido' },
                { label: 'Valor Total', key: 'valorTotalPedido' }
              ].map((column) => (
                <th 
                  key={column.key} 
                  className="p-4 cursor-pointer hover:bg-gray-100 transition" 
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-500 uppercase">
                    {column.label}
                    {sortConfig.key === column.key && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vendasFiltradas.length > 0 ? (
              vendasFiltradas.map(venda => (
                <tr key={venda.idPedido} className="border-b hover:bg-blue-50/50 transition">
                  <td className="p-4 font-medium text-blue-600">#{venda.idPedido}</td>
                  <td className="p-4 text-gray-600">
                    {venda.data ? new Date(venda.data).toLocaleDateString('pt-BR') : '---'}
                  </td>
                  <td className="p-4 text-gray-500 text-center md:text-left">
                    {venda.totalItensPedido} itens
                  </td>
                  <td className="p-4 font-bold text-green-600">
                    R$ {venda.valorTotalPedido?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-400">
                  Nenhuma venda encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}