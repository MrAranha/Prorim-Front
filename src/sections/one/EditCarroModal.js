import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { editCarro } from './requests';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCarroByIDs } from './crud';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const EditCarroForm = ({
  open,
  setOpen,
  sendNotification,
  setLoading,
  setCarros,
  CarroID,
  setCarroID,
}) => {
  const [Carro, setCarro] = useState({});

  useEffect(() => {
    if (CarroID)
      getCarroByIDs(CarroID, sendNotification)
        .then((data) => {
          setCarro(data.data);
        })
        .catch((error) => {
          sendNotification({ msg: error.title || error, variant: 'error' });
        });
  }, [CarroID]);
  return (
    <EditCarroModal
      open={open}
      setOpen={setOpen}
      sendNotification={sendNotification}
      setLoading={setLoading}
      setCarros={setCarros}
      Carro={Carro}
      setCarroID={setCarroID}
      CarroID={CarroID}
      setCarro={setCarro}
    />
  );
};

export const EditCarroModal = ({
  open,
  setOpen,
  sendNotification,
  setLoading,
  setCarros,
  Carro,
  setCarroID,
  CarroID,
  setCarro,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nome: Carro ? Carro.Nome : '',
      marca: Carro ? Carro.Marca : '',
      quantidade: Carro ? Carro.Quantidade : 0,
      ano: Carro ? Carro.Ano : '',
    },
    onSubmit: (values) => {
      editCarro(Carro, CarroID, setLoading, sendNotification, handleClose, setCarros);
    },
  });

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    formik.resetForm();
    setOpen(false);
    setCarroID('');
    setCarro({ nome: '', quantidade: 0, ano: '', marca: '' });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h4" component="h2" paddingBottom={1}>
          Editar Carro
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={1} paddingTop={3}>
            <TextField
              fullWidth
              id="Nome"
              name="Nome"
              label="Nome"
              inputProps={{ maxLength: 255 }}
              value={Carro.nome || ''}
              onChange={(e) => {
                setCarro({
                  nome: e.target.value,
                  quantidade: Carro.quantidade,
                  ano: Carro.ano,
                  marca: Carro.marca,
                });
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.nome && Boolean(formik.errors.nome)}
              helperText={formik.touched.nome && formik.errors.nome}
            />
            <TextField
              fullWidth
              id="Marca"
              name="Marca"
              label="Marca"
              value={Carro.marca || ''}
              inputProps={{ maxLength: 255 }}
              onChange={(e) => {
                setCarro({
                  nome: Carro.nome,
                  quantidade: Carro.quantidade,
                  ano: Carro.ano,
                  marca: e.target.value,
                });
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.marca && Boolean(formik.errors.marca)}
              helperText={formik.touched.marca && formik.errors.marca}
            />
            <TextField
              fullWidth
              id="Ano"
              name="Ano"
              label="Ano"
              type="Ano"
              inputProps={{ maxLength: 255 }}
              value={Carro.ano || ''}
              onChange={(e) => {
                setCarro({
                  nome: Carro.nome,
                  quantidade: Carro.quantidade,
                  ano: e.target.value,
                  marca: Carro.marca,
                });
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.ano && Boolean(formik.errors.ano)}
              helperText={formik.touched.ano && formik.errors.ano}
            />
            <TextField
              fullWidth
              id="Quantidade"
              name="Quantidade"
              label="Quantidade"
              type="Quantidade"
              inputProps={{ maxLength: 255 }}
              value={Carro.quantidade}
              onChange={(e) => {
                setCarro({
                  nome: Carro.nome,
                  quantidade: e.target.value,
                  ano: Carro.ano,
                  marca: Carro.marca,
                });
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.quantidade && Boolean(formik.errors.quantidade)}
              helperText={formik.touched.quantidade && formik.errors.Quantidade}
            />
          </Stack>
          <Stack
            paddingTop={3}
            direction="row"
            spacing={1}
            inputProps={{ maxLength: 255 }}
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <Button color="secondary" variant="contained" onClick={handleClose}>
              Fechar
            </Button>
            <Button color="secondary" variant="contained" type="submit">
              Salvar
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
