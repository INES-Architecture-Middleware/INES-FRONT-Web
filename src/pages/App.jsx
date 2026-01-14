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
            Request.get('/me').then((res) => {
                window.localStorage.setItem("userId", res._id)
                window.localStorage.setItem("username", res.username)
                setLogged(true)
            }).catch(err => {
                window.localStorage.removeItem("authToken")
                window.localStorage.removeItem("username")
                window.localStorage.removeItem("userId")
                setLogged(false)
            })
        }
        else setLogged(false)
    }, [])

    const login = (token, userId, username) => {
        window.localStorage.setItem("authToken", token)
        window.localStorage.setItem("userId", userId)
        window.localStorage.setItem("username", username)

        if(window.localStorage.getItem("current_team_name") && window.localStorage.getItem("current_team_pokemons")){
            const name = window.localStorage.getItem("current_team_name")
            const team = window.localStorage.getItem("current_team_pokemons")
            const teamParse = JSON.parse(team)

            Request.post('/team', {
                name:name,
                pokemonIds:teamParse,
                user:{
                    _id:userId,
                }
            }).then(res => {
                window.localStorage.removeItem("current_team_name")
                window.localStorage.removeItem("current_team_pokemons")
            }).catch(err => {
                console.log(err)
            })
        }

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
                            <Home logged={logged}/>
                        </div>
                        {/* <Footer/> */}
                        <Popup/>
                    </div>}/>
                    {!logged && <>
                        <Route path={'/login'} element={<Login login={login} tab={'login'}/>}/>
                        <Route path={'/register/:token'} element={<Login login={login} tab={'register'}/>}/>
                    </>}
            </Routes>
        </BrowserRouter>
    )
}

export default App
