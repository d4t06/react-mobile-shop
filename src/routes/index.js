import SearchResultPage from '../pages/SearchResultPage'
import Home from "../pages/Home";
import DetailPage from "../pages/DetailPage";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from '../pages/Register'
import Unauthorized from '../pages/UnauthorizedPage';
import AdminPage from '../pages/AdminPage';

const publicRoutes = [
   {
      path: "/",
      component: Home,
   },
   {
      path: "/unauthorized",
      component: Unauthorized,
   },
   {
      path: "/login",
      component: Login,
   },
   {
      path: "/register",
      component: Register,
   },
   {
      path: "/:category",
      component: Products,
   },
   {
      path: "/search/:key",
      component: SearchResultPage,
   },
   {
      path: "/:category/:key",
      component: DetailPage,
   },
   

];


const privateRoutes = [
   {
      path:'/account',
      role: ["R1", "R2", "R3"],
      component: <h1>Account Page</h1>
   },
   {
      path:'/admin',
      role: ["R1"],
      component: AdminPage
   },
   {
      path:'/create',
      role: ["R1"],
      component: <h1>Create Page</h1>
   }
]
export { publicRoutes, privateRoutes };
