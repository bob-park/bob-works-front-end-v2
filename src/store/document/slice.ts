import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';

const initialState: DocumentsState = {
  isLoading: false,
};

export default createSlice({
  name: 'document',
  initialState,
  reducers,
});
