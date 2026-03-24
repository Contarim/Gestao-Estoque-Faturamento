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
      // Enviamos para a API para simular o processo
      await api.post('/produtos_cadastrados', produto);
      
      // BUG FIX: Geramos um ID ÚNICO localmente. 
      // APIs simuladas repetem IDs, o que causa duplicação na ordenação (Sort).
      const novoId = Date.now() + Math.floor(Math.random() * 1000);
      const novoProduto = { ...produto, id: novoId };
      
      setProdutos(prev => [...prev, novoProduto]);
      toast.success("Produto cadastrado com sucesso!");
      return true;
    } catch (error) {
      // Fallback para manter a funcionalidade mesmo com erro de rede
      const idLocal = Date.now() + Math.floor(Math.random() * 1000);
      setProdutos(prev => [...prev, { ...produto, id: idLocal }]);
      toast.success("Produto cadastrado localmente!");
      return true;
    }
  };

  const updateProduto = async (id, produto) => {
    try {
      await api.put(`/produtos_cadastrados/${id}`, produto);
      setProdutos(prev => prev.map(p => p.id === id ? { ...produto, id } : p));
      toast.success("Produto atualizado com sucesso!");
      return true;
    } catch (error) {
      if (error.response?.status === 404) {
        setProdutos(prev => prev.map(p => p.id === id ? { ...produto, id } : p));
        toast.success("Produto atualizado com sucesso!");
        return true;
      }
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
      if (error.response?.status === 404) {
        setProdutos(prev => prev.filter(p => p.id !== id));
        toast.success("Produto excluído com sucesso!");
      } else {
        toast.error("Erro ao excluir produto");
      }
    }
  };

  return (
    <AppContext.Provider value={{ 
      produtos, vendas, grupos, loading, 
      addProduto, updateProduto, deleteProduto 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp deve ser usado dentro de um AppProvider");
  return context;
};