import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createUser,
  getUsers,
  updateUser,
} from "../../../redux/apiRequest";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Image,
  Select,
  Typography,
  Popconfirm,
  Tooltip,
} from "antd";
import {
  UserAddOutlined,
  RollbackOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./Admin-user.css";
import { Option } from "antd/lib/mentions";

const AdminUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [totalRecord, setTotalRecord] = useState(10);
  const [dataSource, setDataSource] = useState([]);

  const tokens = useSelector((state) => state?.auth.login?.currentUser?.tokens);
  const accessToken = useSelector(
    (state) => state?.auth.login?.currentUser?.tokens?.access.token
  );

  const totalUsers = useSelector(
    (state) => state?.getUsers.users?.allUsers?.totalResults
  );
  const userList = useSelector(
    (state) => state?.getUsers.users?.allUsers?.results
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [editingId, setEditingId] = useState("");
  const isEditing = (record) => record.id === editingId;

  // eidt, cancel, save
  const edit = (record) => {
    console.log(record);
    form.setFieldsValue({
      username: "",
      email: "",
      avatar: "",
      role: "",
      ...record,
    });
    setEditingId(record.id);
  };
  const cancel = () => {
    setEditingId("");
  };

  const save = async (id) => {
    console.log(id);
    const newUser = await form.validateFields();
    console.log(id);
    await updateUser(accessToken, newUser, dispatch, id);
    setEditingId("");
    setFlag(!flag);
  };

  const handleBack = () => {
    navigate("/admin");
  };

  useEffect(() => {
    setDataSource(userList);
    console.log(userList);
  }, [userList]);

  useEffect(() => {
    if (!tokens) {
      navigate("/");
    }
    if (accessToken) {
      getUsers(accessToken, dispatch, currentPageSize, currentPage).then(
        (res) => setTotalRecord(res?.totalResults)
      );
    }
  }, [flag]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handPageChange = (e) => {
    setCurrentPage(e.current);
    setCurrentPageSize(e.pageSize);
    getUsers(accessToken, dispatch, currentPageSize, e.current).then((res) =>
      console.log(res)
    );
  };
  // Edittablecell
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing && dataIndex !== "role" && (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        {editing && dataIndex === "role" && (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Select
              placeholder="Please select correct answer"
              defaultValue={record.answer2}
              onChange={handleChange}
            >
              <Option value={"admin"} />
              <Option value={"user"} />
            </Select>
          </Form.Item>
        )}
        {!editing && children}
      </td>
    );
  };

  // column của bảng
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      editable: true,
    },
    {
      title: "Email",
      width: "35%" ,
      dataIndex: "email",
      editable: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      editable: true,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      editable: true,
      render: (_, record) => <Image src={record.avatar} width={80} />,
    },
    {
      title: "Action",
      width: "10%",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Tooltip title="Edit user" color={"#f50"}>
            <Button
              type="dashed"
              onClick={() => edit(record)}
              icon={<EditOutlined />}
            />
          </Tooltip>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleCreateUser = async (values) => {
    const newUser = {
      username: values.username,
      password: values.password,
      email: values.email,
      role: values.role,
    };
    console.log(newUser);
    await createUser(accessToken, newUser, dispatch);
    setFlag(!flag);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  return (
    <>
      <Tooltip title="Back" color={"#87d068"}>
        <Button onClick={handleBack} icon={<RollbackOutlined />} />
      </Tooltip>
      <br/>
      <h1 className="h1">Total users: {totalUsers} {<Button type="dashed" onClick={showModal} icon={<UserAddOutlined />} />}</h1>
      
      <Form component={false} form={form}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          dataSource={dataSource}
          rowClassName="editable-row"
          onChange={handPageChange}
          pagination={{
            total: totalRecord,
            current: currentPage,
            pageSize: currentPageSize,
            showLessItems: true,
            showSizeChanger: true,
          }}
        />
      </Form>
      <Modal
        title="Add new user"
        visible={isModalVisible}
        footer={null}
        closable={null}
      >
        <Form {...layout} onFinish={handleCreateUser} form={form}>
          <Form.Item
            className="input-container"
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input username",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            className="input-container"
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input password",
              },
            ]}
          >
            <Input placeholder="Password" />
          </Form.Item>
          <Form.Item
            className="input-container"
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input email",
              },
            ]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item
            className="input-container"
            name="role"
            label="Role"
            rules={[
              {
                required: true,
                message: "Please input role",
              },
            ]}
          >
            <Select placeholder="Select role">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          <Form.Item className="button">
            <Button type="primary" htmlType="submit" className="btn-createuser">
              Done
            </Button>
            <Button onClick={handleCancel} className="btn-createuser">
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminUser;
