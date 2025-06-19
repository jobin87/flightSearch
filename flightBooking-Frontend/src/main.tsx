import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux'; // ✅ Import Provider
import App from './App';
import { store } from './store'; // ✅ Adjust if your store path is different

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}> {/* ✅ Wrap App */}
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
