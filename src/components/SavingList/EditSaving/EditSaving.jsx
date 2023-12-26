import React, { useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import { category, type, paymentType } from "../../../assets/initialData";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function EditSaving(props) {
  const [formCategory, setFormCategory] = useState(category);
  const [formType, setFormType] = useState(type);
  const [formPaymentType, setFormPaymentType] = useState(paymentType);
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(() => {
    const selectedItem = props.tableData.find((item) =>
      props.selectedRowKeys.includes(item.key)
    );
    return selectedItem;
  });

  const onReset = () => {
    form.resetFields();
  };

  const onCancel = () => {
    props.setIsEditMode(false);
    props.setIsSelectedEdit(false);
    props.setSelectedRowKeys([]);
  };

  const onFinish = (values) => {
    const formValue = {
      key: editData.key,
      amount: values.amount != null ? values.amount : editData.amount,
      category: values.category != null ? values.category : editData.category,
      isIncome: values.isIncome != null ? values.isIncome : editData.isIncome,
      paymentType:
        values.paymentType != null ? values.paymentType : editData.paymentType,
    };
    const editSaving = [...props.tableData];
    const index = props.tableData.findIndex(
      (item) => item.key === formValue.key
    );
    console.log(formValue);
    editSaving[index] = { ...formValue };
    props.setTableData(editSaving);
    props.setIsEditMode(false);
    props.setIsSelectedEdit(false);
    props.setSelectedRowKeys([]);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="edit-saving"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="amount" label="Amount">
        <Input placeholder={editData.amount} style={{ textAlign: "center" }} />
      </Form.Item>
      <Form.Item name="category" label="Category">
        <Select placeholder={editData.category} allowClear>
          {formCategory.map((item, index) => (
            <Option key={`category_${index}`} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="isIncome" label="Income/Expense">
        <Select placeholder={editData.type} allowClear>
          {formType.map((item, index) => (
            <Option key={`type_${index}`} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="paymentType" label="Payment type">
        <Select placeholder={editData.paymentType} allowClear>
          {formPaymentType.map((item, index) => (
            <Option key={`paymentType_${index}`} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Edit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button htmlType="button" onClick={onCancel}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
