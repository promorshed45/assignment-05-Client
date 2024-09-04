import { Outlet } from "react-router";
import Navbar from "./components/Home/Navbar";
import Footer from "./components/Home/Footer";
import ScrollButton from "./components/ScrollButton";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollButton/>
    </>
  );
}

export default App;
