import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import router from "./routes/Route.tsx";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/ui/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider> 
      <Toaster position="top-right" expand={true} richColors />
      <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
