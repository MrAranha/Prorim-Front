import { Input, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const CarrosFilter = ({ queries, setQueries }) => {
  return (
    <Stack direction="row" spacing={1} paddingTop={3}>
      <TextField
        id="outlined-basic"
        label="Nome"
        fullWidth
        variant="outlined"
        inputProps={{ maxLength: 255 }}
        onChange={(e) => {
          setQueries({ ...queries, Nome: e.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Ano"
        inputProps={{ maxLength: 4 }}
        fullWidth
        variant="outlined"
        onChange={(e) => {
          setQueries({ ...queries, Ano: e.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        inputProps={{ maxLength: 255 }}
        label="Marca"
        fullWidth
        variant="outlined"
        onChange={(e) => {
          setQueries({ ...queries, Marca: e.target.value });
        }}
      />
    </Stack>
  );
};
