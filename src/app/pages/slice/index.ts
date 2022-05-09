import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { formSaga } from './saga';
import { IFormFields, IFormState } from './types';

export const initialState: IFormState = {
  fields: [],
  response: '',
  loading: false,
};

const slice = createSlice({
  name: 'formState',
  initialState,
  reducers: {
    loadFields(state) {
      state.loading = true;
    },

    fieldsLoaded(state, action: PayloadAction<IFormFields[]>) {
      state.loading = false;
      state.fields = action.payload;
    },

    updateForm(state, action: PayloadAction<{ [key: string]: string }>) {
      state.loading = true;
    },

    formUpdated(state, action: PayloadAction<{ [key: string]: string }>) {
      state.loading = false;
      const newState = [...state.fields];
      for (let i = 0; i < newState.length; i++) {
        newState[i] = {
          ...newState[i],
          value: action.payload[newState[i].fieldName],
        };
      }
      state.fields = newState;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setResponse(state, action: PayloadAction<string>) {
      state.response = action.payload;
    },
  },
});

export const { actions: formActions, reducer } = slice;

export const useFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: formSaga });
  return { actions: slice.actions };
};
