import { RouterProvider } from 'react-router-dom'
import AppRoutes from './router/index'

const App: React.FC = () => {
  return <RouterProvider router={AppRoutes} />
}

export default App
