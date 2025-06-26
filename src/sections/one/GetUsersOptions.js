import React, { useEffect, useState } from 'react';
import { getAllUsers } from './crud';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

export default function GetUsersOptions(props) {
  const {
    fullWidth,
    id,
    name,
    label,
    inputProps,
    value,
    onChange,
    onBlur,
    error,
    helperText,
  } = props;

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const response = await getAllUsers();
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarUsuarios();
  }, []);

  return (
    <FormControl fullWidth={fullWidth} error={error} disabled={loading}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={inputProps}
      >
        <MenuItem value="">
          <em>Selecione um usuário</em>
        </MenuItem>
        {usuarios.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.displayName || user.email}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
