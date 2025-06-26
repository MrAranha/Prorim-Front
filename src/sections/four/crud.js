import axios from 'src/utils/axios';

export function getLaudos(queries) {
  return axios.get('/api/Laudos/search', { params: queries });
}

export function fazerDownloadRequest(laudoid) {
  return axios({
    method: 'put',
    url: '/api/Laudos/download',
    data: { id: laudoid },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function deleteLaudos(id) {
  return axios.delete('/api/Laudos/delete', { params: { Id: id } });
}

export function createLaudos(laudo) {
  return axios({
    method: 'post',
    url: '/api/Laudos/save',
    data: laudo,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function getLaudoByIDs(laudoID) {
  return axios.get('/api/Laudos/getById', { params: { Id: laudoID } });
}

export function editLaudos(laudo, ID) {
  return axios({
    method: 'put',
    url: '/api/Laudos/edit',
    data: {
      id: laudo.id,
      nomeMedico: laudo.nomeMedico,
      nomeArquivo: laudo.nomeArquivo,
      idPaciente: laudo.idPaciente
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
