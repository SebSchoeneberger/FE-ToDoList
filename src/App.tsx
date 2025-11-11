import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Mainlayout from './layouts/Mainlayout';
import ProtectedLayout from './layouts/ProtectedLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Mainlayout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />

      <Route element={<ProtectedLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
      </Route>
    </Route>
  )
);

const App = () => (
  <RouterProvider router={router} />
)

export default App
