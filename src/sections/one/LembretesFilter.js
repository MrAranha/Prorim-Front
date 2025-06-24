import { Input, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const LembretesFilter = ({ queries, setQueries }) => {
  return (
    <Stack direction="row" spacing={1} paddingTop={3}>
      <TextField
        id="outlined-basic"
        label="Nome"
        fullWidth
        variant="outlined"
        inputProps={{ maxLength: 255 }}
        onChange={(e) => {
          setQueries({ ...queries, nomeLembrete: e.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Tipo Transplante"
        inputProps={{ maxLength: 4 }}
        fullWidth
        variant="outlined"
        onChange={(e) => {
          setQueries({ ...queries, tipoTransplante: e.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        inputProps={{ maxLength: 255 }}
        label="Remedio"
        fullWidth
        variant="outlined"
        onChange={(e) => {
          setQueries({ ...queries, remedio: e.target.value });
        }}
      />
    </Stack>
  );
};
