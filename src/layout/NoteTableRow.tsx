import { INote } from "../types/types";
import Delete from "../assets/images/delete.png";
import Draw from "../assets/images/draw.png";
import Archive from "../assets/images/archive.png";

interface INoteTableRow extends Omit<INote, "key"> {
  isArchived: boolean;
}

const NoteTableRow: React.FC<INoteTableRow> = ({ category, content, created, dates, name, isArchived }) => {
  return (
    <div className="table__row notes-grid" style={{ opacity: isArchived ? 0.6 : 1 }}>
      <p>{name}</p>
      <p>{created}</p>
      <p>{category}</p>
      <p className="table__textOverlap">{content}</p>
      <p>{dates || "No"}</p>
      <img src={Delete} />
      <img src={Draw} />
      <img src={Archive} />
    </div>
  );
};

export default NoteTableRow;
