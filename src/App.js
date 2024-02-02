import { Routes, Route } from 'react-router-dom';
import Home from './pages/homepage';
import NavBar from './components/NavBar';
import Register from './pages/register';
import Login from './pages/login';
import { PERSON_LOGIN } from '../src/pages/login'
import { useSubscription } from "@apollo/client";

function App() {
  const { data, loading } = useSubscription(PERSON_LOGIN,)
console.log(data?.personLogin)
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
