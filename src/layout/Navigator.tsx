import { NavLink, useMatch } from "react-router-dom";

const Navigator: React.FC = () => {
  const getClassName = (isActive: object | null): string => {
    return `navigator__link${isActive ? " navigator-selected" : ""}`;
  };

  return (
    <div className="navigator">
      <NavLink to="/" className={getClassName(useMatch("/"))}>
        Main
      </NavLink>
      <p>/</p>
      <NavLink className={getClassName(useMatch("/archive"))} to="/archive">
        Archived
      </NavLink>
    </div>
  );
};

export default Navigator;
