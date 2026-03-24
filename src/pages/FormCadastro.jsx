import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Save, ArrowLeft } from 'lucide-react';

export default function FormCadastro() {
  const { grupos, addProduto, updateProduto } = useApp();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    idGrupo: '',
    precoVenda: '',
    quantidadeEstoque: ''
  });

  const [erros, setErros] = useState({});

  useEffect(() => {
    if (state?.item) {
      setFormData({
        nome: state.item.nome || '',
        idGrupo: state.item.idGrupo || '',
        precoVenda: state.item.precoVenda || '',
        quantidadeEstoque: state.item.quantidadeEstoque || ''
      });
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErros = {};
    if (!formData.nome) tempErros.nome = true;
    if (!formData.idGrupo) tempErros.idGrupo = true;
    if (!formData.precoVenda) tempErros.precoVenda = true;

    if (Object.keys(tempErros).length > 0) {
      setErros(tempErros);
      toast.error("Campos obrigatórios faltando!");
      return;
    }

    const payload = {
      ...formData,
      idGrupo: parseInt(formData.idGrupo),
      precoVenda: parseFloat(formData.precoVenda),
      quantidadeEstoque: parseInt(formData.quantidadeEstoque) || 0,
      // A API também espera o nome do grupo para exibição na tabela
      grupo: grupos.find(g => g.id === parseInt(formData.idGrupo))?.nome
    };

    const sucesso = state?.item 
      ? await updateProduto(state.item.id, payload)
      : await addProduto(payload);

    if (sucesso) navigate('/');
  };

  return (
    <main className="mt-24 container mx-auto p-4 max-w-xl">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition">
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {state?.item ? 'Editar Produto' : 'Novo Produto'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Nome do Produto *</label>
            <input 
              type="text" 
              className={`w-full p-3 border rounded-xl outline-none ${erros.nome ? 'border-red-500 bg-red-50' : 'focus:border-blue-500 border-gray-200'}`}
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Grupo/Categoria *</label>
            <select 
              className={`w-full p-3 border rounded-xl outline-none ${erros.idGrupo ? 'border-red-500 bg-red-50' : 'focus:border-blue-500 border-gray-200'}`}
              value={formData.idGrupo}
              onChange={(e) => setFormData({...formData, idGrupo: e.target.value})}
            >
              <option value="">Selecione um grupo</option>
              {grupos.map(g => <option key={g.id} value={g.id}>{g.nome}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Preço Venda (R$) *</label>
              <input 
                type="number" step="0.01"
                className={`w-full p-3 border rounded-xl outline-none ${erros.precoVenda ? 'border-red-500 bg-red-50' : 'focus:border-blue-500 border-gray-200'}`}
                value={formData.precoVenda}
                onChange={(e) => setFormData({...formData, precoVenda: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Qtd. Estoque</label>
              <input 
                type="number" 
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                value={formData.quantidadeEstoque}
                onChange={(e) => setFormData({...formData, quantidadeEstoque: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
            <Save size={20} /> Salvar Produto
          </button>
        </form>
      </div>
    </main>
  );
}