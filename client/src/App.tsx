// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./lib/apollolient";
import Plans from "./pages/Plans";
import Subscriptions from "./pages/Subscription";
import Invoices from "./pages/Invoice";
import Profile from "./pages/ProfileEdit";


export default function App() {
  return (
     <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/plans" element={<Plans />} />
        <Route path="/dashboard/subscriptions" element={<Subscriptions />} />
        <Route path="/dashboard/invoices" element={<Invoices />} />
        <Route path="/dashboard/profile" element={<Profile />} />
      </Routes>
    </Router>
    </ApolloProvider>
  );
}
