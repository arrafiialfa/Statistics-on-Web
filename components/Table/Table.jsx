import { useState, useEffect } from "react";
import Calculator from "../../lib/Table";
import toInteger from "../../lib/textareaToArrayInteger";
import Row from "./Row";

const Table = () => {
  const [xValue, setXValue] = useState("");
  const [yValue, setYValue] = useState("");
  const [isGenerated, setTable] = useState(false);

  const [row, setRow] = useState([]);
  const [rowSum, setRowSum] = useState([]);

  function handleChangeX(e) {
    setXValue(e.target.value);
  }

  function handleChangeY(e) {
    setYValue(e.target.value);
  }

  function handleClick() {
    const x = toInteger(xValue);
    const y = toInteger(yValue);

    const table1 = new Calculator(x, y);

    setRow(table1.getTable());
    setRowSum(table1.getTableSum());

    setTable(true);
  }

  function createRow(array) {
    return <Row key={Math.random()} array={array} />;
  }

  return (
    <div className="text-center">
      <label className="" htmlFor="xColumn">
        X
      </label>
      <textarea
        className="w-36 h-52 border-2 border-blue-500 "
        value={xValue}
        onChange={handleChangeX}
        placeholder="input X here"
        name="xColumn"
      />

      <label className="" htmlFor="yColumn">
        Y
      </label>
      <textarea
        className=" w-36 h-52 border-2 border-blue-500 mx-2"
        value={yValue}
        onChange={handleChangeY}
        placeholder="Input Y here"
        name="yColumn"
      />

      <div className="mx-auto text-center my-7">
        <button
          className="btn btn-primary bg-blue-700 text-white rounded-md p-2 hover:bg-blue-800"
          onClick={handleClick}
        >
          Generate Table
        </button>
      </div>
      {isGenerated && (
        <div className="overflow-x-auto  ">
          <table className="table-auto text-center w-max mx-auto">
            <thead>
              <tr className="bg-green-200 ">
                <th className="px-12 py-1 ">X</th>
                <th className="px-12 py-1 ">Y</th>
                <th className="px-12 py-1 ">X&sup2;</th>
                <th className="px-12 py-1 ">Y&sup2;</th>
                <th className="px-12 py-1 ">XY</th>
                <th className="px-12 py-1 ">X Deviation&sup2;</th>
                <th className="px-12 py-1 ">Y Deviation&sup2;</th>
                <th className="px-12 py-1 ">Product Deviation</th>
              </tr>
            </thead>
            <tbody>
              {row.map((array) => {
                return <Row key={Math.random()} array={array} />;
              })}

              <tr>
                <td className=" ">Sum</td>
              </tr>
              <tr className="bg-blue-800 text-white">
                {rowSum.map((item) => {
                  return <td key={Math.random() + Math.random()}>{item}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
