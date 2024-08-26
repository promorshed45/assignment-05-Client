import { Outlet } from "react-router";
import Navbar from "./pages/Home/Navbar";
import Footer from "./pages/Home/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
