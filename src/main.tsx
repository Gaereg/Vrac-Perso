import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App.tsx'
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AlertProvider from "@contexts/Alert/AlertProvider.tsx";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AlertProvider>
  </StrictMode>
);
