import { createRoot } from "react-dom/client";

import { ClockIcon } from "assets/svg";
import { logoImage } from "assets/images";

import styles from "./.module.css";

const root = document.getElementById("root");
const container = createRoot(root);

container.render(
  <div className={styles["panel"]}>
    <img className={styles["logo"]} src={logoImage} />
    <ClockIcon fontSize="5vh" color="var(--WHITE)" />
    <p id="title" className={styles["title"]}>
      Micro Visual
    </p>
    <p id="subtitle" className={styles["subtitle"]}>
      {process.env.VERSION}
    </p>
  </div>
);
