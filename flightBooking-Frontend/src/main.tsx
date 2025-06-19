import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </HelmetProvider>
  </StrictMode>
);
