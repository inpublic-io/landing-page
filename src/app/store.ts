import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { twitterAPI, rtkQueryErrorLogger } from '../features/twitter/api';
import { notificationSlice } from '../features/notification';

export const store = configureStore({
  reducer: {
    [twitterAPI.reducerPath]: twitterAPI.reducer,
    [notificationSlice.name]: notificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    twitterAPI.middleware,
    rtkQueryErrorLogger
  ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
