import React, { useState } from "react";
import "./assets/style/style.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Archive from "./pages/archive/Archive";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navigator from "./layout/Navigator";
import { FormWindowController } from "./types/types";
import Form from "./components/Form";
import { WindowFormContext } from "./contexts/contexts";

const App: React.FC = () => {
  const [windowFormState, setWindowFormState] = useState<FormWindowController>({
    mode: "disabled",
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigator />
        <WindowFormContext.Provider value={setWindowFormState}>
          <Routes>
            <Route element={<Main />} path="/" />
            <Route element={<Archive />} path="/archive" />
          </Routes>

          {windowFormState.mode !== "disabled" && <Form {...windowFormState} />}
        </WindowFormContext.Provider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
