import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/Privateroute";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </>
  );
}
export default App;
