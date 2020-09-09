import XLSX from "xlsx";

export /* list of supported file types */
const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm",
]
  .map(function (x) {
    return "." + x;
  })
  .join(",");

/* generate an array of column objects */
export const make_cols = (refstr) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

const removeExtraColumns = (row) => row.slice(0, 5);

export const filterData = (data) => {
  if (!data || !data.length) return [];

  const colNumber = data[0].length;

  // Remove 1st row which is the column name
  data = data.slice(1);

  if (colNumber > 5) {
    return data.map((row) => removeExtraColumns(row));
  }

  return data;
};
