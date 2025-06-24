import axios from 'src/utils/axios';

export function getLembretes(queries) {
  const response = axios.get('/api/Lembretes/search', { params: queries });
  return response;
}

export function fazerPedidoRequest(lembreteid, userid) {
  const response = axios({
    method: 'put',
    url: '/api/Lembretes/fazerPedido',
    data: { user: userid, idLembrete: lembreteid },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export function deleteLembretes(user) {
  const response = axios.delete('/api/Lembretes/delete', { params: { Id: user } });
  return response;
}

export function createLembretes(user) {
  const response = axios({
    method: 'post',
    url: '/api/Lembretes/save',
    data: user,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export function getLembreteByIDs(userID) {
  const response = axios.get('/api/Lembretes/getById', { params: { Id: userID } });
  return response;
}

export function editLembretes(lembrete, ID) {
  const response = axios({
    method: 'put',
    url: '/api/Lembretes/edit',
    data: {
      Nome: lembrete.nome,
      Id: ID,
      Ano: lembrete.ano,
      Quantidade: lembrete.quantidade,
      Marca: lembrete.marca,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}
