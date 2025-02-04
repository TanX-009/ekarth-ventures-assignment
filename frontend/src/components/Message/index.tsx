import React, { ReactNode } from "react";
import styles from "./styles.module.css";

export interface TMessage {
  value: string;
  status: "error" | "success" | "neutral";
}

interface TProps {
  children: ReactNode;
  status?: "error" | "success" | "neutral";
}

export default function Message({ children, status = "neutral" }: TProps) {
  if (children && children !== "") {
    return <p className={styles[status]}>{children}</p>;
  }
  return <></>;
}
