import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Main } from './components/Main';
import store from './store';

const appElem = document.getElementById('app');
const root = createRoot(appElem as Element);
root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);
