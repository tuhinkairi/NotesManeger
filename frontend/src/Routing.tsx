import {  Route, Routes } from 'react-router-dom'
import DashboardLayout from './ui/dashboard/DashboardLayout'
import Dashboard from './ui/dashboard/Dashboard'
import DashboardNotes from './ui/dashboard/DashboardNotes'
import DashboardProfile from './ui/dashboard/DashboardProfile'
import DashboardSettings from './ui/dashboard/DashboardSettings'
import Home from './ui/home/Home'
import AuthLayout from './ui/auth/AuthLayout'
import Login from './ui/auth/Login'
import Register from './ui/auth/Register'

export default function RoutingController() {
  return (
   <Routes>
        <Route index element={<Home/>}/>
        <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="notes" element={<DashboardNotes/>}/>
            <Route path="profile" element={<DashboardProfile/>}/>
            <Route path="settings" element={<DashboardSettings/>}/>
        </Route>
        <Route path="/auth" element={<AuthLayout/>}>
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
        </Route>
   </Routes>
  )
}
