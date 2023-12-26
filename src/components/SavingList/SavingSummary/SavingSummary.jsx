import React, { useState, useEffect } from "react";
import { Card, List } from "antd";

const cardTitle = [
  {
    title: "Total income",
  },
  {
    title: "Total expense",
  },
  {
    title: "Total Balance",
  },
];

const getDataFromLocal = () => {
  const localData = localStorage.getItem("saving");
  if (localData === null) {
    return null;
  }
  return JSON.parse(localData);
};

const summarySaving = (data) => {
  let savingResult = [0, 0, 0];
  if (data !== null) {
    let totalIncome = 0;
    let totalExpense = 0;
    data.map((item) => {
      if (String(item.isIncome) === "Income") {
        totalIncome += Number(item.amount);
      } else {
        totalExpense += Number(item.amount);
      }
    });
    const totalBalance = totalIncome - totalExpense;
    savingResult = [totalIncome, totalExpense, totalBalance];
  }
  return savingResult;
};

export default function SavingSummary(props) {
  const [summaryData, setSummaryData] = useState([0, 0, 0]);
  useEffect(() => {
    const data = getDataFromLocal();
    const result = summarySaving(data);
    setSummaryData(result);
  }, [props.tableData]);
  return (
    <div>
      <List
        grid={{
          gutter: 16,
          column: 3,
        }}
        dataSource={cardTitle}
        renderItem={(item, index) => (
          <List.Item>
            <Card title={item.title}>{summaryData[index]}</Card>
          </List.Item>
        )}
      />
    </div>
  );
}
