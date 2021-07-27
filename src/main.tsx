import React, { Suspense, useMemo } from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { RecoilRoot } from "recoil";
import { Spin } from "antd";
import axios, { AxiosContext } from "./api/request";

import App from "./App";

import "./assets/css/index.less";

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const axiosValue = useMemo(() => {
    return axios;
  }, []);

  return (
    <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>
  );
};

ReactDOM.render(
  <AxiosProvider>
    <RecoilRoot>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div>
            There was an error!{" "}
            <button onClick={() => resetErrorBoundary()}>Try again</button>
            <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
          </div>
        )}
      >
        <Suspense fallback={<Spin tip="加载中..." />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  </AxiosProvider>,
  document.getElementById("root")
);
