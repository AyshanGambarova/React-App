import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from 'react-router-dom';
import './tailwind.css'
import MainLayout from './layouts/MainLayout';
import Users from "./views/Users";
import Posts from "./views/Posts";
import NotFound from "./views/NotFound"
import PostDetails from "./views/Posts/views/Details/index"

const App = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout/>}>
                <Route path='/users' element={<Users/>}/>
                <Route path='/posts' element={<Posts/>}/>
                <Route path='/posts/:id' element={<PostDetails/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Route>
        )
    );

    return <RouterProvider router={router}/>;
};
export default App;