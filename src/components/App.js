import React, { useState } from "react";
import XLSX from "xlsx";

import DragDropFile from "./DragDropFile";
import DataInput from "./DataInput";

import {
  TitleContainer,
  DescriptionContainer,
  SectionContainer,
  DownloadButton,
} from "./shared-components";
import { filterData, generateTableFractionContent } from "../helpers";

const App = () => {
  const [data, setData] = useState([]);

  const generateHtmlFile = (data, index) => {
    const element = document.createElement("a");
    const file = new Blob([generateTableFractionContent(data)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `GeneratedFile_${index}.html`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleFile = (file) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

      wb.SheetNames.forEach((sheet, index) => {
        /* Get the current worksheet */
        const ws = wb.Sheets[sheet];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        /* Update state */
        setData(data);

        const filteredData = filterData(data);
        generateHtmlFile(filteredData, index);
      });
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <TitleContainer>Excel - HTML Table Fraction Converter</TitleContainer>
      <DescriptionContainer>
        Please upload or drag and drop your excel file (in .xlsx format)
      </DescriptionContainer>
      <DragDropFile handleFile={handleFile}>
        <SectionContainer>
          <DataInput handleFile={handleFile} />
        </SectionContainer>
      </DragDropFile>
    </>
  );
};

export default App;
