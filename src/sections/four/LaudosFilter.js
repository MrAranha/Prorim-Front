import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';

export const LaudosFilter = ({ queries, setQueries }) => {
  return (
    <Stack direction="row" spacing={1} paddingTop={3}>
      <TextField
        id="outlined-basic"
        label="Nome do Médico"
        fullWidth
        variant="outlined"
        inputProps={{ maxLength: 255 }}
        onChange={(e) => {
          setQueries({ ...queries, nomeMedico: e.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        label="Nome do Arquivo"
        inputProps={{ maxLength: 255 }}
        fullWidth
        variant="outlined"
        onChange={(e) => {
          setQueries({ ...queries, nomeArquivo: e.target.value });
        }}
      />
      <TextField
        id="outlined-basic"
        inputProps={{ maxLength: 255 }}
        label="ID do Paciente"
        fullWidth
        variant="outlined"
        onChange={(e) => {
          setQueries({ ...queries, idPaciente: e.target.value });
        }}
      />
    </Stack>
  );
};
