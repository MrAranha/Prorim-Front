'use client';

import Container from '@mui/material/Container';
import { LaudosTable } from './LaudosTable';
import { useSettingsContext } from 'src/components/settings';
import { LaudosFilter } from './LaudosFilter';
import { LaudosHeader } from './LaudosHeader';
import { useEffect, useState } from 'react';
import { fazerDownloadCrud, searchLaudos } from './requests';
import { getLaudos } from './crud';
import useNotification from 'src/theme/overrides/components/AlertMessage';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { NewLaudoModal } from './NewLaudoModal';
import { DeleteLaudoModal } from './DeleteLaudoModal';
import { EditLaudoForm } from './EditLaudoModal';
import { localStorageGetItem } from 'src/utils/storage-available';

// ----------------------------------------------------------------------

export default function FourView() {
  const [openNewModal, setOpenNewModal] = useState(false);
  const handleOpenNewModal = () => {
    setOpenNewModal(true);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openTrocarSenhaModal, setOpenTrocarSenhaModal] = useState(false);
  const [openEditLaudoModal, setOpenEditLaudoModal] = useState(false);
  const [LaudoID, setLaudoID] = useState('');
  const [msg, sendNotification] = useNotification();
  const settings = useSettingsContext();
  const [Laudos, setLaudos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queries, setQueries] = useState({
    nomeMedico: '',
    idPaciente: '',
    nomeArquivo: '',
  });
  const role = localStorageGetItem('role');

  useEffect(() => {
    setLoading(true);
    getLaudos(queries)
      .then((data) => {
        if (data.data) {
          setLaudos(data.data);
        } else {
          setLaudos([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        sendNotification({ msg: error.title || error, variant: 'error' });
        setLoading(false);
      });
  }, []);

  const getLaudosFilter = () => {
    searchLaudos(queries, setLoading, setLaudos, sendNotification);
  };
  const fazerDownload = (laudoid, userid) => {
    fazerDownloadCrud(laudoid, userid, setLoading, sendNotification);
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <SnackbarProvider />
      <LaudosHeader getLaudos={getLaudosFilter} handleOpenNewModal={handleOpenNewModal} />
      <NewLaudoModal
        open={openNewModal}
        setOpen={setOpenNewModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setLaudos={setLaudos}
      />
      <LaudosFilter queries={queries} setQueries={setQueries} />
      <LaudosTable
        rows={Laudos}
        role={role}
        loading={loading}
        setOpenEditModal={setOpenEditLaudoModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setLaudoID={setLaudoID}
        setOpenTrocarSenhaModal={setOpenTrocarSenhaModal}
        fazerDownload={fazerDownload}
      />
      <DeleteLaudoModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setLaudos={setLaudos}
        LaudoID={LaudoID}
        setLaudoID={setLaudoID}
      />
      <EditLaudoForm
        open={openEditLaudoModal}
        setOpen={setOpenEditLaudoModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setLaudos={setLaudos}
        LaudoID={LaudoID}
        setLaudoID={setLaudoID}
      />
    </Container>
  );
}
