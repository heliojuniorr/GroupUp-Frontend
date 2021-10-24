import { GlobalStyle } from "./styles/global";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Home/>  
        <GlobalStyle/>
      </AuthContextProvider>
    </>  
  );
}

export default App;
