import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { createReceituario } from './requests';

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

export const NewReceituarioModal = ({ open, setOpen, sendNotification, setLoading, setReceituarios }) => {
  const validationSchema = yup.object({
    nomeMedico: yup.string('Insira o nome do médico').required('Nome do médico é obrigatório'),
    nomeArquivo: yup.string('Insira o nome do arquivo').required('Nome do arquivo é obrigatório'),
    idPaciente: yup.string('Insira o ID do paciente').required('ID do paciente é obrigatório'),
    nomeReceita: yup.string('Insira o nome da receita').required('Nome da receita é obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      nomeMedico: '',
      nomeArquivo: '',
      idPaciente: '',
      nomeReceita: '',
      arquivo: null, // new field for file
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('nomeMedico', values.nomeMedico);
      formData.append('nomeArquivo', values.nomeArquivo);
      formData.append('idPaciente', values.idPaciente);
      formData.append('nomeReceita', values.nomeReceita);
      if (values.arquivo) {
      formData.append('pdf', values.arquivo); // direto
      }
      createReceituario(formData, setLoading, sendNotification, handleClose, setReceituarios);
    },
  });

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    formik.resetForm();
    setOpen(false);
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
          Novo Receituário
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
            <TextField
              fullWidth
              id="nomeReceita"
              name="nomeReceita"
              label="Nome da Receita"
              inputProps={{ maxLength: 255 }}
              value={formik.values.nomeReceita}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nomeReceita && Boolean(formik.errors.nomeReceita)}
              helperText={formik.touched.nomeReceita && formik.errors.nomeReceita}
            />
            {/* File upload field */}
            <Button
              variant="outlined"
              component="label"
              sx={{ alignSelf: 'center', height: '56px' }}
            >
              Upload Arquivo
              <input
                type="file"
                hidden
                accept="*"
                onChange={(event) => {
                  if (event.currentTarget.files && event.currentTarget.files[0]) {
                    formik.setFieldValue('arquivo', event.currentTarget.files[0]);
                    formik.setFieldValue('nomeArquivo', event.currentTarget.files[0].name);
                  }
                }}
              />
            </Button>
            {formik.values.arquivo && (
              <Typography variant="body2" sx={{ alignSelf: 'center', ml: 1 }}>
                {formik.values.arquivo.name}
              </Typography>
            )}
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
