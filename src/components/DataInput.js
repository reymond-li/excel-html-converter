import React from "react";

import { SheetJSFT } from "../helpers";

const DataInput = (props) => {
  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      props.handleFile(files[0]);
    }
  };

  return (
    <form className="form-inline">
      <div className="form-group">
        <label htmlFor="file">Spreadsheet</label>
        <input
          type="file"
          className="form-control"
          id="file"
          accept={SheetJSFT}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default DataInput;
