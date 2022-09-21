export const UserManagementPresenter = () => {
  const listOfClientDropdown = (listData) => {
    let listClient = [];
    for (let i = 0; i < listData.length; i++) {
      listClient.push({ name: listData[i]["name"], id: listData[i]["id"] });
    }
    return listClient;
  };
  return {
    listOfClientDropdown,
  };
};
