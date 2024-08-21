import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Dashboard from "./components/Dashboard/Dashboard";
import { DataContext } from "./components/context/context";
import { useContext } from "react";
import { SnackbarProvider } from 'notistack'

function App() {
  const context = useContext(DataContext);
  
  return (
    <div>
      <Navbar />
      <SnackbarProvider>
        {
          context.isLoggedIn === true ? <Dashboard /> : 
          <>{
            context.userSignup === false ? <Signup /> : <Login/>
          }</>
        }
       </SnackbarProvider>
    </div>
  );
}

export default App;
