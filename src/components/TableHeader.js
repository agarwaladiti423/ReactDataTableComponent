import React from "react";
import classes from './Table.module.css';


const TableHeader=(props)=>{
    return (
        <div className={classes.header}>
           {props.headers.map(head=>(
                <div className={classes.col} key={head.name} >
                            {head.field}
                            
                </div>
            ))}
          
        </div>
    )
}

export default TableHeader;