import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { formActions } from './index';

const API_URL = 'https://ulventech-react-exam.netlify.app/api/form';
function* loadForm() {
  try {
    const { data } = yield call(axios.get, API_URL);
    yield put(formActions.fieldsLoaded(data.data));
  } catch (error) {
    yield put(formActions.setLoading(false));
  }
}

function* updateForm(action: PayloadAction<{ [key: string]: string }>) {
  try {
    const { data } = yield call(axios.post, API_URL, action.payload);
    yield put(formActions.formUpdated(data.data));
    yield put(formActions.setResponse(JSON.stringify(data)));
  } catch (error) {
    yield put(formActions.setLoading(false));
  }
}

export function* formSaga() {
  yield takeLatest(formActions.loadFields, loadForm);
  yield takeEvery(formActions.updateForm, updateForm);
}
