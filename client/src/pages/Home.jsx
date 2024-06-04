import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div>
         home
      <section>
        <Outlet/>
      </section>
    </div>
  )
}
