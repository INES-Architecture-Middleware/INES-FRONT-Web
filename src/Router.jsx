import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import SignIn from './pages/SignIn.jsx'

const Router = (props) => {
    return (
        <BrowserRouter basename='/'>
            <Routes>
                <Route path={'/*'} element={<App/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register/:token'} element={<SignIn/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router