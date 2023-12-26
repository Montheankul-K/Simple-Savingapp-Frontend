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

function AddSaving(props) {
  const [formCategory, setFormCategory] = useState(category);
  const [formType, setFormType] = useState(type);
  const [formPaymentType, setFormPaymentType] = useState(paymentType);
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    const formValue = {
      key: props.tableData.length,
      amount: values.amount,
      category: values.category,
      isIncome: values.isIncome,
      paymentType: values.paymentType,
    };
    const newSaving = [...props.tableData, formValue];
    props.setTableData(newSaving);
    props.setIsAddMode(false);
  };

  const onCancel = () => props.setIsAddMode(false);

  return (
    <Form
      {...layout}
      form={form}
      name="add-saving"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
        <Input placeholder="Enter amount" style={{ textAlign: "center" }} />
      </Form.Item>
      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Select placeholder="Select categories" allowClear>
          {formCategory.map((item, index) => (
            <Option key={`category_${index}`} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="isIncome"
        label="Income/Expense"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select saving type" allowClear>
          {formType.map((item, index) => (
            <Option key={`type_${index}`} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="paymentType" label="Payment type">
        <Select placeholder="Select payment type" allowClear>
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
            Add
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

export default AddSaving;
