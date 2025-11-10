import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Mainlayout from './layouts/Mainlayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Mainlayout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='dashboard' element={<Dashboard />} />
    </Route>
  )
);

const App = () => (
  <RouterProvider router={router} />
)

export default App
