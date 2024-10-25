import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Templates from './pages/Templates';
import Dashboard from './pages/Dashboard';
import GoalsComponent from './pages/Goal';

function App() {
  const {user}=useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={user?<Home/>:<Navigate to='/login'/>}
            />
            <Route
              path='/templates'
              element={user?<Templates/>:<Navigate to='/login'/>}
            />
            <Route
              path='/dashboard'
              element={user?<Dashboard/>:<Navigate to='/login'/>}
            />
            <Route
              path='/login'
              element={!user?<Login/>:<Navigate to ='/'/>}
            />
            <Route
              path='/signup'
              element={!user?<Signup/>:<Navigate to ='/'/>}
            />
            <Route
            path='/goals'
            element={<GoalsComponent/>}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
