import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import DataFetcher from './components/DataFetcher';

const App =() => {
  
const [data,setData] = useState({});
useEffect(()=> {
axios("https://finans.truncgil.com/v4/today.json")
.then(res=>{
setData(res.data);
})
},[]);
return(
  <div>
    <DataFetcher data={data}/>
  </div>
)

}


export default App;
