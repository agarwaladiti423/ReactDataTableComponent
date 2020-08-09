import React, { useState } from "react";
import classes from './Table.module.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const TableHeader = (headers, onSorting) => {

    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = field => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        headers.onSorting(field, order);
    }

    return (
        <div className={classes.header}>
            {headers.headers.map(({ name, field, sortable }) => (
                <div className={classes.col}
                    key={name}
                    onClick={() => sortable ? onSortingChange(field) : null}
                >

                    {field}

                    {/* {sortingField && sortingField === field && (
                        <FontAwesomeIcon
                            icon={
                                sortingOrder === "asc"
                                    ? "arrow-down"
                                    : "arrow-up"
                            }
                        />
                    )} */}
                </div>
            ))}

        </div>
    )
}

export default TableHeader;