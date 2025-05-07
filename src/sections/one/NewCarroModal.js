import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { createCarro } from './requests';

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

export const NewCarroModal = ({ open, setOpen, sendNotification, setLoading, setCarros }) => {
  const validationSchema = yup.object({
    Nome: yup.string('Insira o Nome').required('Nome é obrigatório'),
    Marca: yup.string('Insira a Marca').required('Marca é obrigatório'),
    Quantidade: yup.string('Insira a Quantidade').required('Quantidade é obrigatório'),
    Ano: yup
      .string('Insira o Ano')
      .min(4, 'Ano deve conter no mínimo 4 dígitos')
      .required('Ano é obrigatório'),
  });
  const formik = useFormik({
    initialValues: {
      Marca: '',
      Nome: '',
      Ano: '',
      Quantidade: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createCarro(values, setLoading, sendNotification, handleClose, setCarros);
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
          Novo Usuário
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={1} paddingTop={3}>
            <TextField
              fullWidth
              id="Nome"
              name="Nome"
              label="Nome"
              inputProps={{ maxLength: 255 }}
              value={formik.values.Nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Nome && Boolean(formik.errors.Nome)}
              helperText={formik.touched.Nome && formik.errors.Nome}
            />
            <TextField
              fullWidth
              id="Marca"
              name="Marca"
              label="Marca"
              value={formik.values.Marca}
              inputProps={{ maxLength: 255 }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Marca && Boolean(formik.errors.Marca)}
              helperText={formik.touched.Marca && formik.errors.Marca}
            />
            <TextField
              fullWidth
              id="Ano"
              name="Ano"
              label="Ano"
              type="Ano"
              inputProps={{ maxLength: 255 }}
              value={formik.values.Ano}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Ano && Boolean(formik.errors.Ano)}
              helperText={formik.touched.Ano && formik.errors.Ano}
            />
            <TextField
              fullWidth
              id="Quantidade"
              name="Quantidade"
              label="Quantidade"
              type="Quantidade"
              inputProps={{ maxLength: 255 }}
              value={formik.values.Quantidade}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Quantidade && Boolean(formik.errors.Quantidade)}
              helperText={formik.touched.Quantidade && formik.errors.Quantidade}
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
