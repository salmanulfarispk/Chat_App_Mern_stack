import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Register from "../pages/Register"
import Password from "../pages/Password"
import EmailPage  from "../pages/EmailPage"
import Home from "../pages/Home"
import Message from "../components/Message"




const router= createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path:"/register",
                element: <Register/>
            },
            {
                path:"/emailpage",
                element:<EmailPage/>
            },
            {
                path:"/passwordpage",
                element:<Password/>
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