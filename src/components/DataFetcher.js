import React, { useState } from 'react';

/* function FilterTable({products}){
  const [filterText , setFilterText] = useState ('');
  return(
<div>
  <SearchBar
  filterText={filterText}
  />
  <DataFetcher data={products} filterText={filterText}/>
</div>

  )
}
function SearchBar(filterText,setFilterText)
{
  return(
<form>
  <input
  type='text'
  value={filterText}
  placeholder='Ara...'
  onChange={(e)=>setFilterText(e.target.value)}
  />
</form>

  )

} */
const DataFetcher = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <div>Veri mevcut değil</div>;
  }

  const isArray = Array.isArray(data);
  const updateDate = data["Update_Date"];
  delete data["Update_Date"];

  const allKeys = Object.keys(data);
  const exampleValue = data[allKeys[0]] || {}; 
  const valueHeaders = Object.keys(exampleValue);
  if (allKeys.some(key => data[key].hasOwnProperty("name")) && !valueHeaders.includes("name")) {
    valueHeaders.unshift("name");
  }

  
  const cleanedData = allKeys.map(key => {
    const item = data[key];
    const cleanedItem = { ...item };


    Object.keys(cleanedItem).forEach(subKey => {
      if (typeof cleanedItem[subKey] === 'object' && cleanedItem[subKey] !== null) {
        cleanedItem[subKey] = JSON.stringify(cleanedItem[subKey]);
      }
    });

    return { key, ...cleanedItem };
  });

  return (
    <div className='container'>
     
      <span className='search-bar-text'>SEARCH SearchBar</span>
      {updateDate && <h2>Güncelleme Tarihi: {updateDate}</h2>}
      <table className='table'>
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
