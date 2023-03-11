import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./components/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ChakraProvider>
);
