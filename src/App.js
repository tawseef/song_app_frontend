import './App.css';
import Navbar from './components/Navbar';
import Login from './components/login/login';
import Signup from './components/signup/signup';

function App() {
  return (
    <div>
      <Navbar />
      {/* <Login /> */}
      <Signup />
    </div>
  );
}

export default App;
