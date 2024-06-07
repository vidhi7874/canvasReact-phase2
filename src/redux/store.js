import { configureStore, createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: { responseData: '', figmaLink: '', node_Data: '' },
  reducers: {
    setFigmaLinkUrl: (state, action) => {
      state.figmaLink = action.payload;
    },
    setData: (state, action) => {
      state.responseData = action.payload;
    },
    nodeData: (state, action) => {
      state.node_Data = action.payload;
    },
  },
});

export const { setData, setFigmaLinkUrl, nodeData } = dataSlice.actions;

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export default store;
