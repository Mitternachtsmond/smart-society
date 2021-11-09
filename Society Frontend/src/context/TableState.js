import TableContext from "./TableContext";

const TableState = (props) => {
  const state = {
    name: "Nishit",
  };

  return (
    <TableContext.Provider value={state}>props.children</TableContext.Provider>
  );
};
export default TableState;
