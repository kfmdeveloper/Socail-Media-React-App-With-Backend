import React from "react";
import "./App.css";
import Body from "./Body";
import { MantineProvider } from "@mantine/core";
const App = () => {
  return (
    <MantineProvider>
      <div className="App">
        <Body />
      </div>
    </MantineProvider>
  );
};

export default App;
