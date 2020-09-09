import React, { useState } from "react";
import XLSX from "xlsx";

import DragDropFile from "./DragDropFile";
import DataInput from "./DataInput";
import OutTable from "./OutTable";

import { make_cols } from "../helpers";

const App = () => {
  const [data, setDate] = useState([]);
  const [cols, setCols] = useState([]);

  const handleFile = (file) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      setDate(data);
      setCols(make_cols(ws["!ref"]));
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <DragDropFile handleFile={handleFile}>
      <div className="row">
        <div className="col-xs-12">
          <DataInput handleFile={handleFile} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <button
            disabled={!data.length}
            className="btn btn-success"
            onClick={() => {}}
          >
            Download
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <OutTable data={data} cols={cols} />
        </div>
      </div>
    </DragDropFile>
  );
};

export default App;
