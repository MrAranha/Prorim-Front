'use client';
import Container from '@mui/material/Container';
import { LembretesTable } from './LembretesTable';
import { useSettingsContext } from 'src/components/settings';
import { LembretesFilter } from './LembretesFilter';
import { LembretesHeader } from './LembretesHeader';
import { useEffect, useState } from 'react';
import { fazerPedidoCrud, searchLembretes } from './requests';
import { getLembretes } from './crud';
import useNotification from 'src/theme/overrides/components/AlertMessage';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { NewLembreteModal } from './NewLembreteModal';
import { DeleteLembreteModal } from './DeleteLembreteModal';
import { EditLembreteForm } from './EditLembreteModal';
import { localStorageGetItem } from 'src/utils/storage-available';

// ----------------------------------------------------------------------

export default function OneView() {
  const [openNewModal, setOpenNewModal] = useState(false);
  const handleOpenNewModal = () => {
    setOpenNewModal(true);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openTrocarSenhaModal, setOpenTrocarSenhaModal] = useState(false);
  const [openEditLembreteModal, setOpenEditLembreteModal] = useState(false);
  const [LembreteID, setLembreteID] = useState('');
  const [msg, sendNotification] = useNotification();
  const settings = useSettingsContext();
  const [Lembretes, setLembretes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queries, setQueries] = useState({
    nomeLembrete: '',
    tipoTransplante: '',
    remedio: '',
  });
  const role = localStorageGetItem('role');

  useEffect(() => {
    setLoading(true);
    getLembretes(queries)
      .then((data) => {
        if (data.data) {
          setLembretes(data.data);
        } else {
          setLembretes([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        sendNotification({ msg: error.title || error, variant: 'error' });
        setLoading(false);
      });
  }, []);

  const getLembretesFilter = () => {
    searchLembretes(queries, setLoading, setLembretes, sendNotification);
  };
  const fazerPedido = (lembreteid, userid) => {
    fazerPedidoCrud(lembreteid, userid, setLoading, sendNotification);
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <SnackbarProvider />
      <LembretesHeader getLembretes={getLembretesFilter} handleOpenNewModal={handleOpenNewModal} />
      <NewLembreteModal
        open={openNewModal}
        setOpen={setOpenNewModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setLembretes={setLembretes}
      />
      <LembretesFilter queries={queries} setQueries={setQueries} />
      <LembretesTable
        rows={Lembretes}
        role={role}
        loading={loading}
        setOpenEditModal={setOpenEditLembreteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setLembreteID={setLembreteID}
        setOpenTrocarSenhaModal={setOpenTrocarSenhaModal}
        fazerPedido={fazerPedido}
      />
      <DeleteLembreteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setLembretes={setLembretes}
        LembreteID={LembreteID}
        setLembreteID={setLembreteID}
      />
      <EditLembreteForm
        open={openEditLembreteModal}
        setOpen={setOpenEditLembreteModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setLembretes={setLembretes}
        LembreteID={LembreteID}
        setLembreteID={setLembreteID}
      />
    </Container>
  );
}
