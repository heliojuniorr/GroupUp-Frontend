import { GlobalStyle } from "./styles/global";
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { GroupList } from "./pages/groupPages/GroupList";
import { EventList } from "./pages/eventPages/EventList";
import { NewGroup } from "./pages/groupPages/NewGroup";
import { Header } from "./components/Header";
import { MyGroups } from "./pages/groupPages/MyGroups";
import { Group } from "./pages/groupPages/Group";
import { Event } from "./pages/eventPages/Event";
import { NewEvent } from "./pages/eventPages/NewEvent";
import { LogOut } from "./components/LogOut";
import { Profile } from "./pages/Profile";
import { MyEvents } from "./pages/eventPages/MyEvents";

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
            <Route path="/myevents" exact component={MyEvents}/>
            <Route path="/eventlist" exact component={EventList}/>
            <Route path="/event/:id" exact component={Event}/>
            <Route path="/newevent" exact component={NewEvent}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/logout" exact component={LogOut}/>
          </Switch>
          <GlobalStyle/>
        </AuthContextProvider>
      </BrowserRouter>
    </>  
  );
}

export default App;
