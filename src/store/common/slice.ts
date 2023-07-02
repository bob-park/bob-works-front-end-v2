import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';

const initialState: CommonState = {
  alerts: [
    {
      level: 'info',
      message: 'message',
      createAt: new Date(),
    },
  ],
};

export default createSlice({
  name: 'common',
  initialState,
  reducers,
});
