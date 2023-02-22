import { ConfigProvider, theme } from 'antd'
import ChapterEdit from 'pages/ChapterEdit'
import ManageArticleCategories from 'pages/ManageArticleCategories'
import ManageArticleCreate from 'pages/ManageArticleCreate'
import ManageArticles from 'pages/ManageArticles'
import ManageArticleUpdate from 'pages/ManageArticleUpdate'
import ManagePublications from 'pages/ManagePublications'
import ManageStories from 'pages/ManageStories'
import ManageStoryCategories from 'pages/ManageStoryCategories'
import ManageStoryDetails from 'pages/ManageStoryDetails'
import ManageUserDetails from 'pages/ManageUserDetails'
import ManageUsers from 'pages/ManageUsers'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    id: '/',
    path: '/',
    element: <Home />
  },
  {
    id: '/users',
    path: '/users',
    element: <ManageUsers />
  },
  {
    id: '/users/:id',
    path: '/users/:id',
    element: <ManageUserDetails />
  },
  {
    id: '/publications',
    path: '/publications',
    element: <ManagePublications />
  },
  {
    id: '/stories',
    path: '/stories',
    element: <ManageStories />
  },
  {
    id: '/stories/categories',
    path: '/stories/categories',
    element: <ManageStoryCategories />
  },
  {
    id: '/stories/:id',
    path: '/stories/:id',
    element: <ManageStoryDetails />
  },
  {
    id: '/articles',
    path: '/articles',
    element: <ManageArticles />
  },
  {
    id: '/articles/create',
    path: '/articles/create',
    element: <ManageArticleCreate />
  },
  {
    id: '/articles/:articleId/edit',
    path: '/articles/:articleId/edit',
    element: <ManageArticleUpdate />
  },
  {
    id: '/articles/categories',
    path: '/articles/categories',
    element: <ManageArticleCategories />
  },
  {
    id: '/auth/:sectionId',
    path: '/auth/:sectionId',
    element: <Auth />
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
