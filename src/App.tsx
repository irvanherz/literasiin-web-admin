import { ConfigProvider, theme } from 'antd'
import ChapterEdit from 'pages/ChapterEdit'
import StoryDetails from 'pages/StoryDetails'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import UserDetails from './pages/UserDetails'

const router = createBrowserRouter([
  {
    id: '/',
    path: '/',
    element: <Home />
  },
  {
    id: '/auth/:sectionId',
    path: '/auth/:sectionId',
    element: <Auth />
  },
  {
    id: '/users/:userId',
    path: '/users/:userId',
    element: <UserDetails />
  },
  {
    id: '/stories/:storyId',
    path: '/stories/:storyId',
    element: <StoryDetails />
  },
  {
    id: '/stories/:storyId/chapters/:chapterId/write',
    path: '/stories/:storyId/chapters/:chapterId/write',
    element: <ChapterEdit />
  },
  {
    id: '*',
    path: '*',
    element: <NotFound />
  }
])

function App () {
  return (
    <div className="App">
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  )
}

export default App
