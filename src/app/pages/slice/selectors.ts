import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state ? state.formState || initialState : initialState;

export const selectState = createSelector([selectDomain], state => state);
