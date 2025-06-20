import { useEffect, useState } from 'react'
import './App.scss'
import Nav from './components/Nav'
import { Routes, useNavigate, useParams } from 'react-router-dom'
import Home from './pages/Home'
import Popup from './components/Popup'
import Team from './pages/Team'
import Request from './utils/Request'

function App() {
  const [logged, setLogged] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [popupContent, setPopupContent] = useState(null)
  const [team, setTeam] = useState([])
  const [teams, setTeams] = useState([])

  const params = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    const authToken = window.localStorage.getItem("authToken")
    if(authToken) {
      setLogged(true)
      fetchTeams()
    }
    else setLogged(false)
  }, [])

  useEffect(()=>{
    let path = params['*']

    switch (path) {
      case "home":
        if(currentPage !== "home"){
          setCurrentPage("home")
          navigate('/home')
        }
        break;
      default :
        if(currentPage !== "home"){
          setCurrentPage("home")
          navigate('/')
        }
    }
  }, [params])

  const fetchTeams = () => {
    let userId = window.localStorage.getItem('userId')
    if(userId){
      Request.get('/team?userId='+userId).then(res => {
        setTeams(res)
      }).catch(err => {
        console.log(err)
      }) 
    }
  }

  const disconnect = () => {
    window.localStorage.removeItem("authToken")
    window.location.reload()
  }

  const changePopupState = (state, content = null) => {
    if(state) setPopupContent(content)
    else setPopupContent(null)
  }

  const addToTeam = (pokemon) => {
    if(team.length < 6){
      let teamTmp = [...team]
      teamTmp.push(pokemon)
      setTeam(teamTmp)
    }else{
      console.log("Votre team est déjà remplie")
    }
  }

  const removeToTeam = (index) => {
    if(team.length > index){
      let teamTmp = [...team]
      teamTmp.splice(index, 1)
      setTeam(teamTmp)
    }
  }

  const saveTeam = (_t) => {
    const userId = window.localStorage.getItem('userId')
    if(userId){
      if(_t._id){
        Request.put('/team', {
          _id: _t._id,
          name:_t.name,
          pokemonIds:team.map(t => t.id),
          user:{
            _id:userId,
          }
        }).then(res => {
          fetchTeams()
        }).catch(err => {
          console.log(err)
          return
        })
      }else{
        Request.post('/team', {
          name:_t.name,
          pokemonIds:team.map(t => t.id),
          user:{
            _id:userId,
          }
        }).then(res => {
          fetchTeams()
        }).catch(err => {
          console.log(err)
          return
        })
      }
    }
  }

  const deleteTeam = (team) => {
    if(team && team._id){
      Request.delete('/team/'+team._id).then(res => {
        fetchTeams()
      }).catch(err => {
        console.log(err)
        return
      })
    }
  }

  return (
    <div className='AppContainer'>
      <Nav logged={logged} disconnect={disconnect}/>
      <div className="AppContent">
        <Team newTeam={team} teams={teams} deleteTeam={deleteTeam} saveTeam={saveTeam} removeToTeam={removeToTeam} setTeam={setTeam}/>
        <div className="PageContent">
          <Home changePopupState={changePopupState} addToTeam={addToTeam}/>
        </div>
      </div>
      <Popup content={popupContent}/>
    </div>
  )
}

export default App
