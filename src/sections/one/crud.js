import axios from 'src/utils/axios';

export function getCarros(queries) {
  const response = axios.get('/api/Carros/search', { params: queries });
  return response;
}

export function fazerPedidoRequest(carroid, userid) {
  const response = axios({
    method: 'put',
    url: '/api/Carros/fazerPedido',
    data: { user: userid, idCarro: carroid },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export function deleteCarros(user) {
  const response = axios.delete('/api/Carros/delete', { params: { Id: user } });
  return response;
}

export function createCarros(user) {
  const response = axios({
    method: 'post',
    url: '/api/Carros/save',
    data: user,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export function getCarroByIDs(userID) {
  const response = axios.get('/api/Carros/getById', { params: { Id: userID } });
  return response;
}

export function editCarros(carro, ID) {
  const response = axios({
    method: 'put',
    url: '/api/Carros/edit',
    data: {
      Nome: carro.nome,
      Id: ID,
      Ano: carro.ano,
      Quantidade: carro.quantidade,
      Marca: carro.marca,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}
