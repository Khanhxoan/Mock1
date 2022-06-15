import { Button, Form, Input, Modal, Table, Tooltip, Typography, Popconfirm, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createQuestion, deleteQuestion, editQuestion, getQuestions } from "../../redux/apiRequest";
import { ExclamationCircleOutlined, EditOutlined, RollbackOutlined, DeleteOutlined } from "@ant-design/icons";

import { Option } from "antd/lib/mentions";
import "./Admin-question.css";

const AdminQuestions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [totalRecord, setTotalRecord] = useState(10);
  const [dataSource, setDataSource] = useState();

  const [editingId, setEditingId] = useState("");

  const user = useSelector(
    (state) => state?.auth.login?.currentUser.tokens?.access
  );
  const questionList = useSelector(
    (state) => state?.getQuestions.questions?.allQuestions?.results
  );
  const questions = useSelector(
    (state) => state?.getQuestions.questions?.allQuestions
  );

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [flag, setFlag] = useState(false);
  
  const [answers, setAnswers] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  });


  const isEditing = (record) => record.id === editingId;
  const [isModalVisible, setIsModalVisible] = useState(false);

  // get info question
  const edit = (record) => {
    form.setFieldsValue({
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctanswer: "",
      ...record,
    });
    setEditingId(record.id);
  };

  // function save update question
  const save = async (id) => {
    const newQuestion = await form.validateFields();
    await editQuestion(user.token, newQuestion, dispatch, id);
    setEditingId("");
    setFlag(!flag);
  };

  const cancel = () => {
    setEditingId("");
  };

  // nút back lại trang admin
  const handleBack = () => {
    navigate("/admin");
  };

  useEffect(() => {
    setDataSource(questionList);
  }, [questionList]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (user.token) {
      getQuestions(user.token, dispatch, currentPageSize, currentPage).then(
        (res) => {
          setTotalRecord(res?.totalResults);
          return res?.results;
        }
      );
    }
  }, [flag]);

  // Pagination cho table
  const handPageChange = (e) => {
    setCurrentPage(e.current);
    setCurrentPageSize(e.pageSize);
    getQuestions(user.token, dispatch, currentPageSize, e.current);
  };

  // handle delete
  const handleDelete = async (token, dispatch, id) => {
    await deleteQuestion(token, dispatch, id);
    setFlag(!flag);
  };

  // Show Delete Confirm
  const { confirm } = Modal;

  const showDeleteConfirm = (
    token,
    dispatch,
    id,
    question,
    currentPageSize,
    currentPage
  ) => {
    confirm({
      title: "Bạn có chắc là xóa câu này không",
      icon: <ExclamationCircleOutlined />,
      content: null,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        handleDelete(
          token,
          dispatch,
          id,
          question,
          currentPageSize,
          currentPage
        );
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // Handle Show modal
  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishEdit = async (values) => {
    const [question, answer1, answer2, answer3, answer4, correctanswer] = [
      values.question,
      values.answer1,
      values.answer2,
      values.answer3,
      values.answer4,
      values.correctanswer,
    ];
    const newQuestion = {
      question: question,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      correctanswer: correctanswer,
    };
    await createQuestion(user.token, newQuestion, dispatch);
    setIsModalVisible(false);
    setFlag(!flag);
    setAnswers({ answer1: "", answer2: "", answer3: "", answer4: "" });
  };

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
        {editing && (
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
        {!editing && children}
      </td>
    );
  };

  // const columns cho table
  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      witdh: "20%",
      editable: true,
    },
    {
      title: "Answer1",
      dataIndex: "answer1",
      witdh: "15%",
      editable: true,
    },
    {
      title: "Answer2",
      dataIndex: "answer2",
      witdh: "15%",
      editable: true,
    },
    {
      title: "Answer3",
      dataIndex: "answer3",
      witdh: "15%",
      editable: true,
    },
    {
      title: "Answer4",
      dataIndex: "answer4",
      witdh: "15%",
      editable: true,
    },
    {
      title: "Correct answer",
      dataIndex: "correctanswer",
      witdh: "15%",
      editable: true,
    },
    {
      title: "Action",
      witdh: "5%",
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
          <>
            <Tooltip title="Edit question" color={"#f50"}>
              <Button
                type="primary"
                onClick={() => edit(record)}
                icon={<EditOutlined />}
              />
            </Tooltip>
            <Tooltip title="Delete question" color={"red"}>
              <Button
                onClick={() =>
                  showDeleteConfirm(
                    user.token,
                    dispatch,
                    record.id,
                    record.question,
                    currentPageSize,
                    currentPage
                  )
                }
                type="dashed"
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </>
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

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
  };

  return (
    <>
      <Tooltip title="Back" color={"#87d068"}>
        <Button onClick={handleBack} icon={<RollbackOutlined />} />
      </Tooltip>
      <br />
      <h1>Total questions: {questions?.totalResults}</h1>
      <div className="header-tablequestion">
      <Button type="dashed" onClick={showModal} className="btn-addquesiton">
        Add a new question
      </Button>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowClassName="editable-row"
          columns={mergedColumns}
          dataSource={dataSource}
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
        title="Add a newa question"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={onFinishEdit} form={form} {...formItemLayout}>
          <Form.Item
            name="question"
            label="Question"
            rules={[
              {
                required: true,
                message: "Please input question",
              },
            ]}
          >
            <Input placeholder="Question" />
          </Form.Item>
          <Form.Item
            name="answer1"
            label="Answer1"
            rules={[
              {
                required: true,
                message: "Please input answer 1",
              },
            ]}
          >
            <Input
              placeholder="Answer 1"
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  answer1: e.target.value,
                })
              }
              value={answers.answer1}
            />
          </Form.Item>
          <Form.Item
            name="answer2"
            label="Answer2"
            rules={[
              {
                required: true,
                message: "Please input answer 2",
              },
            ]}
          >
            <Input
              placeholder="Answer 2"
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  answer2: e.target.value,
                })
              }
              value={answers.answer2}
            />
          </Form.Item>
          <Form.Item
            name="answer3"
            label="Answer3"
            rules={[
              {
                required: true,
                message: "Please input answer 3",
              },
            ]}
          >
            <Input
              placeholder="Answer 3"
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  answer3: e.target.value,
                })
              }
              value={answers.answer3}
            />
          </Form.Item>
          <Form.Item
            name="answer4"
            label="Answer4"
            rules={[
              {
                required: true,
                message: "Please input answer 4",
              },
            ]}
          >
            <Input
              placeholder="Answer 4"
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  answer4: e.target.value,
                })
              }
              value={answers.answer4}
            />
          </Form.Item>
          <Form.Item
            name="correctanswer"
            label="Correct Answer"
            rules={[
              {
                required: true,
                message: "Please input right answer",
              },
            ]}
          >
            <Select placeholder="Please select correct answer">
              <Option value={answers.answer1} />
              <Option value={answers.answer2} />
              <Option value={answers.answer3} />
              <Option value={answers.answer4} />
            </Select>
          </Form.Item>
          <Form.Item className="button" style={{display:'flex'} }>
            <Button onClick={handleCancel} style={{marginRight: 10}} >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Done
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminQuestions;
