import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";

/* create initialState */
const todosAdapter = createEntityAdapter();

const todosInitialState = todosAdapter.getInitialState({
  extra: "extra value"
});

const namesAdapter = createEntityAdapter();

const namesInitialState = namesAdapter.getInitialState({
  extra: "extra value"
});

const initialState = {
  todos: todosInitialState,
  names: namesInitialState
};

/* mock async */
function succesPromise() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

function fatelPromise() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject("Error");
    }, 2000);
  });
}

/* create async action */
export const todoAsyncAdded = createAsyncThunk(
  "todos/asyncAdded", // 字面量没必要枚举了，这里的函数就是枚举的意义了
  async item => {
    const { inputVal: value, color } = item;

    await succesPromise(); // 可卸载参数发送请求

    return { value, color };
  }
);

export const todoAsyncRejectd = createAsyncThunk(
  "todos/asyncRejectd",
  async () => {
    return fatelPromise();
  }
);

/**
 * create action / reducer
 * @param {name, initialState, reducers}
 */
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    /* 需要预处理的格式：  对象，里面 reducer  prepare 函数 */
    todoAdded: {
      reducer(state, action) {
        const { value, color } = action.payload;
        const length = state.todos.ids.length;
        const id = length ? state.todos.ids[length - 1] + 1 : 0; // mock id
        todosAdapter.addOne(state.todos, { id, value, color });
        // todosAdapter.addMany(state.todos, [{ id, value, color }]);
      },
      prepare(value, color) {
        /* 预处理 action ：payload 格式，内容*/
        return {
          payload: {
            value: color === "red" ? `${value}(urgent)` : value,
            color
          }
        };
      }
    },
    /* 最简单的 reducer */
    todoDeleted(state, action) {
      todosAdapter.removeOne(state.todos, action.payload);
      // todosAdapter.removeMany(state.todos, [action.payload]);
    }
  },
  extraReducers: builder => {
    builder
      /* type: "todos/asyncAdded/fulfilled" */
      .addCase(todoAsyncAdded.fulfilled, (state, action) => {
        const { value, color } = action.payload;
        const length = state.todos.ids.length;
        const id = length ? state.todos.ids[length - 1] + 1 : 0; // mock id
        todosAdapter.addOne(state.todos, {
          id,
          value: color === "red" ? `${value}(urgent)` : value,
          color
        });
      })
      .addCase(todoAsyncRejectd.rejected, (state, actio) => {
        console.error("todoSlice rejected!");
      });
  }
});

/*  actions */
export const { todoAdded, todoDeleted } = todosSlice.actions;
// console.log(todoToggled(33)); // {type: "todos/todoToggled", payload: 33}

/* reducer */
export default todosSlice.reducer;

/* selector */
export const {
  selectAll: todosSelectAll, // state => state.todosReducer.todos.entities
  selectById: todosSelectById
} = todosAdapter.getSelectors(state => state.todosReducer.todos);

export const selectTodos = createSelector(todosSelectAll, todos => todos);
