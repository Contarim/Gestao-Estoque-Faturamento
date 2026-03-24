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

  // Carrega os dados caso seja uma edição
  useEffect(() => {
    if (state?.item) {
      setFormData({
        nome: state.item.nome || '',
        idGrupo: state.item.idGrupo?.toString() || '', // Converter para string para o <select>
        precoVenda: state.item.precoVenda || '',
        quantidadeEstoque: state.item.quantidadeEstoque || ''
      });
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErros = {};
    
    // Validação simples
    if (!formData.nome.trim()) tempErros.nome = true;
    if (!formData.idGrupo) tempErros.idGrupo = true;
    if (!formData.precoVenda) tempErros.precoVenda = true;

    if (Object.keys(tempErros).length > 0) {
      setErros(tempErros);
      toast.error("Por favor, preencha os campos obrigatórios!");
      return;
    }

    // Montagem do objeto seguindo a estrutura exata da API (camelCase)
    const payload = {
      nome: formData.nome,
      idGrupo: parseInt(formData.idGrupo),
      precoVenda: parseFloat(formData.precoVenda),
      quantidadeEstoque: parseInt(formData.quantidadeEstoque) || 0
    };

    const sucesso = state?.item 
      ? await updateProduto(state.item.id, payload)
      : await addProduto(payload);

    if (sucesso) {
      navigate('/');
    }
  };

  // Função para atualizar campo e remover o erro visual simultaneamente
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (erros[field]) {
      setErros({ ...erros, [field]: false });
    }
  };

  return (
    <main className="mt-24 container mx-auto p-4 max-w-xl">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition font-medium"
      >
        <ArrowLeft size={20} /> Voltar
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {state?.item ? 'Editar Produto' : 'Novo Produto'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo Nome */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Nome do Produto *</label>
            <input 
              type="text" 
              placeholder="Ex: Teclado Mecânico"
              className={`w-full p-3 border rounded-xl outline-none transition-all ${
                erros.nome ? 'border-red-500 bg-red-50' : 'focus:border-blue-500 border-gray-200'
              }`}
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
            />
          </div>

          {/* Campo Grupo */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Grupo/Categoria *</label>
            <select 
              className={`w-full p-3 border rounded-xl outline-none transition-all ${
                erros.idGrupo ? 'border-red-500 bg-red-50' : 'focus:border-blue-500 border-gray-200'
              }`}
              value={formData.idGrupo}
              onChange={(e) => handleChange('idGrupo', e.target.value)}
            >
              <option value="">Selecione um grupo</option>
              {grupos.map(g => (
                <option key={g.id} value={g.id}>{g.nome}</option>
              ))}
            </select>
          </div>

          {/* Grid Preço e Estoque */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Preço Venda (R$) *</label>
              <input 
                type="number" 
                step="0.01"
                placeholder="0.00"
                className={`w-full p-3 border rounded-xl outline-none transition-all ${
                  erros.precoVenda ? 'border-red-500 bg-red-50' : 'focus:border-blue-500 border-gray-200'
                }`}
                value={formData.precoVenda}
                onChange={(e) => handleChange('precoVenda', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Qtd. Estoque</label>
              <input 
                type="number" 
                placeholder="0"
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 transition-all"
                value={formData.quantidadeEstoque}
                onChange={(e) => handleChange('quantidadeEstoque', e.target.value)}
              />
            </div>
          </div>

          {/* Botão Salvar */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 mt-4"
          >
            <Save size={20} /> 
            {state?.item ? 'Atualizar Dados' : 'Salvar Produto'}
          </button>
        </form>
      </div>
    </main>
  );
}