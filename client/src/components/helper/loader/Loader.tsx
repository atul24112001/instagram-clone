import React from "react";
import styles from "./loader.module.css";

type Props = {
  color?: string;
  width?: string;
  message?: string;
};

const Loader = ({
  color = "rgb(var(--primary-button))",
  width = "200",
  message,
}: Props): React.ReactElement => {
  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${width}`}
        height={`${Number(width) * 0.5}`}
        viewBox={`0 0 ${width} ${Number(200 * 0.5)}`}
        data-testid="infinity-spin"
      >
        <path
          data-testid="infinity-spin-path-1"
          stroke={color}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
          className={styles.path}
        />
        <path
          data-testid="infinity-spin-path-2"
          opacity="0.07"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
        />
      </svg>
      {message && <span className={styles.message}>{message}</span>}
    </div>
  );
};

export default Loader;
