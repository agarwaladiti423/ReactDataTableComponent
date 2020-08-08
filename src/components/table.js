import React, { useEffect, useState } from "react";
import axios from 'axios';
import classes from './Table.module.css';
import TableHeader from './TableHeader';

const Table=()=> {
  let [user, setUser] = useState([]);

   var header = [
    {name:"id",field:"ID"},
    {name:"name",field:"NAME"},
    {name:"email",field:"EMAIL"},
    {name:"username",field:"USERNAME"},
    {name:"city",field:"CITY"}
  ];

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      setUser(response.data) 
    });
}, []);
 
var posts =user.map(post => {
        return (
          <div className={classes.row} key={post.id}>
            <div className={classes.col}>{post.id}</div>
            <div className={classes.col}>{post.name}</div>
            <div className={classes.col}>{post.email}</div>
            <div className={classes.col}>{post.username}</div>
            <div className={classes.col}>{post.address.city}</div>
          </div>
        )
      });
    
    return (
      <div className={classes.main}>
         <h1>React Data Table</h1>
         <TableHeader headers={header} />
        {posts}
      </div >
    )
  }

export default Table;