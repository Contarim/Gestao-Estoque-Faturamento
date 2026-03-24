import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProd, resVendas, resGrupos] = await Promise.all([
        api.get('/produtos_cadastrados'),
        api.get('/vendas'),
        api.get('/grupos')
      ]);

      setProdutos(resProd.data || []);
      setVendas(resVendas.data || []);
      setGrupos(resGrupos.data || []);
      
      console.log("Vendas carregadas com sucesso:", resVendas.data);
    } catch (error) {
      console.error("Erro na busca inicial:", error);
      toast.error("Erro ao carregar dados da API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addProduto = async (produto) => {
    try {
      const res = await api.post('/produtos_cadastrados', produto);
      setProdutos(prev => [...prev, { ...produto, id: res.data.id || Date.now() }]);
      toast.success("Produto cadastrado com sucesso!");
      return true;
    } catch (error) {
      toast.error("Erro ao cadastrar produto");
      return false;
    }
  };

  const updateProduto = async (id, produto) => {
    try {
      await api.put(`/produtos_cadastrados/${id}`, produto);
      setProdutos(prev => prev.map(p => p.id === id ? { ...produto, id } : p));
      toast.success("Produto atualizado com sucesso!");
      return true;
    } catch (error) {
      toast.error("Erro ao atualizar produto");
      return false;
    }
  };

  const deleteProduto = async (id) => {
    try {
      await api.delete(`/produtos_cadastrados/${id}`);
      setProdutos(prev => prev.filter(p => p.id !== id));
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir produto");
    }
  };

  return (
    <AppContext.Provider value={{ 
      produtos, 
      vendas, 
      grupos, 
      loading, 
      addProduto, 
      updateProduto, 
      deleteProduto 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser usado dentro de um AppProvider");
  }
  return context;
};