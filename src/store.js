import { configureStore } from '@reduxjs/toolkit';

import repositoryReducer from './pages/repositorySlice';

const store = configureStore({
  reducer: {
    repository: repositoryReducer,
  },
});

export default store;
