import { ConfigProvider, theme } from 'antd'
import ChapterEdit from 'pages/ChapterEdit'
import ManageArticleCategories from 'pages/ManageArticleCategories'
import ManageArticleDetails from 'pages/ManageArticleDetails'
import ManageArticles from 'pages/ManageArticles'
import ManageConfigurationCreate from 'pages/ManageConfigurationCreate'
import ManageConfigurationEdit from 'pages/ManageConfigurationEdit'
import ManageConfigurations from 'pages/ManageConfigurations'
import ManageKbCategories from 'pages/ManageKbCategories'
import ManageKbCreate from 'pages/ManageKbCreate'
import ManageKbs from 'pages/ManageKbs'
import ManageKbUpdate from 'pages/ManageKbUpdate'
import ManageMedia from 'pages/ManageMedia'
import ManagePublications from 'pages/ManagePublications'
import ManageStories from 'pages/ManageStories'
import ManageStoryCategories from 'pages/ManageStoryCategories'
import ManageStoryChapterDetails from 'pages/ManageStoryChapterDetails'
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
    id: '/configurations',
    path: '/configurations',
    element: <ManageConfigurations />
  },
  {
    id: '/configurations/create',
    path: '/configurations/create',
    element: <ManageConfigurationCreate />
  },
  {
    id: '/configurations/:configId/edit',
    path: '/configurations/:configId/edit',
    element: <ManageConfigurationEdit />
  },
  {
    id: '/users',
    path: '/users',
    element: <ManageUsers />
  },
  {
    id: '/users/:userId',
    path: '/users/:userId',
    element: <ManageUserDetails />
  },
  {
    id: '/users/:userId/:sectionId',
    path: '/users/:userId/:sectionId',
    element: <ManageUserDetails />
  },
  {
    id: '/media',
    path: '/media',
    element: <ManageMedia />
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
    id: '/stories/:storyId',
    path: '/stories/:storyId',
    element: <ManageStoryDetails />
  },
  {
    id: '/stories/:storyId/:sectionId',
    path: '/stories/:storyId/:sectionId',
    element: <ManageStoryDetails />
  },
  {
    id: '/stories/chapters/:chapterId',
    path: '/stories/chapters/:chapterId',
    element: <ManageStoryChapterDetails />
  },
  {
    id: '/stories/chapters/:chapterId/:sectionId',
    path: '/stories/chapters/:chapterId/:sectionId',
    element: <ManageStoryChapterDetails />
  },
  {
    id: '/articles',
    path: '/articles',
    element: <ManageArticles />
  },
  {
    id: '/articles/:articleId',
    path: '/articles/:articleId',
    element: <ManageArticleDetails />
  },
  {
    id: '/articles/:articleId/:sectionId',
    path: '/articles/:articleId/:sectionId',
    element: <ManageArticleDetails />
  },
  {
    id: '/articles/categories',
    path: '/articles/categories',
    element: <ManageArticleCategories />
  },
  {
    id: '/publications',
    path: '/publications',
    element: <ManagePublications />
  },
  {
    id: '/kbs',
    path: '/kbs',
    element: <ManageKbs />
  },
  {
    id: '/kbs/create',
    path: '/kbs/create',
    element: <ManageKbCreate />
  },
  {
    id: '/kbs/:kbId/edit',
    path: '/kbs/:kbId/edit',
    element: <ManageKbUpdate />
  },
  {
    id: '/kbs/categories',
    path: '/kbs/categories',
    element: <ManageKbCategories />
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
