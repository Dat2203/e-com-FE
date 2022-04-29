import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CartReducer from "./CartRedux";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import UserReducer from "./UserRedux";
import NotificationReducer from "./NotiRedux";
import ProductReducer from "./ProductRedux";

const persistConfig = {
  key: "root",
  storage,
};
const appReducer = combineReducers({
  user: UserReducer,
  cart: CartReducer,
  notification: NotificationReducer,
  product: ProductReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    //clear redux persist state
    Object.keys(state).forEach((key) => {
      storage.removeItem(`persist:${key}`);
    });
    //clear state
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
