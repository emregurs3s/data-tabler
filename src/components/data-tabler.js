import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataFetcher = ({ data, searchTerm }) => {
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    if (!data) return;

    const filtered = Object.keys(data)
      .filter(key => {
        const item = data[key];
        return key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          Object.values(item).some(value =>
            (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (typeof value === 'number' && value.toString().includes(searchTerm))
          );
      })
      .reduce((res, key) => ({ ...res, [key]: data[key] }), {});

    setFilteredData(filtered);
  }, [searchTerm, data]);

  if (!Object.keys(filteredData).length) {
    return <div>Veri mevcut değil</div>;
  }

  const updateDate = filteredData["Update_Date"];
  delete filteredData["Update_Date"];
  const allKeys = Object.keys(filteredData);
  const exampleValue = filteredData[allKeys[0]] || {};
  const valueHeaders = Object.keys(exampleValue);

  if (allKeys.some(key => filteredData[key].hasOwnProperty("name"))) {
    valueHeaders.unshift("name");
  }

  const cleanedData = allKeys.map(key => {
    const item = filteredData[key];
    const cleanedItem = { ...item };
    Object.keys(cleanedItem).forEach(subKey => {
      if (typeof cleanedItem[subKey] === 'object' && cleanedItem[subKey] !== null) {
        cleanedItem[subKey] = JSON.stringify(cleanedItem[subKey]);
      }
    });
    return { key, ...cleanedItem };
  });

  return (
    <div>
      {updateDate && <h2>Güncelleme Tarihi: {updateDate}</h2>}
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Key</th>
            {valueHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cleanedData.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <td>{item.key}</td>
              {valueHeaders.map((header, colIndex) => (
                <td key={colIndex}>
                  {header === "name" ? item["name"] || '' : item[header] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataFetcher; 