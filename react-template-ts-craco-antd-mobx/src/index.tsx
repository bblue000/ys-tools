import "@/assets/styles/reset.scss";

import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from "dayjs";

import "dayjs/locale/zh-cn";

import zhCN from "antd/locale/zh_CN";
import routes from "./router";

dayjs.locale("zh-cn");

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={createHashRouter(routes)} />
    </ConfigProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
