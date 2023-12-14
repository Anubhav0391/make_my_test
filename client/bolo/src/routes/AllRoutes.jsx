import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TeacherTest from '../pages/TeacherTest'
import StudentTest from '../pages/StudentTest'
import Tests from '../pages/Tests'
import { Home } from '../pages/Home'

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/tests' element={<Tests/>}/>
      <Route path='/create' element={<TeacherTest/>}/>
      <Route path='/edit/:id' element={<TeacherTest/>}/>
      <Route path='/open/:id' element={<StudentTest/>}/>
    </Routes>
  )
}
