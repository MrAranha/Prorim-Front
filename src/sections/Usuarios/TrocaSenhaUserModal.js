import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';
import { changeUserPassword, editUser } from './requests';
import { useEffect } from 'react';
import { useState } from 'react';
import { getUserByIDs } from './crud';

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

export const TrocaSenhaUserModal = ({ open, setOpen, sendNotification, userID, setUserID }) => {
  const validationSchema = yup.object({
    senha: yup.string('Nova Senha').required('Nova Senha é obrigatória'),
    confirmarSenha: yup
      .string()
      .oneOf([yup.ref('senha'), null], 'As senhas precisam ser iguais')
      .required('Confirmação Obrigatória'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      senha: '',
      confirmarSenha: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      changeUserPassword({ Password: values.senha, UserID: userID }, sendNotification, handleClose);
    },
  });

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    formik.resetForm();
    setOpen(false);
    setUserID('');
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
              id="senha"
              inputProps={{ maxLength: 255 }}
              name="senha"
              label="Nova Senha"
              value={formik.values.senha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.senha && Boolean(formik.errors.senha)}
              helperText={formik.touched.senha && formik.errors.senha}
            />
            <TextField
              fullWidth
              id="confirmarSenha"
              inputProps={{ maxLength: 255 }}
              name="confirmarSenha"
              label="Confirmar Senha"
              value={formik.values.confirmarSenha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmarSenha && Boolean(formik.errors.confirmarSenha)}
              helperText={formik.touched.confirmarSenha && formik.errors.confirmarSenha}
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
