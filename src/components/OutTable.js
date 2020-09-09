import React from "react";

import { filterData } from "../helpers";

const OutTable = ({ data, cols }) => {
  const columns = data[0] ? data[0].slice(0, 5) : [];
  console.log(columns);
  console.log(data);
  const filteredData = filterData(data);
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((r, i) => (
            <tr key={i}>
              {cols.map((c) => (
                <td key={c.key}>{r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutTable;
