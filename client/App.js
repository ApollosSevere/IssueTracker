import React from "react";

import Navbar from "./components/Navbar/Navbar";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <Navbar /> {/* <-- Remove from here when config complete! */}
      <Routes />
    </div>
  );
};

export default App;
