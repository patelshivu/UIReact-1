import React from "react";
import { Table } from "react-bootstrap";
import ColumnsList from "./columns-list.json";

export default function EntityGroupListTable(props) {
  const { listEntity } = props;
  const renderTableColumns = () => {
    return ColumnsList.map((item, index) => (
      <th style={{ fontSize: "10px" }} key={index}>
        {item}
      </th>
    ));
  };

  const renderEntityGroupRow = () => {
    if (listEntity.length > 0) {
      return listEntity.map((item, index) => (
        <tr key={index}>
          <td>
            <input type={"checkbox"} />
          </td>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.type}</td>
          <td>null</td>
          <td>-</td>
          <td>{item.latitude}</td>
          <td>{item.longitude}</td>
          <td>{item.contactNo}</td>
          <td>{item.contactEmail}</td>
          <td>{item.eligibleForAccess ? "True" : "False"}</td>
        </tr>
      ));
    }
  };

  return (
    <div>
      <Table hover responsive className="my-table">
        <thead>
          <tr>{renderTableColumns()}</tr>
        </thead>
        <tbody>{renderEntityGroupRow()}</tbody>
      </Table>
    </div>
  );
}
