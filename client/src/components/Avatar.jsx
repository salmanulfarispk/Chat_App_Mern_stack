import React from 'react'
import { PiUserCircle } from 'react-icons/pi'
import { useSelector } from 'react-redux'

export default function Avatar({userId,name,image,width,height}) {

    const onlineUser= useSelector(state => state?.user?.onlineUser)


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


     const isOnline = onlineUser.includes(userId) 
    

  return (
    <div className={`text-slate-800  rounded-full font-bold relative`} style={{width : width+"px", height : height+"px" }}
    >

     {
        image ? (
          <img src={image}
          alt={name}
          height={height}
          width={width}
          className='overflow-hidden rounded-full w-full h-full' 
          />
        ):(
            name ? (
               <div className={`overflow-hidden rounded-full flex border text-lg 
               justify-center items-center  ${bgcolor[randomnum]}`} style={{width : width+"px", height : height+"px" }}>
                     {avatarname}
                </div>
            ) : (

                <PiUserCircle size={width}/>   
            )
        )
     }

      {
        isOnline && (
             
       <div className='bg-green-600 p-1 absolute bottom-2 right-0 rounded-full'>
           
        </div>

        )
      }
  

    </div>
  )
}
