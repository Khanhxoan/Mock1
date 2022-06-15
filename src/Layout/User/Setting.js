import React, { useState } from "react";
import { InputNumber, Space } from "antd";
import { Button } from "antd";
import "./setting.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAmountQuestion } from "../../redux/apiRequest";
import { SettingOutlined } from "@ant-design/icons";

const Setting = () => {
  // state redux
  const user = useSelector(
    (state) => state?.auth.login?.currentUser.tokens?.access
  );
  const totalResults = useSelector(
    (state) => state?.getAmountQuestion?.questions?.allQuestions?.totalResults
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle get amount question
  const [limit, setLimit] = useState(5);
  const handleAmountQquestions = async () => {
    await getAmountQuestion(user.token, dispatch, limit, 1);
    navigate("/questions");
  };

  return (
    <div className="setting">
      <h1 className="h1-setting">Bạn muốn chơi bao nhiêu câu nào?</h1>
      <Space className="space">
        <InputNumber
          min={1}
          max={totalResults}
          value={limit}
          onChange={setLimit}
          className="InputNumber"
        />
        <Button onClick={handleAmountQquestions} className="btn_amount">
          Go
        </Button>
        <br />
      </Space>
      <SettingOutlined style={{ fontSize: 70 }} spin={true} />
    </div>
  );
};

export default Setting;
