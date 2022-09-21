import React, { useContext, useMemo, useState } from "react";
import { WindowFormContext } from "../contexts/contexts";
import { useTypedDispatch } from "../hooks/redux";
import { categories } from "../redux/notes";
import { createNote, editNote } from "../redux/reducers/notesReducer";
import { FormWindowProps } from "../types/types";
import formatDate from "../utils/formatDate";
import generateKey from "../utils/generateKey";
import highlightDate from "../utils/highlightDate";

type BtnEvent = React.MouseEvent<HTMLButtonElement>;

const Form: React.FC<FormWindowProps> = (props) => {
  const [name, setName] = useState(props.mode === "edit" ? props.name : "");
  const [content, setContent] = useState(props.mode === "edit" ? props.content : "");
  const [category, setCategory] = useState(props.mode === "edit" ? props.category : categories[0]);
  const [errors, setErrors] = useState({
    name: false,
    content: false,
  });

  const dispatch = useTypedDispatch();
  const setWindowFormState = useContext(WindowFormContext);

  const submitHandler = (eve: BtnEvent) => {
    eve.preventDefault();
    eve.stopPropagation();

    errors.name = !(name.length > 5);
    errors.content = !(content.length > 10);
    setErrors({ ...errors });

    if (errors.name || errors.content) return;
    if (props.mode === "create") {
      dispatch(
        createNote({
          name,
          content,
          category,
          dates: highlightDate(content),
          key: generateKey(),
          created: formatDate(new Date()),
        })
      );
    } else {
      dispatch(
        editNote({
          name,
          category,
          dates: highlightDate(content),
          content,
          storeType: props.storeType,
          key: props.searchKey,
        })
      );
    }

    setWindowFormState({ mode: "disabled" });
  };

  const closeHandler = (eve: BtnEvent) => {
    eve.preventDefault();
    eve.stopPropagation();
    setWindowFormState({ mode: "disabled" });
  };

  const closeByClickingOutside = (eve: React.MouseEvent<HTMLDivElement>) => {
    if ((eve.target as Element).isEqualNode(eve.currentTarget as Element)) {
      setWindowFormState({ mode: "disabled" });
    }
  };

  return (
    <div className="form center" onClick={closeByClickingOutside}>
      <form className="beet2">
        <h2>{props.mode === "edit" ? "Edit Note" : "create Note"}</h2>

        <div className="form__block">
          <label>Name</label>
          <input type="text" id="name-input" value={name} onChange={(eve) => setName(eve.target.value)} />
        </div>
        {errors.name && <h2 className="form__error">Name must have minimum 4 letters length</h2>}

        <div className="form__block">
          <label>Content</label>
          <textarea id="content-input" onChange={(eve) => setContent(eve.target.value)} value={content} />
        </div>
        {errors.content && <h2 className="form__error">Content must have minimum 10 letters length</h2>}

        <div className="form__block">
          <label>Category</label>
          <select id="category-input" value={category} onChange={(eve) => setCategory(eve.target.value)}>
            {categories.map((elem) => (
              <option value={elem} key={elem}>
                {elem}
              </option>
            ))}
          </select>
        </div>

        <div className="form__controls beet">
          <button type="submit" onClick={submitHandler}>
            Submit
          </button>
          <button onClick={closeHandler}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
