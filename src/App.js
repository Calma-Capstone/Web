import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from './context/AuthContext'
import UnauthRoutes from "./Routes/UnauthRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
function App() {
  const { state } = React.useContext(AuthContext);
  return (
    <div className="App">
      <Router>
      
        {!state.isAuthenticated ?
          <UnauthRoutes />
          : <AuthRoutes />}
    
      </Router>
    </div>
  );
}

export default App;
