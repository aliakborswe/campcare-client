import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isCollapsed: boolean;
};

const initialState: InitialState = {
  isCollapsed: false,
};

const dashboardSidebarSlice = createSlice({
  name: "dashboardSidebar",
  initialState,
  reducers: {
    toggleSidebarCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export default dashboardSidebarSlice.reducer;
export const { toggleSidebarCollapse } = dashboardSidebarSlice.actions;
