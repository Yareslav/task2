import { dispatchFn, INote } from "../types/types";
import Delete from "../assets/images/delete.png";
import Draw from "../assets/images/draw.png";
import Archive from "../assets/images/archive.png";
import { useContext } from "react";
import { WindowFormContext } from "../contexts/contexts";

interface INoteTableRow extends Omit<INote, "key"> {
  isArchived: boolean;
  searchKey: string;
  deleteHandler: dispatchFn;
  archiveHandler: dispatchFn;
}

const NoteTableRow: React.FC<INoteTableRow> = ({
  category,
  content,
  created,
  dates,
  name,
  isArchived,
  searchKey,
  deleteHandler,
  archiveHandler,
}) => {
  const setWindowFormState = useContext(WindowFormContext);
  const storeType = isArchived ? "archivedNotes" : "activeNotes";

  const editHandler = () => {
    setWindowFormState({
      mode: "edit",
      category,
      name,
      content,
      searchKey,
      storeType: isArchived ? "archivedNotes" : "activeNotes",
    });
  };

  return (
    <div className="table__row notes-grid" style={{ opacity: isArchived ? 0.6 : 1 }}>
      <p>{name}</p>
      <p>{created}</p>
      <p>{category}</p>
      <p className="table__textOverlap">{content}</p>
      <p>{dates || "No"}</p>
      <img src={Delete} onClick={() => deleteHandler({ storeType, key: searchKey })} />
      <img src={Draw} onClick={editHandler} />
      <img src={Archive} onClick={() => archiveHandler({ storeType, key: searchKey })} />
    </div>
  );
};

export default NoteTableRow;
