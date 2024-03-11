import Home from "@/views/Home/index.vue";
import Center from "@/views/Center/index.vue";
import UserAdd from "@/views/user-manage/UserAdd.vue";
import UserList from "@/views/user-manage/UserList.vue";
import NewsAdd from "@/views/news-manage/NewsAdd.vue";
import NewsList from "@/views/news-manage/NewsList.vue";
import NewsEdit from "@/views/news-manage/NewsEdit.vue";
import ProductAdd from "@/views/product-manage/ProductAdd.vue";
import ProductList from "@/views/product-manage/ProductList.vue";
import ProductEdit from "@/views/product-manage/ProductEdit.vue";
// 定义一个函数来创建路由对象，以减少重复代码
const createRoute = (path, component, requireAdmin = false) => ({
  path,
  component,
  requireAdmin,
});

const routes = [
  { path: "/", redirect: "/index" },
  createRoute("/index", Home),
  createRoute("/center", Center),
  createRoute("/user-manage/useradd", UserAdd, true),
  createRoute("/user-manage/userlist", UserList, true),
  createRoute("/news-manage/newslist", NewsList),
  createRoute("/news-manage/newsadd", NewsAdd),
  createRoute("/news-manage/editnews/:id", NewsEdit),
  createRoute("/product-manage/productadd", ProductAdd),
  createRoute("/product-manage/productlist", ProductList),
  createRoute("/product-manage/productedit/:id", ProductEdit),
];

export default routes;
