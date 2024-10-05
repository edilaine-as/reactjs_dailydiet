import '@/global.css'

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from './components/theme/theme-provider';

export function App(){
  return (
    <ThemeProvider storageKey="shop-theme" defaultTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
