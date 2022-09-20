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

interface NotePosition {
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
    deleteNote: (state, { payload: { storeType, key } }: PayloadAction<NotePosition>) => {
      const removedItemIndex = findIndex(state[storeType], key);
      if (removedItemIndex < 0) return;

      state[storeType].splice(removedItemIndex, 1);
      saveDataToStorage(storeType, state[storeType]);
    },

    editNote: (state, { payload }: PayloadAction<NotePosition & Omit<INote, "id" | "created">>) => {
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

    loadActiveNotes: (state) => {
      const data = getDataFromStorage("activeNotes");
      state.activeNotes = data.length === 0 ? notes : data;
    },

    loadArchivedNotes: (state) => {
      state.archivedNotes = getDataFromStorage("archivedNotes");
    },
  },
});

export const { deleteNote, editNote, createNote, loadActiveNotes, loadArchivedNotes } = notesReducer.actions;

export default notesReducer.reducer;
