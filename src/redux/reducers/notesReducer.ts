import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INote } from "../../types/types";
import notes from "../notes";

interface IState {
  activeNotes: INote[];
  archivedNotes: INote[];
}

const initialState: IState = {
  activeNotes: [],
  archivedNotes: [],
};

export interface INotePosition {
  storeType: keyof IState;
  key: string;
}

const findIndex = (store: Array<INote>, key: string): number => {
  return store.findIndex((elem) => elem.key === key);
};

const saveDataToStorage = (type: keyof IState, data: INote[]) => {
  localStorage.setItem(type, JSON.stringify(data));
};

const getDataFromStorage = (type: keyof IState): INote[] => {
  return JSON.parse(localStorage.getItem(type) || "[]");
};

const notesReducer = createSlice({
  name: "notesReducer",
  initialState,
  reducers: {
    deleteNote: (state, { payload: { storeType, key } }: PayloadAction<INotePosition>) => {
      const removedItemIndex = findIndex(state[storeType], key);
      if (removedItemIndex < 0) return;

      state[storeType].splice(removedItemIndex, 1);
      saveDataToStorage(storeType, state[storeType]);
    },

    editNote: (state, { payload }: PayloadAction<INotePosition & Omit<INote, "key" | "created">>) => {
      const note = state[payload.storeType].find((elem) => elem.key === payload.key);
      if (!note) return;

      note.category = payload.category;
      note.name = payload.name;
      note.content = payload.content;
      note.dates = payload.dates;

      saveDataToStorage(payload.storeType, state[payload.storeType]);
    },

    createNote: (state, { payload }: PayloadAction<INote>) => {
      state.activeNotes.push(payload);
      saveDataToStorage("activeNotes", state.activeNotes);
    },

    archiveOrUnarchiveNote: (state, { payload: { storeType, key } }: PayloadAction<INotePosition>) => {
      const removedItemIndex = findIndex(state[storeType], key);

      if (removedItemIndex < 0) return;

      const note: INote = state[storeType].splice(removedItemIndex, 1)[0];

      const anotherStoreName = storeType === "activeNotes" ? "archivedNotes" : "activeNotes";
      state[anotherStoreName].push(note);

      saveDataToStorage("activeNotes", state["activeNotes"]);
      saveDataToStorage("archivedNotes", state["archivedNotes"]);
    },

    loadActiveNotes: (state) => {
      const data = getDataFromStorage("activeNotes");
      state.activeNotes = data.length === 0 ? notes : data;
    },

    loadArchivedNotes: (state) => {
      state.archivedNotes = getDataFromStorage("archivedNotes");
    },
  },
});

export const { deleteNote, editNote, createNote, loadActiveNotes, loadArchivedNotes, archiveOrUnarchiveNote } =
  notesReducer.actions;

export default notesReducer.reducer;
