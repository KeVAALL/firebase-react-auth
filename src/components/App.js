import AuthProvider from "../context/AuthContext";
import Signup from "./Signup";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Signup />
      </div>
    </AuthProvider>
  );
}

export default App;
