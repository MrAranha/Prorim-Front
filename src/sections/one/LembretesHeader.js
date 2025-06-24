import { Box, Button, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { getLembretes } from './requests';
import { localStorageGetItem } from 'src/utils/storage-available';

export const LembretesHeader = ({ getLembretes, handleOpenNewModal }) => {
  const role = localStorageGetItem('role');
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
      <Stack container spacing={1}>
        <Box align="left">
          <Typography variant="h4"> Lembretes </Typography>
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" spacing={1}>
        <Box>
          <Button
            variant="contained"
            direction="row-reverse"
            endIcon={<Iconify width={24} icon={'mdi:magnify'} />}
            onClick={() => {
              getLembretes();
            }}
          >
            Buscar
          </Button>
        </Box>
        <Box>
          {role === 'A' ? (
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
          ) : (
            <></>
          )}
        </Box>
      </Stack>
    </Stack>
  );
};
