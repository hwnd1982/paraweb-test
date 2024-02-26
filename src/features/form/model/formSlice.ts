import { AnyAction, createAsyncThunk, createSlice, ThunkDispatch } from "@reduxjs/toolkit";
import { mockAxios } from "@/shared/mock/mock";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { RootState } from "@/shared/store/store";
import { FieldProps } from "./utils";

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
);

export const sendFormData = createAsyncThunk(
  'form/sendFormData',
  async (data: { [key: string]: string }) => {
    try {
      const { data: date } = await mockAxios.post('/api/registration', data);
      const responseData: { [key: string]: string } = {};

      for (const key in data) {
        if (!key.includes('confirm') && !key.includes('password')) {
          responseData[key] = data[key];
        }
      }

      return { date, data: responseData };
    } catch (err) {
      console.warn(err);
    }
  }
);

const initialState: {
  fields: FieldProps[]
  data: {}
  date: string
  loading: boolean
  error: null | unknown
} = {
  fields: [],
  data: {},
  date: '',
  loading: false,
  error: null
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resend: (state) => {
      state.date = '';
    }
  },
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
      .addCase(sendFormData.pending, (state) => {
        state.loading = true;
        state.data = {};
        state.date = '';
        state.error = null;
      })
      .addCase(sendFormData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data || {};
        state.date = action.payload?.date || '';
        state.error = null;
      })
      .addCase(sendFormData.rejected, (state, action) => {
        state.loading = false;
        state.data = {};
        state.date = '';
        state.error = action.payload;
      })
  }
});

export const { resend } = formSlice.actions;

export default formSlice.reducer;