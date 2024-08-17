import './App.css';
import Navbar from './components/Navbar';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <Navbar />
      {/* <Login /> */}
      {/* <Signup /> */}
      <Dashboard />
    </div>
  );
}

export default App;
