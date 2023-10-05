import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from '../layouts/Root'
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import News from "../pages/News/News";
import PrivateRoute from "./PrivateRoute";

const router =createBrowserRouter([

    {
        path: '/',
        element: <Root></Root>,
        children: [


            {
                path:'/',
                element:<Home></Home>,

                // load koro data

                loader:() => fetch('/news.json')
            },

            {
                path: '/news/:id',
                element:<PrivateRoute><News></News></PrivateRoute>
                // element:<News></News>

            },


            {

                path:'/login',
                element:<Login></Login>
            },
            {

                path:'/register',
                element:<Register></Register>
            }
        ]

    }
]);
export default router;

