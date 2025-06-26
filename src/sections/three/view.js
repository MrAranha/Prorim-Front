'use client';

import Container from '@mui/material/Container';
import { ReceituariosTable } from './ReceituariosTable';
import { useSettingsContext } from 'src/components/settings';
import { ReceituariosFilter } from './ReceituariosFilter';
import { ReceituariosHeader } from './ReceituariosHeader';
import { useEffect, useState } from 'react';
import { fazerDownloadCrud, searchReceituarios } from './requests';
import { getReceituarios } from './crud';
import useNotification from 'src/theme/overrides/components/AlertMessage';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { NewReceituarioModal } from './NewReceituarioModal';
import { DeleteReceituarioModal } from './DeleteReceituarioModal';
import { EditReceituarioForm } from './EditReceituarioModal';
import { localStorageGetItem } from 'src/utils/storage-available';

// ----------------------------------------------------------------------

export default function ThreeView() {
  const [openNewModal, setOpenNewModal] = useState(false);
  const handleOpenNewModal = () => {
    setOpenNewModal(true);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openTrocarSenhaModal, setOpenTrocarSenhaModal] = useState(false);
  const [openEditReceituarioModal, setOpenEditReceituarioModal] = useState(false);
  const [ReceituarioID, setReceituarioID] = useState('');
  const [msg, sendNotification] = useNotification();
  const settings = useSettingsContext();
  const [Receituarios, setReceituarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queries, setQueries] = useState({
    nomeMedico: '',
    idPaciente: '',
    nomeArquivo: '',
  });
  const role = localStorageGetItem('role');

  useEffect(() => {
    setLoading(true);
    getReceituarios(queries)
      .then((data) => {
        if (data.data) {
          setReceituarios(data.data);
        } else {
          setReceituarios([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        sendNotification({ msg: error.title || error, variant: 'error' });
        setLoading(false);
      });
  }, []);

  const getReceituariosFilter = () => {
    searchReceituarios(queries, setLoading, setReceituarios, sendNotification);
  };
  const fazerDownload = (receituarioid, userid) => {
    fazerDownloadCrud(receituarioid, userid, setLoading, sendNotification);
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <SnackbarProvider />
      <ReceituariosHeader getReceituarios={getReceituariosFilter} handleOpenNewModal={handleOpenNewModal} />
      <NewReceituarioModal
        open={openNewModal}
        setOpen={setOpenNewModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setReceituarios={setReceituarios}
      />
      <ReceituariosFilter queries={queries} setQueries={setQueries} />
      <ReceituariosTable
        rows={Receituarios}
        role={role}
        loading={loading}
        setOpenEditModal={setOpenEditReceituarioModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setReceituarioID={setReceituarioID}
        setOpenTrocarSenhaModal={setOpenTrocarSenhaModal}
        fazerDownload={fazerDownload}
      />
      <DeleteReceituarioModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setReceituarios={setReceituarios}
        ReceituarioID={ReceituarioID}
        setReceituarioID={setReceituarioID}
      />
      <EditReceituarioForm
        open={openEditReceituarioModal}
        setOpen={setOpenEditReceituarioModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setReceituarios={setReceituarios}
        ReceituarioID={ReceituarioID}
        setReceituarioID={setReceituarioID}
      />
    </Container>
  );
}
