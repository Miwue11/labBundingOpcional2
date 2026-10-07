import { createRoot } from 'react-dom/client';
import { App } from './app';
import './styles.scss';

console.log('Valor de MY_VARIABLE:', process.env.MY_VARIABLE);

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
