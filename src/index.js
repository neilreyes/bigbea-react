import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { debugContextDevtool } from 'react-context-devtool'
const container = document.getElementById("root");

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    container
);

// Attachh root container
debugContextDevtool(container, {
	disable: true
})
