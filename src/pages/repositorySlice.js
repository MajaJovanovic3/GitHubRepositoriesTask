import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRepositoriesFromApi } from '../apiCalls';

const initialState = {
  repositories: [],
  status: 'idle',
  q: '',
  sort: { params: '', order: 'desc' },
  currPage: 1,
  lastPage: 1,
};

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async ({ q, currPage, sort }) => {
    const response = await getRepositoriesFromApi(q, currPage, sort);
    return response;
  },
);

const repositorySlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    changeQ(state, action) {
      const q = action.payload;
      state.q = q;
      state.currPage = 1;
      state.sort = { params: '', order: 'desc' };
    },
    changeCurrPage(state, action) {
      const currPage = action.payload;
      state.currPage = currPage;
    },
    toggleSwitch(state) {
      if (state.sort['order'] === 'asc') state.sort['order'] = 'desc';
      else state.sort['order'] = 'asc';
    },
    sortBy(state, action) { 
        state.sort.params = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        const { repositories, lastPage } = action.payload;
        state.repositories = repositories;
        state.lastPage = Number(lastPage);
        state.status = 'idle';
      });
  },
});

export const { changeQ, changeCurrPage, toggleSwitch, sortBy } = repositorySlice.actions;

export default repositorySlice.reducer;
