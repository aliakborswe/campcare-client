import { configureStore } from "@reduxjs/toolkit";
import dashboardSidebarSlice from "@/features/dashboard/sidebarSlice";

const store = configureStore({
  reducer: {
    dashboardSidebar: dashboardSidebarSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.MODE === "development",
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
