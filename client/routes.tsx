import App from './components/App'
import Home from './components/Home'
import Arena from './components/Arena'

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom'

export const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
    </Route>

    <Route path="/arena" element={<Arena />} />
  </>,
)

export const router = createBrowserRouter(routes)
