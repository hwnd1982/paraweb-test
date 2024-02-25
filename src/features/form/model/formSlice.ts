import { AnyAction, createAsyncThunk, createSlice, ThunkDispatch } from "@reduxjs/toolkit";
import { mockAxios } from "@/app/mock/mock";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { RootState } from "@/shared/store/store";
import { FieldProps } from "./utils";

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAsyncThunk & AnyAction>

export const getFormData = createAsyncThunk(
  'form/getFormData',
  async () => {
    try {
      const { data } = await mockAxios.get('/api/form');

      return data;
    } catch (err) {
      console.warn(err);
    }
  }
)

const initialState: {
  fields: FieldProps[]
  loading: boolean
  error: null | unknown
} = {
  fields: [],
  loading: false,
  error: null
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFormData.pending, (state) => {
        state.fields = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(getFormData.fulfilled, (state, action) => {
        state.fields = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getFormData.rejected, (state, action) => {
        state.fields = [];
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default formSlice.reducer;