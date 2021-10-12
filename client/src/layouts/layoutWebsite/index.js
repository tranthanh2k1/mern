import React from "react";
import Footer from "../../components/website/Footer";
import Header from "../../components/website/Header";

const LayoutWebsite = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutWebsite;
