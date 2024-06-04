import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Register from "../pages/Register"
import Password from "../pages/Password"
import EmailPage  from "../pages/EmailPage"
import Home from "../pages/Home"
import Message from "../components/Message"
import Authlayout from "../layout/common"




const router= createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path:"/register",
                element: <Authlayout><Register/></Authlayout>
            },
            {
                path:"/emailpage",
                element:<Authlayout><EmailPage/></Authlayout>
            },
            {
                path:"/passwordpage",
                element:<Authlayout><Password/></Authlayout>
            },
            {
                path:"",
                element:<Home/>,
                children:[{
                    path:"/:userId",
                    element:<Message/>
                }]
            }
        ]
    }
])

export default router;