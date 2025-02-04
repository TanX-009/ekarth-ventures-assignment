import React, { ReactNode, Ref } from "react";
import styles from "./styles.module.css";

interface TProps {
  name: string;
  label?: ReactNode | null;
  type?: "text" | "email" | "password" | "number";
  defaultValue?: string | number;
  required?: boolean;
  className?: string;
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  label = null,
  type = "text",
  defaultValue = undefined,
  required = false,
  className = "",
  placeholder = "",
  ref = null,
  onChange = () => {},
  onBlur = () => {},
}: TProps) {
  return (
    <div className={`${styles.input} ${className}`}>
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input
        className={"input"}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
