'use client';
import Container from '@mui/material/Container';
import { CarrosTable } from './CarrosTable';
import { useSettingsContext } from 'src/components/settings';
import { CarrosFilter } from './CarrosFilter';
import { CarrosHeader } from './CarrosHeader';
import { useEffect, useState } from 'react';
import { fazerPedidoCrud, searchCarros } from './requests';
import { getCarros } from './crud';
import useNotification from 'src/theme/overrides/components/AlertMessage';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { NewCarroModal } from './NewCarroModal';
import { DeleteCarroModal } from './DeleteCarroModal';
import { EditCarroForm } from './EditCarroModal';
import { localStorageGetItem } from 'src/utils/storage-available';

// ----------------------------------------------------------------------

export default function OneView() {
  const [openNewModal, setOpenNewModal] = useState(false);
  const handleOpenNewModal = () => {
    setOpenNewModal(true);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openTrocarSenhaModal, setOpenTrocarSenhaModal] = useState(false);
  const [openEditCarroModal, setOpenEditCarroModal] = useState(false);
  const [CarroID, setCarroID] = useState('');
  const [msg, sendNotification] = useNotification();
  const settings = useSettingsContext();
  const [Carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queries, setQueries] = useState({
    Nome: '',
    Ano: '',
    Marca: '',
  });
  const role = localStorageGetItem('role');

  useEffect(() => {
    setLoading(true);
    getCarros(queries)
      .then((data) => {
        if (data.data) {
          setCarros(data.data);
        } else {
          setCarros([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        sendNotification({ msg: error.title || error, variant: 'error' });
        setLoading(false);
      });
  }, []);

  const getCarrosFilter = () => {
    searchCarros(queries, setLoading, setCarros, sendNotification);
  };
  const fazerPedido = (carroid, userid) => {
    fazerPedidoCrud(carroid, userid, setLoading, sendNotification);
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <SnackbarProvider />
      <CarrosHeader getCarros={getCarrosFilter} handleOpenNewModal={handleOpenNewModal} />
      <NewCarroModal
        open={openNewModal}
        setOpen={setOpenNewModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setCarros={setCarros}
      />
      <CarrosFilter queries={queries} setQueries={setQueries} />
      <CarrosTable
        rows={Carros}
        role={role}
        loading={loading}
        setOpenEditModal={setOpenEditCarroModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setCarroID={setCarroID}
        setOpenTrocarSenhaModal={setOpenTrocarSenhaModal}
        fazerPedido={fazerPedido}
      />
      <DeleteCarroModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setCarros={setCarros}
        CarroID={CarroID}
        setCarroID={setCarroID}
      />
      <EditCarroForm
        open={openEditCarroModal}
        setOpen={setOpenEditCarroModal}
        sendNotification={sendNotification}
        setLoading={setLoading}
        setCarros={setCarros}
        CarroID={CarroID}
        setCarroID={setCarroID}
      />
    </Container>
  );
}
