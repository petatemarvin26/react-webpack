import {createRoot} from 'react-dom/client';

import App from '../src/App';

const root = document.getElementById('root') as HTMLElement;
const contaienr = createRoot(root);

contaienr.render(<App />);
