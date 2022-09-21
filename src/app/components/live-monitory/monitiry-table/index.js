import React from "react";
import { Table } from "react-bootstrap";
import ColumnsList from "./live-monitory-columns.json";

export default function LiveMonitoryTable(props) {
  const renderTableColumns = () => {
    return ColumnsList.map((item, index) => (
      <th  key={index}>
        {item}
      </th>
    ));
  };

  return (
    <div>
      <Table hover responsive className="my-table">
        <thead>
          <tr>{renderTableColumns()}</tr>
        </thead>
      </Table>
    </div>
  );
}

