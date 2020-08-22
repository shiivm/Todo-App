import React from "react";

const Footer = () => {
  return (
    <footer className="page-footer bg-dark">
      <div className="footer-copyright text-center py-3">
        © {new Date().getFullYear()} Copyright:
        <a href="/"> ToDo List</a>
      </div>
    </footer>
  );
};

export default Footer;
