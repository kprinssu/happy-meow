import { createRoot } from 'react-dom/client';
import { Main } from './Main';

const appElem = document.getElementById('app');
const root = createRoot(appElem);
root.render(<Main />);
