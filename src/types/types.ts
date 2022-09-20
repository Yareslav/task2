import { AnyAction } from "redux";
import { StoreState } from "../redux/store";
import { ThunkAction } from "redux-thunk";

export interface INote {
  name: string;
  category: string;
  readonly created: string;
  content: string;
  dates: string;
  readonly key: string;
}

export interface IStatistics {
  category: string;
  archivedNotesNum: number;
  notesNum: number;
}

export type ThunkType = ThunkAction<void, StoreState, unknown, AnyAction>;
