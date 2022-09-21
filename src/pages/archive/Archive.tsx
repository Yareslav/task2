import { useEffect } from "react";
import Table from "../../components/Table";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { loadArchivedNotes } from "../../redux/reducers/notesReducer";

const Archive: React.FC = () => {
  const archivedNotes = useTypedSelector((store) => store.notesReducer.archivedNotes);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(loadArchivedNotes());
  }, []);

  return <Table type="archivedNotes" data={archivedNotes} />;
};

export default Archive;
