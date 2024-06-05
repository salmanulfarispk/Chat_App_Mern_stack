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
        'bg-slate-400',
        'bg-teal-700',
        'bg-red-700',
        'bg-green-700',
        'bg-yellow-700',
        'bg-orange-700'
     ]

     const randomnum= Math.floor(Math.random() * 5)   //generates a random number between 0 and max(here5)

  return (
    <div className={`text-slate-300 overflow-hidden rounded-full shadow border text-3xl font-bold ${bgcolor[randomnum]}`}
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
               <div className='overflow-hidden rounded-full flex
               justify-center items-center' style={{width: width+"px",height: height+"px"}}>
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
