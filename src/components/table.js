import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import classes from './Table.module.css';
import TableHeader from './TableHeader';
import Search from './Search';

const Table = () => {
  let [user, setUser] = useState([]);
  let [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  var headers = [
    { name: "id", field: "ID", sortable: false },
    { name: "name", field: "NAME", sortable: true },
    { name: "email", field: "EMAIL", sortable: true },
    { name: "username", field: "USERNAME", sortable: true },
    { name: "city", field: "CITY", sortable: false }
  ];

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUser(response.data)
      });
  }, []);

  const userData = useMemo(() => {
    let computedData = user;

    //Searching Data
    if (search) {
      computedData = computedData.filter(
        users =>
          users.name.toLowerCase().includes(search.toLowerCase()) ||
          users.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    //Sorting Data
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      // var fld = sorting.field.toLocaleLowerCase();
      computedData = computedData.sort(
        (a, b) => {
          var fld = sorting.field.toLocaleLowerCase();
          a = a[fld];
          b = b[fld];
          return reversed * a.localeCompare(b)
        }
      );
    }

    return computedData;
  }, [user, search, sorting]);

  var posts = userData.map(post => {
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
        setSearch(value);
      }} />
      <TableHeader headers={headers}
        onSorting={(field, order) =>
          setSorting({ field, order })
        }
      />
      {posts}
    </div >
  )
}

export default Table;