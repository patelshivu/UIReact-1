import moment from "moment";
import React from "react";
import { Table } from "react-bootstrap";
import { CommonSpinner } from "../../common";
import TableColumnList from "./columns-list.json";

export default function ExistingAdminDetails(_props) {
  /**
   * props
   */
  const { listUser, isLoading } = _props;

  const renderTableColumns = () => {
    return TableColumnList.map((item, index) => (
      <th key={index}>
        {item}
      </th>
    ));
  };

  const renderTableItem = () => {
    if (listUser) {
      return listUser.map((item, index) => (
        <tr key={index}>
          <td>
            <input type={"checkbox"} />
          </td>
          <td>{item.id}</td>
          <td>{`${item.firstName} ${item.lastName}`}</td>
          <td>{item.email}</td>
          <td>{item.type}</td>
          <td>{item.phoneNumber}</td>
          <td>{moment(item.createdByDate).format("DD MMM, YYYY")}</td>
          <td>
            {item.modifiedByDate !== null
              ? moment(item.modifiedByDate).format("DD MMM, YYYY")
              : "-"}
          </td>
          <td>{`${item.isActive}`}</td>
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
        <tbody>{renderTableItem()}</tbody>
      </Table>
      {isLoading && (
        <CommonSpinner styles="client-loader" isLoading={isLoading} />
      )}
    </div>
  );
}
