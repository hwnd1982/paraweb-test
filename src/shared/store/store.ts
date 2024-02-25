import formReducer from "@/features/form/model/formSlice";
import { configureStore } from "@reduxjs/toolkit";

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