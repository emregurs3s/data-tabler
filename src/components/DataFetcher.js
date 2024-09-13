import React,{useEffect,useState} from 'react';
import axios from 'axios';


const DataFetcher=({data})=>{
    const keys= Object.keys(data);
    const values= Object.values(data);
   


return(
    <div>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
        <tr>
        {
            keys.map((key,index)=>(
            <th key={index}>
                {key}
            </th>))
        }
        </tr>
        </thead>
        <tbody>
            <tr>
        {
            values.map((value,colIndex)=>(
                <td key={colIndex}>
                
                    {typeof value === 'object' ? JSON.stringify(value) : value}
               </td>))
        }                
            </tr>
        </tbody>
      </table>

    </div>
)
}

export default DataFetcher;

