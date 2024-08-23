import './App.css';
import Banner from './Components/Banner';
import Navbar from './Components/Navbar';
import Movies from './Components/Movies';
import WatchList from './Components/WatchList';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' 
        element = {
               <>
                 
                  <Banner/>
                  <Movies/>
                  
               </>
        }/> 

     <Route path='/WatchList'
         element={<WatchList/>}/>  
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
