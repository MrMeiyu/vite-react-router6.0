import { atom } from "recoil";

import type { PureSettings } from "@ant-design/pro-layout/lib/defaultSettings";
export type LocaleProps = "zh-cn" | "en-us";

interface MenuItem {
  name: string;
  label: {
    zh_CN: string;
    en_US: string;
  };
  icon?: string;
  key: string;
  path: string;
  children?: MenuItem[];
}

export type MenuChild = Omit<MenuItem, "children">;

export type MenuList = MenuItem[];

interface User {
  userName: string;
  menuList: MenuList[];
  locale: LocaleProps;
  collapsed: boolean;
  settings: PureSettings;
}

const initialState: User = {
  userName: localStorage.getItem("userName") || "",
  menuList: [],
  locale: (localStorage.getItem("locale")! ||
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    "en-us") as LocaleProps,
  collapsed: false,
  settings: {
    navTheme: "dark",
    primaryColor: "#1890ff",
    layout: "mix",
    contentWidth: "Fluid",
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
    title: "项目管理",
    iconfontUrl: "",
  },
};

export const userState = atom({
  key: "userState",
  default: initialState,
});
