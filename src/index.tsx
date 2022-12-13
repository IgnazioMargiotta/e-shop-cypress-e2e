import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/state/store';
import { Main } from './app/main';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root')!;
const root = createRoot(container);

const persistor = persistStore(store)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
