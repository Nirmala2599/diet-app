



import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DietForm from "./pages/DietForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

function App() {
  return (
    
     <BrowserRouter>
      <div className="min-h-screen flex flex-col">


      
      <Header />
      

      <div className="flex-grow">
        <Routes>
        <Route
          path="/"
          element={<Login />}
        />
         <Route
          path="/register"
          element={<Register />}
        />
         <Route
          path="/diet"
          element={<DietForm />}
        />
        <Route 
        path="/profile" 
        element={<Profile />} />
        
      </Routes>
      
    
     </div>

      <Footer />

    </div>
    </BrowserRouter>
  );
}

export default App;