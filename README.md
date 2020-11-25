## configureStore

- 1.自动合并传入的所有 reducer 到 root reducer
- 2.返回一个使用 root reducer 的 store
- 3.已集成 thunk, Redux Revtools, 检查常见错误的中间件 等等

## createSlice

- 四个主要参数：name, initialState, reducers, extraReducers
- 返回值：
  {
  actions: {xxFn: ƒ}
  caseReducers: {xxFn: ƒ}
  name: "xxx"
  reducer: ƒ (state, action)
  }

- 自动根据 reducers 生成 action creators
- 自动返回 state (参考官方 demo, reducers 中的函数不需要 return，也能正确运行)
- 能用对象链式(a.b.c.d = "xxx")的方式修改数据 (内部用的技术 Proxy )

## createAsyncThunk

- 两个参数
  参数 1： action type 如 "todos/add"
  参数 2： 异步函数。 通常用 async/await. 返回的值会注入到 action.payload 中。

- 可以添加 extraReducers ，addCase 。
  有三种状态 pending, fulfilled, rejected

## createEntityAdapter

- 返回一个 “adapter” 对象：
  addMany: ƒ operation(state, arg)
  addOne: ƒ operation(state, arg)
  getInitialState: ƒ getInitialState(additionalState)
  getSelectors: ƒ getSelectors(selectState)
  removeAll: ƒ operation(state)
  removeMany: ƒ operation(state, arg)
  removeOne: ƒ operation(state, arg)
  selectId: ƒ selectId(instance)
  setAll: ƒ operation(state, arg)
  sortComparer: false
  updateMany: ƒ operation(state, arg)
  updateOne: ƒ operation(state, arg)
  upsertMany: ƒ operation(state, arg)
  upsertOne: ƒ operation(state, arg)

- adapter.getInitialState 返回一个类似 { ids: [], entities: {} } 的对象
- adapter.getSelectors 生成一组标准的选择器功能

## 异步执行顺序(对标 es6 Promise 状态)

xxx.pending -> async 过程(promise) -> xxx.fulfilled or xxxx.rejected (二选一)

## 派发 action 时的参数个数

同步：

- 多个参数：dispatch(syncFn(a, b,..., c)) 需要 prepare 配合
- 一个参数：对象形式。

  异步：只能一个参数：dispatch(asyncFn({a, b, ..., c}))

## 不同的 slice 处理同一个 action 的时候，执行顺序跟什么有关？

根据在 store.js 中对象的前后顺序，比如处理{aReducer, bReducer}，aSlice xxxx.pending 先于 bSlice xxx.pending
