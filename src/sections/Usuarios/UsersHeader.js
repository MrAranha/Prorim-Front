import { Box, Button, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { getUsers } from './requests';

export const UsersHeader = ({ getUsers, handleOpenNewModal }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
      <Stack container spacing={1}>
        <Box align="left">
          <Typography variant="h4"> Usuários </Typography>
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={1}>
        <Box>
          <Button
            variant="contained"
            direction="row-reverse"
            endIcon={<Iconify width={24} icon={'mdi:magnify'} />}
            onClick={() => {
              getUsers();
            }}
          >
            Buscar
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            direction="row-reverse"
            onClick={() => {
              handleOpenNewModal();
            }}
            endIcon={<Iconify width={24} icon={'mdi:paper'} />}
          >
            Novo
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};
