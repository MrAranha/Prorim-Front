import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { editLaudo } from './requests';
import { useEffect, useState } from 'react';
import { getLaudoByIDs } from './crud';

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

export const EditLaudoForm = ({
  open,
  setOpen,
  sendNotification,
  setLoading,
  setLaudos,
  LaudoID,
  setLaudoID,
}) => {
  const [Laudo, setLaudo] = useState({});

  useEffect(() => {
    if (LaudoID)
      getLaudoByIDs(LaudoID, sendNotification)
        .then((data) => {
          setLaudo(data.data);
        })
        .catch((error) => {
          sendNotification({ msg: error.title || error, variant: 'error' });
        });
  }, [LaudoID]);
  return (
    <EditLaudoModal
      open={open}
      setOpen={setOpen}
      sendNotification={sendNotification}
      setLoading={setLoading}
      setLaudos={setLaudos}
      Laudo={Laudo}
      setLaudoID={setLaudoID}
      LaudoID={LaudoID}
      setLaudo={setLaudo}
    />
  );
};

export const EditLaudoModal = ({
  open,
  setOpen,
  sendNotification,
  setLoading,
  setLaudos,
  Laudo,
  setLaudoID,
  LaudoID,
  setLaudo,
}) => {
  const validationSchema = yup.object({
    nomeMedico: yup.string('Insira o nome do médico').required('Nome do médico é obrigatório'),
    nomeArquivo: yup.string('Insira o nome do arquivo').required('Nome do arquivo é obrigatório'),
    idPaciente: yup.string('Insira o ID do paciente').required('ID do paciente é obrigatório'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nomeMedico: Laudo?.nomeMedico || '',
      nomeArquivo: Laudo?.nomeArquivo || '',
      idPaciente: Laudo?.idPaciente || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      editLaudo(values, LaudoID, setLoading, sendNotification, handleClose, setLaudos);
    },
  });

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    formik.resetForm();
    setOpen(false);
    setLaudoID('');
    setLaudo({
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
          Editar Laudo
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
