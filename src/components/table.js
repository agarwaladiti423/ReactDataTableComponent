import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import classes from './Table.module.css';
import TableHeader from './TableHeader';
import Search from './Search';

const Table=()=> {
  let [user, setUser] = useState([]);
  let [search, setSearch] = useState("");

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
 
  const userData = useMemo(() => {
    let computedData = user;
    if (search) {
          computedData = computedData.filter(
                users =>
                    users.name.toLowerCase().includes(search.toLowerCase()) ||
                    users.email.toLowerCase().includes(search.toLowerCase())
            );
    }
    return computedData;
}, [user, search]);

  var posts =userData.map(post => {
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
         <Search onSearch={value => {
                  setSearch(value);}}/>
         <TableHeader headers={header} />
         {posts}   
      </div >
    )
  }

export default Table;