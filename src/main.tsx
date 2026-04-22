import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Game from "../shards_of_eternity";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Game />
  </StrictMode>
);
