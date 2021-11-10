import Navbar from "./views/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Complaint from "./views/Complaint";
import Login from "./views/Login";
import Logout from "./views/Logout";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import ChangePassword from "./views/ChangePassword";
import Maintenance from "./views/Maintenance";
import Transaction from "./views/Transaction";
import PayMaintenance from "./views/PayMaintenance";
import PersonalStaff from "./views/PersonalStaff";
import SocietyStaff from "./views/SocietyStaff";
import Profile from "./views/Profile";
import Inventory from "./views/Inventory";
function App() {
  return (
    <Router>
      <div className="bg-green-300 dark:bg-gray-800 min-h-screen font-sans">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
          <Route path="/members" element={<Navbar />} />
          <Route path="/properties" element={<Navbar />} />
          <Route
            path="/inventory"
            element={
              <>
                <Navbar />
                <Inventory />
              </>
            }
          />
          <Route
            path="/maintenance"
            element={
              <>
                <Navbar />
                <Maintenance />
              </>
            }
          />
          <Route
            path="/transactions"
            element={
              <>
                <Navbar />
                <Transaction />
              </>
            }
          />
          <Route path="/pay" element={<PayMaintenance />} />
          <Route path="/parking" element={<Navbar />} />
          <Route path="/gatelog" element={<Navbar />} />
          <Route
            path="/societystaff"
            element={
              <>
                <Navbar />
                <SocietyStaff />
              </>
            }
          />
          <Route
            path="/personalstaff"
            element={
              <>
                <Navbar />
                <PersonalStaff />
              </>
            }
          />
          <Route path="/polls" element={<Navbar />} />
          <Route
            path="/complaint"
            element={
              <>
                <Navbar />
                <Complaint />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <Profile />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/resetpassword/:uidb64/:token"
            element={<ResetPassword />}
          />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
