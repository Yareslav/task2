import { INotePosition } from "../redux/reducers/notesReducer";

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

interface ICreateMode {
  mode: "create";
}

interface IEditMode extends Pick<INote, "category" | "content" | "name"> {
  storeType: INotePosition["storeType"];
  mode: "edit";
  searchKey: string;
}

interface IDisabled {
  mode: "disabled";
}

export type FormWindowProps = ICreateMode | IEditMode;
export type FormWindowController = ICreateMode | IEditMode | IDisabled;

export type dispatchFn = (props: INotePosition) => void;
