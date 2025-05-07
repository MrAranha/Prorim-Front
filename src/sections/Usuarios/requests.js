import {
  changeUserPasswords,
  createUsers,
  deleteUsers,
  editUsers,
  getUserByIDs,
  getUsers,
} from './crud';

export const searchUsers = (queries, setLoading, setUsers, sendNotification) => {
  setLoading(true);
  getUsers(queries)
    .then((data) => {
      if (data.data) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
      setLoading(false);
    })
    .catch((error) => {
      sendNotification({ msg: error.title || error.slice(0, 700), variant: 'error' });
      setLoading(false);
    });
};

export const createUser = (user, setLoading, sendNotification, handleClose, setUsers) => {
  setLoading(true);
  createUsers(user)
    .then((data) => {
      getUsers({ id: data.data }).then((data) => {
        if (data.data) {
          setUsers(data.data);
        } else {
          setUsers([]);
        }
        setLoading(false);
      });
      setLoading(false);
      handleClose();
    })
    .catch((error) => {
      sendNotification({ msg: error.title || error.slice(0, 700), variant: 'error' });
      setLoading(false);
    });
};

export const deleteUser = (user, setLoading, sendNotification, handleClose, setUsers) => {
  setLoading(true);
  deleteUsers(user)
    .then((data) => {
      getUsers().then((data) => {
        if (data.data) {
          setUsers(data.data);
        } else {
          setUsers([]);
        }
        setLoading(false);
      });
      setLoading(false);
      handleClose();
    })
    .catch((error) => {
      sendNotification({ msg: error.title || error.slice(0, 700), variant: 'error' });
      setLoading(false);
    });
};

export const editUser = (user, setLoading, sendNotification, handleClose, setUsers) => {
  setLoading(true);
  editUsers(user)
    .then((data) => {
      getUsers({ id: user.id }).then((data) => {
        if (data.data) {
          setUsers(data.data);
        } else {
          setUsers([]);
        }
        setLoading(false);
      });
      setLoading(false);
      handleClose();
    })
    .catch((error) => {
      sendNotification({ msg: error.title || error.slice(0, 700), variant: 'error' });
      setLoading(false);
    });
};

export const changeUserPassword = (user, sendNotification, handleClose) => {
  changeUserPasswords(user)
    .then((data) => {
      if (data) {
        sendNotification({ msg: 'Senha alterada com sucesso!', variant: 'success' });
      }
      handleClose();
    })
    .catch((error) => {
      console.log(error);
      sendNotification({ msg: error.title || error.slice(0, 700), variant: 'error' });
    });
};
