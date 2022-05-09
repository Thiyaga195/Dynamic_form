import React, { memo } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { IFormFields } from 'app/pages/slice/types';

interface IFormControlsProps {
  field: IFormFields;
  onChange: (key: string, value: string) => void;
}
export const FormControls = memo(({ field, onChange }: IFormControlsProps) => {
  if (!field) return null;
  const { fieldName = '', type, value, options = [] } = field;

  const handleChange = e => {
    let { name, value } = e.target;
    onChange(name, value);
  };

  switch (type) {
    case 'text':
      return (
        <TextField
          label={fieldName}
          type={type}
          name={fieldName}
          value={value}
          onChange={handleChange}
        />
      );
    case 'email':
      return (
        <TextField
          label={fieldName}
          type={type}
          name={fieldName}
          value={value}
          onChange={handleChange}
        />
      );
    case 'number':
      return (
        <TextField
          label={fieldName}
          type={type}
          name={fieldName}
          value={value}
          onChange={handleChange}
        />
      );
    case 'select':
      return (
        <FormControl fullWidth>
          <InputLabel id="select-label">{fieldName}</InputLabel>
          <Select
            labelId="select-label"
            value={value}
            label={fieldName}
            onChange={handleChange}
          >
            {options.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case 'multiline':
      return (
        <TextField
          label={fieldName}
          type={type}
          name={fieldName}
          value={value}
          onChange={handleChange}
        />
      );
    default:
      throw Error('Invalid Type');
  }
});

export default FormControls;
