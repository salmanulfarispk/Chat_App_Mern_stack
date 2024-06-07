import React from 'react'
import { PiUserCircle } from 'react-icons/pi'

export default function Avatar({userId,name,image,width,height}) {

  //like if SalmanFAris ,it show two lettes like  SF

    let avatarname= ""

     if(name){
        const splitName= name?.split(" ")
        
        if(splitName.length > 1){
            avatarname= splitName[0][0]+splitName[1][0]
        }else{
            avatarname= splitName[0][0]
        }
     }


     const bgcolor=[
        'bg-sky-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-violet-200',
        'bg-slate-200'
     ]

     const randomnum= Math.floor(Math.random() * 5)   //generates a random number between 0 and max(here5)

  return (
    <div className='text-slate-800 overflow-hidden rounded-full font-bold'
    style={{width: width+"px",height: height+"px"}}>

     {
        image ? (
          <img src={image}
          alt={name}
          height={height}
          width={width}
          className='overflow-hidden rounded-full' 
          />
        ):(
            name ? (
               <div className={`overflow-hidden rounded-full flex border text-lg 
               justify-center items-center  ${bgcolor[randomnum]}`} style={{width: width+"px",height: height+"px"}}>
                     {avatarname}
                </div>
            ) : (

                <PiUserCircle size={width}/>   
            )
        )
     }

    </div>
  )
}
