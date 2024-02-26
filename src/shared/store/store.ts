import formReducer from "@/features/form/model/formSlice";
import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";

const reducer = {
  form: formReducer
};

const setupStore = () => configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAsyncThunk & AnyAction>