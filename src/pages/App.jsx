import { useEffect, useState } from 'react'
import './App.scss'
import Nav from '../components/Nav'
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Popup from '../components/Popup'
import Team from './Team'
import Request from '../utils/Request'

function App() {
  const [logged, setLogged] = useState(null)

  useEffect(()=>{
    const authToken = window.localStorage.getItem("authToken")
    if(authToken) {
      setLogged(true)
    }
    else setLogged(false)
  }, [])

//   useEffect(()=>{
//     let path = params['*']

//     switch (path) {
//       case "home":
//         if(currentPage !== "home"){
//           setCurrentPage("home")
//           navigate('/home')
//         }
//         break;
//       default :
//         if(currentPage !== "home"){
//           setCurrentPage("home")
//           navigate('/')
//         }
//     }
//   }, [params])

    const login = (token, userId, username) => {
        window.localStorage.setItem("authToken", token)
        window.localStorage.setItem("userId", userId)
        window.localStorage.setItem("username", username)
        setLogged(true)
    }

    const logout = () => {
        window.localStorage.removeItem("authToken")
        window.localStorage.removeItem("userId")
        window.localStorage.removeItem("username")
        window.location.reload()
    }

    return (
        <BrowserRouter basename='/pokemon-team-planner/'>
            <Routes>
                    <Route path={'/*'} element={<div className='AppContainer'>
                        <Nav logged={logged} logout={logout}/>
                        <div className="AppContent">
                            <Home/>
                        </div>
                        {/* <Footer/> */}
                        <Popup/>
                    </div>}/>
                    <Route path={'/login'} element={<Login login={login} tab={'login'}/>}/>
                    <Route path={'/register/:token'} element={<Login login={login} tab={'register'}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
