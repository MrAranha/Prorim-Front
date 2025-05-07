import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { createUser } from './requests';

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

export const NewUserModal = ({ open, setOpen, sendNotification, setLoading, setUsers }) => {
  const validationSchema = yup.object({
    Nome: yup.string('Insira o nome').required('Nome é obrigatório'),
    Email: yup
      .string('Insira o e-mail')
      .email('Formato de Email não é válido')
      .required('Email é obrigatório'),
    Password: yup
      .string('Insira a senha')
      .min(8, 'A senha deve conter no mínimo 8 dígitos')
      .required('Senha é obrigatório'),
  });
  const formik = useFormik({
    initialValues: {
      Email: '',
      Nome: '',
      Password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createUser(values, setLoading, sendNotification, handleClose, setUsers);
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
              id="Email"
              name="Email"
              label="E-mail"
              value={formik.values.Email}
              inputProps={{ maxLength: 255 }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Email && Boolean(formik.errors.Email)}
              helperText={formik.touched.Email && formik.errors.Email}
            />
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
              id="Password"
              name="Password"
              label="Senha"
              type="Password"
              inputProps={{ maxLength: 255 }}
              value={formik.values.Password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Password && Boolean(formik.errors.Password)}
              helperText={formik.touched.Password && formik.errors.Password}
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
