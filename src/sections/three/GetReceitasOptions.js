import React, { useEffect, useState } from 'react';
import { getAllReceitas } from './crud';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';

export default function GetReceitasOptions(props) {
  const {
    onSelect,
    id,
    name,
    label,
    value,
    onChange,
    onBlur,
    error,
    helperText,
    fullWidth,
    inputProps,
  } = props;

  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarReceitas = async () => {
      try {
        const response = await getAllReceitas();
        setReceitas(response.data);
      } catch (error) {
        console.error('Erro ao carregar receitas:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarReceitas();
  }, []);

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    const receita = receitas.find(r => r.id === selectedId);
    if (onSelect && receita) {
      onSelect(receita);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <FormControl fullWidth={fullWidth} error={error} disabled={loading}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={handleSelect}
        onBlur={onBlur}
        inputProps={inputProps}
      >
        <MenuItem value="">
          <em>Selecione uma receita</em>
        </MenuItem>
        {receitas.map((receita) => (
          <MenuItem key={receita.id} value={receita.id}>
            {receita.nomeReceita}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
