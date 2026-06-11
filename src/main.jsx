import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry:              1,
      staleTime:          5 * 60 * 1000, // 5 min
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#ffffff',
              color:      '#1f2937',
              border:     '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize:   '14px',
              boxShadow:  '0 4px 12px rgba(0,0,0,0.08)',
            },
            success: { iconTheme: { primary: '#6366f1', secondary: '#ffffff' } },
            error:   { iconTheme: { primary: '#ef4444', secondary: '#ffffff' } },
          }}
        />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);