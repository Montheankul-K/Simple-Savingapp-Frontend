import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { category, type, paymentType, data } from "../../assets/initialData";
import AddSaving from "./AddSaving/AddSaving";
import Header from "./Header/Header";
import EditSaving from "./EditSaving/EditSaving";
import SavingSummary from "./SavingSummary/SavingSummary";

const defindFilter = (filterList) => {
  const filter = [];
  filterList.map((item) => {
    filter.push({
      text: item,
      value: item,
    });
  });
  return filter;
};

const mapTableData = (data) => {
  const mapResult = data.map((item) => ({
    key: String(item.id),
    amount: item.amount,
    category: item.category,
    isIncome: item.isIncome ? "Income" : "Expense",
    paymentType: item.paymentType,
  }));
  return mapResult;
};

let categoryFilterItem = defindFilter(category);
let typeFilterItem = defindFilter(type);
let paymentTypeFilterItem = defindFilter(paymentType);

const tableColumn = [
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Categotry",
    dataIndex: "category",
    filters: categoryFilterItem,
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => String(record.category).startsWith(value),
    width: "30%",
  },
  {
    title: "Income/Expense",
    dataIndex: "isIncome",
    filters: typeFilterItem,
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => String(record.isIncome).startsWith(value),
    width: "30%",
  },
  {
    title: "Payment Type",
    dataIndex: "paymentType",
    filters: paymentTypeFilterItem,
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => String(record.paymentType).startsWith(value),
    width: "30%",
  },
];

export default function SavingList() {
  const [tableCols, setTableCols] = useState(tableColumn);
  const [tableData, setTableData] = useState(() => {
    const localSaving = localStorage.getItem("saving");
    if (localSaving === null) {
      return mapTableData(data);
    }
    return JSON.parse(localSaving);
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isSelectedEdit, setIsSelectedEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem("saving", JSON.stringify(tableData));
  }, [tableData]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const deleteHandler = () => {
    const newData = tableData.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    setTableData(newData);
    setSelectedRowKeys([]);
    setIsDeleteMode(false);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onCancel = () => {
    setSelectedRowKeys([]);
    setIsDeleteMode(false);
  };

  const onEditModeCancel = () => {
    setSelectedRowKeys([]);
    setIsEditMode(false);
  };

  return (
    <div>
      <Header
        setIsDeleteMode={setIsDeleteMode}
        setIsAddMode={setIsAddMode}
        setIsEditMode={setIsEditMode}
      />
      {isDeleteMode ? (
        <div>
          <Table
            rowSelection={rowSelection}
            columns={tableCols}
            dataSource={tableData}
            key={"deleteTable"}
          />
          <Button type="primary" onClick={deleteHandler}>
            Delete selected
          </Button>
          <Button
            type="primary"
            onClick={onCancel}
            style={{ marginLeft: "8px" }}
          >
            Cancel
          </Button>
        </div>
      ) : isEditMode ? (
        <div>
          <Table
            rowSelection={rowSelection}
            columns={tableCols}
            dataSource={tableData}
            key={"editTable"}
          />
          {isSelectedEdit ? (
            <EditSaving
              tableData={tableData}
              setTableData={setTableData}
              selectedRowKeys={selectedRowKeys}
              setIsEditMode={setIsEditMode}
              setIsSelectedEdit={setIsSelectedEdit}
              setSelectedRowKeys={setSelectedRowKeys}
            />
          ) : (
            <div>
              <Button
                type="primary"
                onClick={() => {
                  setIsSelectedEdit(true);
                }}
              >
                Edit selected
              </Button>
              <Button
                type="primary"
                onClick={onEditModeCancel}
                style={{ marginLeft: "8px" }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      ) : isAddMode ? (
        <div>
          <Table columns={tableCols} dataSource={tableData} key={"addTable"} />
          <AddSaving
            tableData={tableData}
            setTableData={setTableData}
            selectedRowKeys={selectedRowKeys}
            setIsAddMode={setIsAddMode}
          />
        </div>
      ) : (
        <div>
          <Table
            columns={tableCols}
            dataSource={tableData}
            key={"defaultTable"}
          />
          <SavingSummary tableData={tableData} />
        </div>
      )}
    </div>
  );
}
