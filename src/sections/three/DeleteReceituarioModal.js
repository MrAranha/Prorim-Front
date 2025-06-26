import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { deleteReceituario } from './requests';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const DeleteReceituarioModal = ({
  open,
  setOpen,
  sendNotification,
  setLoading,
  setReceituarios,
  ReceituarioID,
  setReceituarioID,
}) => {
  const handleClose = (event, reason) => {
    setOpen(false);
    setReceituarioID('');
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
          Deletar
        </Typography>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2" paddingTop={1}>
          Tem certeza que deseja deletar o receituário?
        </Typography>
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
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              deleteReceituario(ReceituarioID, setLoading, sendNotification, handleClose, setReceituarios);
            }}
          >
            Deletar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
