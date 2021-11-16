import Navbar from "./navigation/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./societyInfo/Dashboard";
import AddAnnouncement from "./societyInfo/AddAnouncement"
import Complaint from "./societyInfo/Complaint";
import Login from "./users/Login";
import Logout from "./users/Logout";
import ForgotPassword from "./users/ForgotPassword";
import ResetPassword from "./users/ResetPassword";
import ChangePassword from "./users/ChangePassword";
import Maintenance from "./payments/Maintenance";
import Transaction from "./payments/Transaction";
import AddTransaction from "./payments/AddTransaction";
import PayMaintenance from "./payments/PayMaintenance";
import PenaltyRate from "./payments/PenaltyRate";
import PersonalStaff from "./staff/PersonalStaff";
import SocietyStaff from "./staff/SocietyStaff";
import Profile from "./users/Profile";
import Inventory from "./societyInfo/Inventory";
import Account from "./users/Account";
import Member from "./users/Member";
import Property from "./societyInfo/Property";
import Register from "./users/Register";
import AccountUpdate from "./users/UpdateAccount";
import AddInventory from "./societyInfo/AddInventory";
import UpdateInventory from "./societyInfo/UpdateInventory";
import AddProperty from "./societyInfo/AddProperty";
import UpdateProperty from "./societyInfo/UpdateProperty";
import AddMember from "./users/AddMember";
import UpdateMember from "./users/UpdateMember";
import AddPersonalStaff from "./staff/AddPersonalStaff";
import AddSocietyStaff from "./staff/AddSocietyStaff";
import UpdatePersonalStaff from "./staff/UpdatePersonalStaff";
import UpdateSocietyStaff from "./staff/UpdateSocietyStaff";
import Error from "./basicComponents/Error";
import ViewTransaction from "./payments/ViewTransaction";
import Polls from "./polls/Polls";
import AddPoll from "./polls/AddPoll";
import Vote from "./polls/Vote";
import ReadParking from "./parking/ReadParking";
import AddParking from "./parking/AddParking";
import GateLogForm from "./GateLogs/GateLogForm";
import GateLogs from "./GateLogs/GateLogs";
import UpdateParking from "./parking/UpdateParking";



function App() {
  return (
    <Router>
      <div className="bg-green-300 dark:bg-gray-800 min-h-screen font-sans">
        <Routes>
          <Route
            path="/404"
            element={
              <>
                <Error />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/announcements/add"
            element={
              <>
                <Navbar />
                <AddAnnouncement />
              </>
            }
          />
          <Route
            path="/accounts"
            element={
              <>
                <Navbar />
                <Account />
              </>
            }
          />
          <Route
            path="/accounts/:username"
            element={
              <>
                <Navbar />
                <AccountUpdate />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <Register />
              </>
            }
          />
          <Route
            path="/members"
            element={
              <>
                <Navbar />
                <Member />
              </>
            }
          />
          <Route
            path="/members/add"
            element={
              <>
                <Navbar />
                <AddMember />
              </>
            }
          />
          <Route
            path="/members/change/:propertyNo"
            element={
              <>
                <Navbar />
                <UpdateMember />
              </>
            }
          />
          <Route
            path="/properties"
            element={
              <>
                <Navbar />
                <Property />
              </>
            }
          />
          <Route
            path="/properties/add"
            element={
              <>
                <Navbar />
                <AddProperty />
              </>
            }
          />
          <Route
            path="/properties/change/:propertyType"
            element={
              <>
                <Navbar />
                <UpdateProperty />
              </>
            }
          />
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
            path="/inventory/add"
            element={
              <>
                <Navbar />
                <AddInventory />
              </>
            }
          />
          <Route
            path="/inventory/change/:item"
            element={
              <>
                <Navbar />
                <UpdateInventory />
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
            path="maintenance/pay"
            element={
              <>
                <Navbar />
                <PayMaintenance />
              </>
            }
          />
          <Route
            path="maintenance/penalty"
            element={
              <>
                <Navbar />
                <PenaltyRate />
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
          <Route
            path="/transactions/add"
            element={
              <>
                <Navbar />
                <AddTransaction />
              </>
            }
          />
          <Route
            path="/transactions/view/:sno"
            element={
              <>
                <Navbar />
                <ViewTransaction />
              </>
            }
          />
          <Route 
          path="/parking"
          element={
          <>
          <Navbar />
          <ReadParking />
          </>
          } 
          />
          <Route 
          path="/parking/add"
          element={
          <>
          <Navbar />
          <AddParking />
          </>
          } 
          />
          <Route 
          path="/parking/change/:parking_id"
          element={
          <>
          <Navbar />
          <UpdateParking />
          </>
          } 
          />
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
            path="/societystaff/add"
            element={
              <>
                <Navbar />
                <AddSocietyStaff />
              </>
            }
          />
          <Route
            path="/societystaff/change/:occupation"
            element={
              <>
                <Navbar />
                <UpdateSocietyStaff />
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
          <Route
            path="/personalstaff/add"
            element={
              <>
                <Navbar />
                <AddPersonalStaff />
              </>
            }
          />
          <Route
            path="/personalstaff/change/:sno"
            element={
              <>
                <Navbar />
                <UpdatePersonalStaff />
              </>
            }
          />
          <Route path="/polls"
            element={
              <>
                <Navbar />
                <Polls />
              </>
            }
          />
          <Route path="/polls/vote/:id"
            element={
              <>
                <Navbar />
                <Vote />
              </>
            }
          />
          <Route path="/polls/add"
            element={
              <>
                <Navbar />
                <AddPoll />
              </>
            }
          />
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
