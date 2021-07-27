import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Location } from "history";
import { useLogin } from "@/api";

import styles from "./index.module.less";

interface LoginParams {
  userName: string;
  password: string;
  token: string;
}

const initialValues: LoginParams = {
  userName: "guest",
  password: "guest",
  token: "",
};

const LoginForm: React.FC = () => {
  const checkedLogin = useLogin();
  const navigate = useNavigate();
  const location = useLocation() as Location<{ from: string }>;

  const onFinished = async (form: LoginParams) => {
    const result = await checkedLogin(form);
    if (result) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("userName", result.userName);

      const from = location.state?.from || { pathname: "/" };
      navigate(from);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            <span className={styles.title}>xxx</span>
          </Link>
        </div>
      </div>
      <div className={styles.main}>
        <Form<LoginParams> onFinish={onFinished} initialValues={initialValues}>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "请输入用户名！" }]}
          >
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码！" }]}
          >
            <Input type="password" size="large" placeholder="密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住用户</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
