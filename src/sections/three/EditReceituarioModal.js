import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { editReceituario } from './requests';
import { useEffect, useState } from 'react';
import { getReceituarioByIDs } from './crud';

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

export const EditReceituarioForm = ({
  open,
  setOpen,
  sendNotification,
  setLoading,
  setReceituarios,
  ReceituarioID,
  setReceituarioID,
}) => {
  const [Receituario, setReceituario] = useState({});

  useEffect(() => {
    if (ReceituarioID)
      getReceituarioByIDs(ReceituarioID, sendNotification)
        .then((data) => {
          setReceituario(data.data);
        })
        .catch((error) => {
          sendNotification({ msg: error.title || error, variant: 'error' });
        });
  }, [ReceituarioID]);
  return (
    <EditReceituarioModal
      open={open}
      setOpen={setOpen}
      sendNotification={sendNotification}
      setLoading={setLoading}
      setReceituarios={setReceituarios}
      Receituario={Receituario}
      setReceituarioID={setReceituarioID}
      ReceituarioID={ReceituarioID}
      setReceituario={setReceituario}
    />
  );
};

export const EditReceituarioModal = ({
  open,
  setOpen,
  sendNotification,
  setLoading,
  setReceituarios,
  Receituario,
  setReceituarioID,
  ReceituarioID,
  setReceituario,
}) => {
  const validationSchema = yup.object({
    nomeMedico: yup.string('Insira o nome do médico').required('Nome do médico é obrigatório'),
    nomeArquivo: yup.string('Insira o nome do arquivo').required('Nome do arquivo é obrigatório'),
    idPaciente: yup.string('Insira o ID do paciente').required('ID do paciente é obrigatório'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nomeMedico: Receituario?.nomeMedico || '',
      nomeArquivo: Receituario?.nomeArquivo || '',
      idPaciente: Receituario?.idPaciente || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      editReceituario(values, ReceituarioID, setLoading, sendNotification, handleClose, setReceituarios);
    },
  });

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    formik.resetForm();
    setOpen(false);
    setReceituarioID('');
    setReceituario({
      nomeMedico: '',
      nomeArquivo: '',
      idPaciente: '',
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
          Editar Receituário
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={1} paddingTop={3}>
            <TextField
              fullWidth
              id="nomeMedico"
              name="nomeMedico"
              label="Nome do Médico"
              inputProps={{ maxLength: 255 }}
              value={formik.values.nomeMedico}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nomeMedico && Boolean(formik.errors.nomeMedico)}
              helperText={formik.touched.nomeMedico && formik.errors.nomeMedico}
            />
                        <TextField
                          fullWidth
                          id="nomeArquivo"
                          name="nomeArquivo"
                          label="Nome do Arquivo"
                          disabled={true}
                          inputProps={{ maxLength: 255 }}
                          value={formik.values.nomeArquivo}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.nomeArquivo && Boolean(formik.errors.nomeArquivo)}
                          helperText={formik.touched.nomeArquivo && formik.errors.nomeArquivo}
                        />
            <TextField
              fullWidth
              id="idPaciente"
              name="idPaciente"
              label="ID do Paciente"
              disabled={true}
              inputProps={{ maxLength: 255 }}
              value={formik.values.idPaciente}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.idPaciente && Boolean(formik.errors.idPaciente)}
              helperText={formik.touched.idPaciente && formik.errors.idPaciente}
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
