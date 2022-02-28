import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type NotifyPayload = {
  status: 'unknown' | 'normal' | 'warning' | 'critical';
  message: string;
}

export interface NotificationState extends NotifyPayload {
  visible: boolean;
}

const initialState: NotificationState = {
  visible: false,
  status: 'unknown',
  message: 'Something went wrong.'
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    notify: (state, action: PayloadAction<NotifyPayload>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        ...state,
        ...action.payload,
        visible: true,
      }
    },
    close: (state) => {
      state.visible = false;
    },
  },
});

export const { notify, close } = notificationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNotification = (state: RootState) => state.notification;

export default notificationSlice.reducer;
