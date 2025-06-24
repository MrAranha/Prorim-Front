import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { editLembrete } from './requests';
import { useEffect, useState } from 'react';
import { getLembreteByIDs } from './crud';

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

export const EditLembreteForm = ({
  open,
  setOpen,
  sendNotification,
  setLoading,
  setLembretes,
  LembreteID,
  setLembreteID,
}) => {
  const [Lembrete, setLembrete] = useState({});

  useEffect(() => {
    if (LembreteID)
      getLembreteByIDs(LembreteID, sendNotification)
        .then((data) => {
          setLembrete(data.data);
        })
        .catch((error) => {
          sendNotification({ msg: error.title || error, variant: 'error' });
        });
  }, [LembreteID]);
  return (
    <EditLembreteModal
      open={open}
      setOpen={setOpen}
      sendNotification={sendNotification}
      setLoading={setLoading}
      setLembretes={setLembretes}
      Lembrete={Lembrete}
      setLembreteID={setLembreteID}
      LembreteID={LembreteID}
      setLembrete={setLembrete}
    />
  );
};

export const EditLembreteModal = ({
  open,
  setOpen,
  sendNotification,
  setLoading,
  setLembretes,
  Lembrete,
  setLembreteID,
  LembreteID,
  setLembrete,
}) => {
  const validationSchema = yup.object({
    nomeLembrete: yup.string('Insira o nome do lembrete').required('Nome é obrigatório'),
    DataLembrete: yup.string('Insira a data do lembrete').required('Data é obrigatória'),
    clienteID: yup.string('Insira o cliente ID').required('Cliente ID é obrigatório'),
    tipoTransplante: yup.string('Insira o tipo de transplante').required('Tipo de transplante é obrigatório'),
    remedio: yup.string('Insira o remédio').required('Remédio é obrigatório'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nomeLembrete: Lembrete?.nomeLembrete || '',
      DataLembrete: Lembrete?.DataLembrete || '',
      clienteID: Lembrete?.clienteID || '',
      tipoTransplante: Lembrete?.tipoTransplante || '',
      remedio: Lembrete?.remedio || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      editLembrete(values, LembreteID, setLoading, sendNotification, handleClose, setLembretes);
    },
  });

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    formik.resetForm();
    setOpen(false);
    setLembreteID('');
    setLembrete({
      nomeLembrete: '',
      DataLembrete: '',
      clienteID: '',
      tipoTransplante: '',
      remedio: '',
    });
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
          Editar Lembrete
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={1} paddingTop={3}>
            <TextField
              fullWidth
              id="nomeLembrete"
              name="nomeLembrete"
              label="Nome do Lembrete"
              inputProps={{ maxLength: 255 }}
              value={formik.values.nomeLembrete}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nomeLembrete && Boolean(formik.errors.nomeLembrete)}
              helperText={formik.touched.nomeLembrete && formik.errors.nomeLembrete}
            />
            <TextField
              fullWidth
              id="DataLembrete"
              name="DataLembrete"
              label="Data do Lembrete"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.DataLembrete}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.DataLembrete && Boolean(formik.errors.DataLembrete)}
              helperText={formik.touched.DataLembrete && formik.errors.DataLembrete}
            />
            <TextField
              fullWidth
              id="clienteID"
              name="clienteID"
              label="Cliente ID"
              inputProps={{ maxLength: 255 }}
              value={formik.values.clienteID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.clienteID && Boolean(formik.errors.clienteID)}
              helperText={formik.touched.clienteID && formik.errors.clienteID}
            />
            <TextField
              fullWidth
              id="tipoTransplante"
              name="tipoTransplante"
              label="Tipo de Transplante"
              inputProps={{ maxLength: 255 }}
              value={formik.values.tipoTransplante}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.tipoTransplante && Boolean(formik.errors.tipoTransplante)}
              helperText={formik.touched.tipoTransplante && formik.errors.tipoTransplante}
            />
            <TextField
              fullWidth
              id="remedio"
              name="remedio"
              label="Remédio"
              inputProps={{ maxLength: 255 }}
              value={formik.values.remedio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.remedio && Boolean(formik.errors.remedio)}
              helperText={formik.touched.remedio && formik.errors.remedio}
            />
          </Stack>
          <Stack
            paddingTop={3}
            direction="row"
            spacing={1}
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
