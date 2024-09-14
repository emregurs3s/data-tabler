import React,{useEffect,useState} from 'react';
import axios from 'axios';


const DataFetcher=({data})=>{
    const keys= Object.keys(data);
    const exampleValue = data[keys[1]] ; 
  const valueHeaders = Object.keys(exampleValue); 

  return (
    <div>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
        <th> </th>
            {valueHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            
          </tr>
        </thead>
        <tbody>
          {keys.map((key, colIndex) => (
            <tr key={colIndex}>
              <td>{key}</td>
              {valueHeaders.map((header, rowIndex) => (
                <td key={rowIndex}>
                  {data[key][header]} 
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