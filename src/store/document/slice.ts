import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import { DocumentsState } from './types';

const initialState: DocumentsState = {
  isLoading: false,
  types: [],
  pagable: {
    total: 0,
  },
};

export default createSlice({
  name: 'document',
  initialState,
  reducers,
});
