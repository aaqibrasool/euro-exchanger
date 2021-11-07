import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Header from './components/Header';
import { LOCAL_STORAGE_KEY } from './constant';


function App() {
  const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

  return (
    <Router>
      <CssBaseline />
      <Header />
      <Routes>
        <Route exact path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
