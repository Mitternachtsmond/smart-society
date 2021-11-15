import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import Maintenance from "./components/payments/Maintenance";
import GateLogs from "./components/GateLogs"
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Transactions from "./components/payments/Transaction";
import PayMaintenance from "./components/payments/PayMaintenance";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PersonalStaff from "./components/PersonalStaff";
import SocietyStaff from "./components/SocietyStaff";
import Funds from "./components/payments/Funds";
import GateLogForm from "./components/GateLogForm";
import ReadGateLog from "./components/ReadGateLog";
import ReadParking from "./components/ReadParking";
// eslint-disable-next-line

function App() {
  return (
    
    <Router>
      <div className="bg-green-100 dark:bg-gray-800 min-h-screen font-sans">
        <Switch>
          <Route exact path="/inventory">
            <Navbar />
            <Inventory />
          </Route>
          <Route exact path="/personalStaff">
            <Navbar />
            <PersonalStaff />
          </Route>
          <Route exact path="/societyStaff">
            <Navbar />
            <SocietyStaff />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/maintenance">
            <Navbar />
            <Maintenance />
          </Route>
          <Route exact path="/pay">
            <Navbar />
            <PayMaintenance />
          </Route>
          <Route exact path="/transactions">
            <Navbar />
            <Transactions />
          </Route>
          <Route exact path="/funds">
            <Navbar />
            <Funds />
          </Route>
          <Route exact path="/">
            <Navbar />
            <Dashboard />
          </Route>
          <Route exact path="/gate_log">
            <Navbar />
            <GateLogs />
          </Route>
          <Route exact path="/gate_form">
            <Navbar />
            <GateLogForm />
          </Route>
          <Route exact path="/read_logs">
            <Navbar />
            <ReadGateLog />
          </Route>
          <Route exact path="/read_parking">
            <Navbar />
            <ReadParking />
          </Route>
          <Route exact path="/members">
            <Navbar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
