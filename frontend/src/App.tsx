import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RoutingController from './Routing'

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <RoutingController />
            </BrowserRouter>
        </div>
    )
}
