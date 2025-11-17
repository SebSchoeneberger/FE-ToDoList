import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Mainlayout from './layouts/Mainlayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import SignUp from './pages/SignUp';
import CreateTodo from './pages/CreateToDo';
import ToDoDetails from './pages/ToDoDetails';
import Categories from './pages/Categories';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Mainlayout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />

      <Route element={<ProtectedLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='create-todo' element={<CreateTodo />} />
        <Route path='todo/:id' element={<ToDoDetails />} />
        <Route path='categories' element={<Categories />} />
      </Route>
    </Route>
  )
);

const App = () => (
  <RouterProvider router={router} />
)

export default App
