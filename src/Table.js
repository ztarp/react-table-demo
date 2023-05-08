// Table.js

import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import "./table.css"

export default function Table({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter, // The useFilter Hook provides a way to set the filter
  } = useTable(
    {
        columns,
        data
    },
    useFilters,  // Adding the useFilters Hook to the table
    // You can add as many Hooks as you want. Check the documentation for details. You can even add custom Hooks for react-table here
    useSortBy // This Plugin Hook will help us sort our columns
  );

  const [ filterInput, setFilterInput ] = useState("");

  // Update the state when input changes
    const handleFilterChange = e => {
        const value = e.target.value || null;
        setFilter("show.name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
        setFilterInput(value);
    };

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically

    Table header styling and props to allow sorting
  */
  return (
    <>
        <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
        />
        <table {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                    column.isSorted
                        ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                        : ""
                    }
                >
                    {column.render("Header")}
                </th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
                </tr>
            );
            })}
        </tbody>
        </table>
    </>
  );
}