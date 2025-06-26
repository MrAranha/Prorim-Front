import React, { useEffect, useState } from 'react';
import { getAllLaudos } from './crud';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';

export default function GetLaudosOptions(props) {
  const {
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
    onSelect,
  } = props;

  const [laudos, setLaudos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarLaudos = async () => {
      try {
        const response = await getAllLaudos();
        setLaudos(response.data);
      } catch (error) {
        console.error('Erro ao carregar laudos:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarLaudos();
  }, []);

  const handleSelect = (event) => {
    const selected = event.target.value;
    const laudo = laudos.find((l) => l.id === selected);
    if (onSelect && laudo) {
      onSelect(laudo);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormControl fullWidth={fullWidth} error={error} disabled={loading}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        value={value}
        onChange={handleSelect}
        onBlur={onBlur}
        label={label}
        inputProps={inputProps}
      >
        <MenuItem value="">
          <em>Selecione um laudo</em>
        </MenuItem>
        {laudos.map((laudo) => (
          <MenuItem key={laudo.id} value={laudo.id}>
            {laudo.nomeArquivo || laudo.nomeMedico}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
