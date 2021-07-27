import * as React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面走丢了"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          go home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
