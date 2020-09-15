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

const ExcelDateToJSDate = (serial) => {
  if (typeof serial === "string") {
    return serial.trim();
  }
  var utc_days = Math.floor(serial - 25569);
  var utc_value = (utc_days + 1) * 86400;
  var date_info = new Date(utc_value * 1000);

  var fractional_day = serial - Math.floor(serial) + 0.0000001;

  var total_seconds = Math.floor(86400 * fractional_day);

  var seconds = total_seconds % 60;

  total_seconds -= seconds;

  let fullTime = new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate()
  ).toString();
  let fullTimeArray = fullTime.split(" ").slice(1, 4);
  return `${fullTimeArray[0]} ${fullTimeArray[1]}, ${fullTimeArray[2]}`;
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

const isValidRow = (row) => {
  return (
    row.length > 0 &&
    row[0] !== "Total" &&
    row[1] !== "Opening Balance" &&
    !!(row[2] || row[3])
  );
};

const toFixedNumber = (num, digits, base) => {
  var pow = Math.pow(base || 10, digits);
  return Math.round(num * pow) / pow;
};

/* 
<tr class="td-table-alt-row">
    <td class="td-copy-align-left"> <img alt="" src="/waw/ezw/ewstatic/images/8_x_16_spacer.png"> Date 1
    </td>
    <td class="td-copy-align-left" style="word-wrap: break-word;">
        Description 1
    </td>
    <td class="td-table-align-right">Debits 1</td>
    <td class="td-table-align-right"></td>
    <td class="td-table-align-right"> Balance 1 </td>
</tr> 
*/
export const generateTableFractionContent = (data) => {
  let result = "";
  let count = 0;
  data.forEach((row) => {
    if (row[0] === "Total") {
      result += `
        <tr class="td-table-row-last">
            <th class="td-table-total-cell td-table-align-right td-copy-sub" colspan="2" scope="row">
                <b>Total :</b>
            </th>
            <td
                class="td-table-total-cell td-table-align-right td-copy-sub">$${toFixedNumber(
                  row[2],
                  2
                ).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td
                class="td-table-total-cell td-table-align-right td-copy-sub">$${toFixedNumber(
                  row[3],
                  2
                ).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td
                class="td-table-total-cell td-table-align-right td-copy-sub">&nbsp;</td>
        </tr>

          `;
    } else if (isValidRow(row)) {
      result += `
    <tr class="${count % 2 === 0 ? "td-table-alt-row" : ""}">
        <td class="td-copy-align-left"> <img alt="" src="/waw/ezw/ewstatic/images/8_x_16_spacer.png"> ${
          row[0] ? ExcelDateToJSDate(row[0]) : ""
        }
        </td>
        <td class="td-copy-align-left" style="word-wrap: break-word;">
        ${row[1] || ""}
        </td>
        <td class="td-table-align-right">${
          row[2]
            ? toFixedNumber(row[2], 2).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })
            : ""
        }</td>
        <td class="td-table-align-right">${
          row[3]
            ? toFixedNumber(row[3], 2).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })
            : ""
        }</td>
        <td class="td-table-align-right"> $${
          row[4]
            ? toFixedNumber(row[4], 2).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })
            : ""
        }</td>
    </tr>
  `;
      count += 1;
    }
  });
  return result;
};
