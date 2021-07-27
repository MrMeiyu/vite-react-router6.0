import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useRecoilState } from "recoil";
import DayJs from "dayjs";
import RenderRoute from "./route";

import _enUS from "antd/es/locale/en_US";
import _zhCN from "antd/es/locale/zh_CN";

import { userState } from "./store/userState";

const App: React.FC = () => {
  const [user] = useRecoilState(userState);
  const { locale } = user;

  useEffect(() => {
    if (locale.toLowerCase() === "en-us") {
      DayJs.locale("en");
    } else if (locale.toLowerCase() === "zh-cn") {
      DayJs.locale("zh");
    }
  }, [locale]);

  const getAntdLocale = () => {
    if (locale.toLowerCase() === "en-us") {
      return _enUS;
    } else if (locale.toLowerCase() === "zh-cn") {
      return _zhCN;
    }
  };

  return (
    <ConfigProvider locale={getAntdLocale()} componentSize="middle">
      <BrowserRouter>
        <RenderRoute />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
