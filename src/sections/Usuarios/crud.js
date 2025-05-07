import axios from 'src/utils/axios';

export function getUsers(queries) {
  const response = axios.get('/api/Users/search', { params: queries });
  return response;
}

export function deleteUsers(user) {
  const response = axios.delete('/api/Users/delete', { params: { UserID: user } });
  return response;
}

export function createUsers(user) {
  const response = axios({
    method: 'post',
    url: '/api/Users/save',
    data: user,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export function getUserByIDs(userID) {
  const response = axios.get('/api/Users/getById', { params: { UserID: userID } });
  return response;
}

export function editUsers(user) {
  const response = axios({
    method: 'put',
    url: '/api/Users/edit',
    data: user,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export function changeUserPasswords(user) {
  const response = axios({
    method: 'put',
    url: '/api/Users/changePassword',
    data: user,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}
