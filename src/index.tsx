import ReactDOM from 'react-dom/client';

import App from 'App';

const body = document.getElementById('root') as HTMLDivElement;
const container = ReactDOM.createRoot(body);

container.render(<App />);
