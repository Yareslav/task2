import { useEffect } from "react";
import Table from "../../components/Table";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { loadActiveNotes } from "../../redux/reducers/notesReducer";
import MainStatisticsTable from "./MainStatisticsTable";

const Main: React.FC = () => {
  const activeNotes = useTypedSelector((store) => store.notesReducer.activeNotes);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(loadActiveNotes());
  }, []);

  return (
    <>
      <Table data={activeNotes} type="activeNotes" />
      <div className="table beet2">
        <button className="table__createNote">Create Notes</button>
      </div>
      <MainStatisticsTable />
    </>
  );
};

export default Main;
