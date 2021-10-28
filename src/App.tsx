import { GlobalStyle } from "./styles/global";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { GroupList } from "./pages/GroupList";
import { EventList } from "./pages/EventList";
import { NewGroup } from "./pages/NewGroup";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Header/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/grouplist" exact component={GroupList}/>
            <Route path="/newgroup" exact component={NewGroup}/>
            <Route path="/eventlist" exact component={EventList}/>
          </Switch>
          <GlobalStyle/>
        </AuthContextProvider>
      </BrowserRouter>
    </>  
  );
}

export default App;
