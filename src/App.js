import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from "./views/Home";
import Users from "./views/Users";
import Posts from "./views/Posts";
import NotFound from "./views/NotFound"
import PostDetails from "./views/Posts/views/Details/index"
import './tailwind.css'


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/posts' element={<Posts/>}/>
            <Route path='/posts/:id' element={<PostDetails/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router}/>;
};
export default App;