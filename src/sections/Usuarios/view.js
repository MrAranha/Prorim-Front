'use client';
import Container from '@mui/material/Container';
import { UsersTable } from './UsersTable';
import { useSettingsContext } from 'src/components/settings';
import { UsersFilter } from './UsersFilter';
import { UsersHeader } from './UsersHeader';
import { useEffect, useState } from 'react';
import { searchUsers } from './requests';
import { getUsers } from './crud';
import useNotification from 'src/theme/overrides/components/AlertMessage';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { NewUserModal } from './NewUserModal';
import { DeleteUserModal } from './DeleteUserModal';
import { EditUserForm } from './EditUserModal';
import { TrocaSenhaUserModal } from './TrocaSenhaUserModal';

// ----------------------------------------------------------------------

export default function UsuariosView() {
  const [openNewModal, setOpenNewModal] = useState(false);
  const handleOpenNewModal = () => {
    setOpenNewModal(true);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openTrocarSenhaModal, setOpenTrocarSenhaModal] = useState(false);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [userID, setUserID] = useState('');
  const [msg, sendNotification] = useNotification();
  const settings = useSettingsContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queries, setQueries] = useState({
    Nome: '',
    Email: '',
    Empresa: '',
  });
  useEffect(() => {
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
        sendNotification({ msg: error.title || error, variant: 'error' });
        setLoading(false);
      });
  }, []);

  const getUsersFilter = () => {
    searchUsers(queries, setLoading, setUsers, sendNotification);
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <SnackbarProvider />
      <UsersHeader getUsers={getUsersFilter} handleOpenNewModal={handleOpenNewModal} />
      <NewUserModal
        open={openNewModal}
        setOpen={setOpenNewModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setUsers={setUsers}
      />
      <UsersFilter queries={queries} setQueries={setQueries} />
      <UsersTable
        rows={users}
        loading={loading}
        setOpenEditModal={setOpenEditUserModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setUserID={setUserID}
        setOpenTrocarSenhaModal={setOpenTrocarSenhaModal}
      />
      <DeleteUserModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setUsers={setUsers}
        userID={userID}
        setUserID={setUserID}
      />
      <TrocaSenhaUserModal
        open={openTrocarSenhaModal}
        setOpen={setOpenTrocarSenhaModal}
        sendNotification={sendNotification}
        setUserID={setUserID}
        userID={userID}
      />
      <EditUserForm
        open={openEditUserModal}
        setOpen={setOpenEditUserModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setUsers={setUsers}
        userID={userID}
        setUserID={setUserID}
      />
    </Container>
  );
}
