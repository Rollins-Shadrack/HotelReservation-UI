import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home';
import List from './Pages/list/List'
import Hotel from './Pages/hotel/Hotel'
import './'
import Login from './Pages/login/Login';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/hotels' element={<List/>}/>
          <Route path='/hotels/:id' element={<Hotel/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
