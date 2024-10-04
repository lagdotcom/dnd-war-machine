import "./styles/global.scss";
import "./styles/Button.scss";
import "./styles/Dialog.scss";
import "./styles/ListBox.scss";
import "./styles/Modal.scss";
import "./styles/Popover.scss";
import "./styles/Select.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import App from "./components/App";
import { store } from "./state/store";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("app")!);
root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </StrictMode>,
);
