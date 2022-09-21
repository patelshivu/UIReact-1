import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function Home() {
  let navigation = useNavigate();

  useEffect(() => {
    navigation("/sign-in");
  });

  return <div></div>;
}

export default Home;
