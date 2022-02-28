import Login from "./components/Login";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Login Route */}
        <Route path="login" element={<Login />} />

        {/* Home Route */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Missing Route */}
        <Route element={<RequireAuth />}>
          <Route path="*" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
