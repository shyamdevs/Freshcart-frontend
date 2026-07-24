import { Outlet } from "react-router-dom";
import Accdash from "./Accdash";
import Navbar from "../Homepage/Navbar";
import Footer from "../Homepage/Footer";
import { useEffect, useState } from "react";

export default function AccountLayout() {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          display: isMobile ? "block" : "flex",
          width: "100%",
          minHeight: "100vh",
          alignItems: "flex-start",
        }}
      >
        <Accdash />

        <div
          style={{
            
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
}