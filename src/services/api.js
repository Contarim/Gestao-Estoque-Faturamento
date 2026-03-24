import axios from 'axios';

// Criamos uma instância do Axios com a URL base do desafio
const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Sifat-devs/db-desafio-frontend',
  headers: {
    'Content-Type': 'application/json',
  }
});

/* Dica de Júnior: Centralizar a API aqui permite que, se a URL mudar no futuro, 
  você só precise alterar em um único lugar!
*/

export default api;