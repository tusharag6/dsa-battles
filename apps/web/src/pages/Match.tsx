import React from "react";
import { useParams } from "react-router-dom";

const Match = () => {
  const params = useParams();
  console.log(params.matchId);

  return <div>Match</div>;
};

export default Match;
