import { useContext, useEffect } from "react";
import Table from "../../components/Table";
import { WindowFormContext } from "../../contexts/contexts";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { loadActiveNotes } from "../../redux/reducers/notesReducer";
import MainStatisticsTable from "./MainStatisticsTable";

const Main: React.FC = () => {
  const activeNotes = useTypedSelector((store) => store.notesReducer.activeNotes);
  const dispatch = useTypedDispatch();
  const setWindowFormState = useContext(WindowFormContext);
  const clickHandler = () => {
    setWindowFormState({ mode: "create" });
  };

  useEffect(() => {
    dispatch(loadActiveNotes());
  }, []);

  return (
    <>
      <Table data={activeNotes} type="activeNotes" />
      <div className="table beet2">
        <button className="table__createNote" onClick={clickHandler}>
          Create Notes
        </button>
      </div>
      <MainStatisticsTable />
    </>
  );
};

export default Main;
