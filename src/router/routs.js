import { MainPage } from "@pages/MainPage/MainPage";
import { FlatPage } from "@pages/FlatPage/FlatPage";

export const routs = [
  { path: "/", element: MainPage },
  { path: "/flat/:id", element: FlatPage },
  { path: "*", element: MainPage },
];
