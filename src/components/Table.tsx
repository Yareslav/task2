import { memo, useContext } from "react";
import { INote, IStatistics } from "../types/types";
import NoteTableRow from "../layout/NoteTableRow";
import Delete from "../assets/images/delete.png";
import Draw from "../assets/images/draw.png";
import Archive from "../assets/images/archive.png";
import { useTypedDispatch } from "../hooks/redux";
import { WindowFormContext } from "../contexts/contexts";
import { deleteNote } from "../redux/reducers/notesReducer";

interface IStatisticsTableProps {
  type: "statistics";
  data: IStatistics[];
}

interface INoteTableProps {
  type: "archivedNotes" | "activeNotes";
  data: INote[];
}

const Table: React.FC<IStatisticsTableProps | INoteTableProps> = ({ type, data }) => {
  const textForEmptyTable: React.ReactNode = data.length === 0 && <h1>Nothing to show</h1>;
  const dispatch = useTypedDispatch();
  const setWindowFormState = useContext(WindowFormContext);

  if (type === "statistics") {
    return (
      <div className="statistics-table table beet2">
        <div className="table__head statistics-grids">
          <p>Category</p>
          <p>Active</p>
          <p>Archived</p>
        </div>
        <div className="table__flow">
          {textForEmptyTable}
          {data.map((elem) => (
            <div key={elem.category} className="table__row statistics-grids">
              <p>{elem.category}</p>
              <p>{elem.notesNum}</p>
              <p>{elem.archivedNotesNum}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const deleteHandler = (key: string): void => {};

  const editHandler = (key: string): void => {};

  const archiveHandler = (key: string): void => {
    dispatch(ar);
  };

  return (
    <div className="active-notes-table beet2 table">
      <div className="table__head notes-grid">
        <p>Name</p>
        <p>Created</p>
        <p>Category</p>
        <p>Content</p>
        <p>Dates</p>
        <img src={Delete} />
        <img src={Draw} />
        <img src={Archive} />
      </div>
      <div className="table__flow">
        {textForEmptyTable}
        {data.map(({ key, ...props }) => (
          <NoteTableRow key={key} {...props} isArchived={type === "archivedNotes"} />
        ))}
      </div>
    </div>
  );
};

export default memo(Table, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});
