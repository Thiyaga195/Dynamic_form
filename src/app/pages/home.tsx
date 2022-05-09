import { Box, Button, CircularProgress } from '@mui/material';
import FormControls from 'app/components/FormControl';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  formItemStyle,
  buttonStyle,
  PrograsBarStyle,
  ShowResponseStyle,
  HeadStyle,
} from './HomeStyle';
import { useFormSlice } from './slice';
import { selectState } from './slice/selectors';
import { IFormFields } from './slice/types';

export const HomePage = () => {
  const { actions } = useFormSlice();
  let dispatch = useDispatch();
  const { fields = [], response, loading } = useSelector(selectState);
  console.log(fields);
  const [state, setState] = useState<IFormFields[]>(fields);

  useEffect(() => {
    dispatch(actions.loadFields());
  }, [dispatch]);

  useEffect(() => {
    setState(fields);
  }, [fields]);

  const handleSubmit = e => {
    const payload = {};
    for (let field of state) {
      payload[field.fieldName] = field.value;
    }
    dispatch(actions.updateForm(payload));
  };

  const handleChange = (key, value) => {
    const updateState = [...state];
    for (let i = 0; i < updateState.length; i++) {
      if (updateState[i].fieldName === key) {
        updateState[i] = { ...updateState[i], value };
        break;
      }
    }
    setState(updateState);
  };
  return (
    <>
      <Box sx={HeadStyle}>Logo</Box>
      <Box sx={formItemStyle}>
        <h3>Edit Form details:</h3>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '99%' } }}
        >
          {state &&
            state.map(field => (
              <FormControls
                field={field}
                key={field.fieldName}
                onChange={handleChange}
              />
            ))}
          <Box sx={buttonStyle}>
            <Button variant="contained" onClick={handleSubmit} color="primary">
              Update
            </Button>
          </Box>
        </Box>

        {loading && (
          <Box sx={PrograsBarStyle}>
            <CircularProgress />
          </Box>
        )}
      </Box>

      <Box sx={ShowResponseStyle}>{response}</Box>
    </>
  );
};
