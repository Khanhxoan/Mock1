import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createUser, getUsers, updateUser } from "../../../redux/apiRequest";
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
  Space,
} from "antd";
import {
  UserAddOutlined,
  RollbackOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./Admin-user.css";
import { Option } from "antd/lib/mentions";
import Highlighter from "react-highlight-words";

const AdminUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(300);
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

  // handleEdit
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

  // handle Cancel edit
  const cancel = () => {
    setEditingId("");
  };

  // handleSave
  const save = async (id) => {
    const newUser = await form.validateFields();
    await updateUser(accessToken, newUser, dispatch, id);
    setEditingId("");
    setFlag(!flag);
  };

  // handleBack
  const handleBack = () => {
    navigate("/admin");
  };

  // useEffect update table
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

  // Handle pageChange
  const handPageChange = (e) => {
    console.log(e)
    setCurrentPage(e.current);
    setCurrentPageSize(e.pageSize);
    // getUsers(accessToken, dispatch, currentPageSize, e.current).then((res) =>
    //   console.log(res)
    // );
  };

  // ----------Handle search, reset
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // ---------- get columnSearchProps
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
          fontSize: 16,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // -------------

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

  // column table
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      editable: true,
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      width: "35%",
      dataIndex: "email",
      editable: true,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      editable: true,
      filters: [
        {
          text: "admin",
          value: "admin",
        },
        {
          text: "user",
          value: "user",
        },
      ],
      // filter role
      onFilter: (value, record) => record.role.indexOf(value) === 0,
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

  // handle create user
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

  // Show modal
  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  // handle cancel Create
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
      <br />
      <h1 className="h1">
        Total users: {totalUsers}{" "}
        {
          <Button
            type="dashed"
            onClick={showModal}
            icon={<UserAddOutlined />}
          />
        }
      </h1>

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
          pagination={true}
          // pagination={{
          //   total: totalRecord,
          //   current: currentPage,
          //   pageSize: currentPageSize,
          //   showLessItems: true,
          //   showSizeChanger: true,
          // }}
        />
      </Form>
      <Modal
        title="Add a new user"
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
