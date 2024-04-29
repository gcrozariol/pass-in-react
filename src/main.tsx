import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Root } from './routes/root'
import { Home } from './routes/home'
import { Events } from './routes/events'
import { Attendees } from './routes/attendees'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: 'attendees',
        element: <Attendees />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
