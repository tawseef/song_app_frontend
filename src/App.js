import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Dashboard from "./components/Dashboard/Dashboard";
import { DataProvider } from "./components/context/context";

function App() {
  return (
    <div>
      <Navbar />
      <DataProvider>
        {/* <Login /> */}
        {/* <Signup /> */}
        <Dashboard />
      </DataProvider>
    </div>
  );
}

export default App;
