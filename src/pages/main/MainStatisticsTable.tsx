import Table from "../../components/Table";
import { useTypedSelector } from "../../hooks/redux";
import { INote, IStatistics } from "../../types/types";
import { categories } from "../../redux/notes";
import { useMemo } from "react";

const MainStatisticsTable: React.FC = () => {
  const activeNotes = useTypedSelector((store) => store.notesReducer.activeNotes);
  const archivedNotes = useTypedSelector((store) => store.notesReducer.archivedNotes);

  const findNumberOfNotesByCategory = (category: string, store: INote[]): number => {
    let total = 0;
    store.forEach((note) => {
      if (note.category === category) total++;
    });

    return total;
  };

  const statistics = useMemo<IStatistics[]>(() => {
    return categories.map((category) => ({
      category,
      notesNum: findNumberOfNotesByCategory(category, activeNotes),
      archivedNotesNum: findNumberOfNotesByCategory(category, archivedNotes),
    }));
  }, [JSON.stringify(activeNotes), JSON.stringify(archivedNotes)]);

  return <Table type="statistics" data={statistics} />;
};

export default MainStatisticsTable;
