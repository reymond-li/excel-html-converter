import React from "react";

import { FormContainer, InputLabel, InputContainer } from "./shared-components";
import { SheetJSFT } from "../helpers";

const DataInput = (props) => {
  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      props.handleFile(files[0]);
    }
  };

  return (
    <FormContainer>
      <InputLabel htmlFor="file">Spreadsheet</InputLabel>
      <InputContainer
        type="file"
        className="form-control"
        id="file"
        accept={SheetJSFT}
        onChange={handleChange}
      />
    </FormContainer>
  );
};

export default DataInput;
