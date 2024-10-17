import '@/global.css'

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from './components/theme/theme-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { Toaster } from 'sonner'

export function App(){
  return (
    <ThemeProvider storageKey="shop-theme" defaultTheme="dark">
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
