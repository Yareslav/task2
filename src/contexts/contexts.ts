import { createContext } from "react";
import { FormWindowController } from "../types/types";

export const WindowFormContext = createContext<React.Dispatch<FormWindowController>>(() => {});
