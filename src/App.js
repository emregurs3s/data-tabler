import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import DataFetcher from './components/DataFetcher';

const App =() => {
  
const [data,setData] = useState({});
useEffect(()=> {
axios("https://jsonplaceholder.typicode.com/posts")
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
