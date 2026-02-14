import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import BaseLayout from './layouts/BaseLayout'

export default function RoutingControl() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}
