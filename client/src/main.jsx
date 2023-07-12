import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { ChakraProvider } from "@chakra-ui/react"
import { io } from "socket.io-client"

const connection = io("http://192.168.1.3:5000", { autoConnect: false })
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <App connectionObj={connection} />
    </ChakraProvider>
  </React.StrictMode>
)
