import axios from 'src/utils/axios';

export function getReceituarios(queries) {
  return axios.get('/api/Receituario/search', { params: queries });
}

export function fazerDownloadRequest(receituarioid) {
  return axios({
    method: 'put',
    url: '/api/Receituario/download',
    data: { id: receituarioid },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function deleteReceituarios(id) {
  return axios.delete('/api/Receituario/delete', { params: { Id: id } });
}

export function createReceituarios(receituario) {
  return axios({
    method: 'post',
    url: '/api/Receituario/save',
    data: receituario,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function getReceituarioByIDs(receituarioID) {
  return axios.get('/api/Receituario/getById', { params: { Id: receituarioID } });
}

export function editReceituarios(receituario, ID) {
  return axios({
    method: 'put',
    url: '/api/Receituario/edit',
    data: {
      id: receituario.id,
      nomeMedico: receituario.nomeMedico,
      nomeArquivo: receituario.nomeArquivo,
      idPaciente: receituario.idPaciente,
      Id: ID,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
