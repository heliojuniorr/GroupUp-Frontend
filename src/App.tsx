import { GlobalStyle } from "./styles/global";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { GroupList } from "./pages/GroupList";
import { EventList } from "./pages/EventList";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/grouplist" exact component={GroupList}/>
            <Route path="/eventlist" exact component={EventList}/>
          </Switch>
          <GlobalStyle/>
        </AuthContextProvider>
      </BrowserRouter>
    </>  
  );
}

export default App;
