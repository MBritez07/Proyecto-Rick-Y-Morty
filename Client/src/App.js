import './App.css';
import Cards from './components/Cards/Cards.jsx';
import style from './App.module.css';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import { useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState} from 'react';
import  axios  from 'axios';
import {Routes,Route } from 'react-router-dom'; //necesario para usar el route
import Forms from './components/Forms/Forms';
import Favorites from './components/favorites/favorites';

  // //  //Credenciales Fake
  //   const email= "britezmicaela2@gmail.com";
  //    const password= "MIIIK07";

function App() {
   //!HOOKS
   const location =useLocation();
   const navigate = useNavigate();
   let [characters, setCharacters]=useState([]);
   const [access, setAccess]= useState(false);
   
   const login = (userData) => {                     //Esta funcion le manda info al back 
         const { email, password } = userData;
         const URL = 'http://localhost:3001/rickandmorty/login/'; //esta es la ruta (url) de nuestro back
         axios(URL + `?email=${email}&password=${password}`)//le esta concatenando la query 
         .then(({ data }) => {//destructurin de data 
            const { access } = data;
            setAccess(access);
            access && navigate('/home');
      })
   }; 
   useEffect(() => {
    if (!access) {
      navigate('/');
    }
  }, [access, navigate]);
  

   //! EVENTHANDLERS
   const onSearch = (id) => {
      axios(`http://localhost:3001/rickandmorty/character/${id}`)
        .then(response => {
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error('¡No hay personajes con este ID!');
          }
        })
        .then((data) => {
          setCharacters((oldChars) => [...oldChars, data]);
        })
        .catch(error => {
          alert('¡No hay personajes con este ID!');
        });
    }
    
   let onClose = (id) => {
      const characterfiltered= characters.filter(characters=>
      characters.id !==Number(id))
      setCharacters(characterfiltered)}
      
   

   return (
      <div className='App' style = {{padding: "26px",}}>
      <div className={style.navbar}>
     </div> 
     
      {location!=="/" && <Nav onSearch={onSearch} access={access} setAccess={setAccess}/>}
      <Routes>
      <Route path = "/" element={<Forms login= {login}/>}/>
      <Route path='/home' element ={ <Cards characters={characters} 
      onClose={onClose}  />} />
      <Route path='/About' element ={<About/>}></Route>
      <Route path='/favorites' element ={<Favorites/>}></Route>

      <Route path='/Detail/:id' element ={<Detail/>}/>
      </Routes>
     <div>
  </div>
  <hr/>
</div>
      
    
   );
   }
export default App;
