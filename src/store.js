import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./features/app/appSlice";
import todosReducer from "./features/todos/todoSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    todosReducer
  }
});

export default store;
