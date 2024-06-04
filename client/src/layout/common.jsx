import React from "react"
import logo from "../assets/logo.png"


const Authlayout=({children})=>{
    return (
         <>
         <header className="flex items-center justify-center py-3 h-20 shadow-md bg-white">
            <img src={logo} alt="logo" width={180} height={60}/>
         </header>

         {children}
         </>
    )
}

export default Authlayout