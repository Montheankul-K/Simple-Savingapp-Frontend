import React from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const items = [
  getItem("Action", "saving-action", <AppstoreOutlined />, [
    getItem(
      "Select action",
      null,
      null,
      [
        getItem("Add new saving", "add"),
        getItem("Edit saving", "edit"),
        getItem("Delete saving", "delete"),
      ],
      "group"
    ),
  ]),
];

export default function Header(props) {
  const onClick = (e) => {
    switch (e.key) {
      case "add":
        props.setIsAddMode(true);
        break;
      case "edit":
        props.setIsEditMode(true);
        break;
      case "delete":
        props.setIsDeleteMode(true);
        break;
      default:
        break;
    }
  };
  return (
    <div style={{ marginBottom: "10px" }}>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
          borderRadius: "8px",
        }}
        mode="vertical"
        items={items}
      />
    </div>
  );
}
