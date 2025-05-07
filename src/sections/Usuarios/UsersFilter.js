import { Input, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const UsersFilter = ({ queries, setQueries }) => {
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
        label="E-mail"
        inputProps={{ maxLength: 255 }}
        fullWidth
        variant="outlined"
        onChange={(e) => {
          setQueries({ ...queries, Email: e.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        inputProps={{ maxLength: 255 }}
        label="Empresa"
        fullWidth
        variant="outlined"
        onChange={(e) => {
          setQueries({ ...queries, Empresa: e.target.value });
        }}
      />
    </Stack>
  );
};
