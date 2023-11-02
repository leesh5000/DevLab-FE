import React from "react";
import logo from "../public/logo.png"

export const Logo = () => {
  return (
    <a href="/" className="flex items-center">
      <img src={logo} alt="logo" className="h-10 mr-3"/>
      <span className="self-center my-4 text-3xl font-semibold whitespace-nowrap dark:text-white">DevMoa</span>
    </a>
  );
}
