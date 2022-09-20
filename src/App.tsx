import React from "react";
import "./assets/style/style.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Archive from "./pages/archive/Archive";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navigator from "./layout/Navigator";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigator />
        <Routes>
          <Route element={<Main />} path="/" />
          <Route element={<Archive />} path="/archive" />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
