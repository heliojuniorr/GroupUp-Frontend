import { GlobalStyle } from "./styles/global";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { GroupList } from "./pages/GroupList";
import { EventList } from "./pages/EventList";
import { NewGroup } from "./pages/NewGroup";
import { Header } from "./components/Header";
import { MyGroups } from "./pages/MyGroups";
import { Group } from "./pages/Group";
import { Event } from "./pages/Event";
import { NewEvent } from "./pages/NewEvent";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Header/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/mygroups" exact component={MyGroups}/>
            <Route path="/grouplist" exact component={GroupList}/>
            <Route path="/group/:id" exact component={Group}/>
            <Route path="/newgroup" exact component={NewGroup}/>
            {/*<Route path="/myevents" exact component={MyEvents}/>*/}
            <Route path="/eventlist" exact component={EventList}/>
            <Route path="/event/:id" exact component={Event}/>
            <Route path="/newevent" exact component={NewEvent}/>
          </Switch>
          <GlobalStyle/>
        </AuthContextProvider>
      </BrowserRouter>
    </>  
  );
}

export default App;
