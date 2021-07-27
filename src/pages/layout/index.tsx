import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { createBrowserHistory } from "history";

import ProLayout from "@ant-design/pro-layout";
import {
  SmileOutlined,
  HeartOutlined,
  FrownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import RightContent from "./RightContent";
import Footer from "./Footer";

import { userState } from "@/store/userState";

import type { MenuDataItem } from "@ant-design/pro-layout";

import styles from "./index.module.less";

const history = createBrowserHistory();
const IconMap: { [key: string]: React.ReactNode } = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />,
};
const menuList: MenuDataItem[] = [
  {
    path: "/login",
    name: "login",
    icon: "smile",
  },
  {
    path: "/",
    name: "layout",
    icon: "smile",
    children: [
      {
        path: "/home-page",
        name: "home-page",
      },
      {
        path: "/hooks-example",
        name: "hooks-example",
      },
      {
        path: "/recoil-example",
        name: "recoil-example",
      },
    ],
  },
  {
    path: "*",
    name: "404",
    icon: "smile",
  },
];

const LayoutApp: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const { collapsed, settings } = user;

  const loopMenuItem = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menus) return [];

    const m = menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }));

    return m;
  };

  const toggle = () => {
    setUser({ ...user, collapsed: !collapsed });
  };

  return (
    <ProLayout
      fixSiderbar
      collapsed={collapsed}
      location={{
        pathname: location.pathname,
      }}
      {...settings}
      onCollapse={toggle}
      onMenuHeaderClick={() => history.push("https://reactjs.org/")}
      headerTitleRender={(logo, title, props) => (
        <a className={styles.layoutPageHeader}>{title}</a>
      )}
      menuHeaderRender={undefined}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: "/",
          breadcrumbName: "home",
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={() => loopMenuItem(menuList)}
      rightContentRender={() => <RightContent />}
      footerRender={() => <Footer />}
      collapsedButtonRender={() => {
        return (
          <div
            onClick={() => toggle}
            style={{
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            <span id="sidebar-trigger">
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </div>
        );
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default LayoutApp;
