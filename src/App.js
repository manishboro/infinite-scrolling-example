import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollListener = () => {
    const scrollY = document.body.getBoundingClientRect();
    setScrollProgress(Math.trunc(Math.abs(scrollY.top)));
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <div>
      <div className="scroll-heading">Scroll Progress : {scrollProgress}</div>

      <div className="content">
        {new Array(1000).fill(0).map((el, idx) => (
          <div key={idx}>Some Content</div>
        ))}
      </div>
    </div>
  );
};

export default App;
