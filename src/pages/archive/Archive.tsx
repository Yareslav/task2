import Table from "../../components/Table";
import { useTypedSelector } from "../../hooks/redux";

const Archive: React.FC = () => {
  const archivedNotes = useTypedSelector((store) => store.notesReducer.archivedNotes);

  return <Table type="archivedNotes" data={archivedNotes} />;
};

export default Archive;
