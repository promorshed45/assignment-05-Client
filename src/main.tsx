import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/Route.tsx";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
   
      <Toaster position="top-right" expand={true} richColors/>
      <RouterProvider router={router} />
    
  </React.StrictMode>
);
