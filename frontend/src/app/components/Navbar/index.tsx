"use client";

import React, { useEffect } from "react";
import styles from "./styles.module.css";
import AuthService from "@/services/auth";
import { deleteLogin, getLogin } from "@/app/actions/cookies";
import { TUser } from "@/types/user";
import Button from "@/components/Button";
import Link from "next/link";

export default function Navbar() {
  const [login, setLogin] = React.useState<TUser | null>(null);

  const onLogout = async () => {
    await AuthService.logout();
    setLogin(null);
    await deleteLogin();
  };

  useEffect(() => {
    (async function () {
      const userdata = await getLogin();
      if (userdata) setLogin(userdata);
    })();
  }, []);
  return (
    <div className={styles.navbar}>
      <h1>Football Games</h1>

      <div></div>

      <div className={styles.links}>
        <p>
          Hello, {login ? login.username || "-" : "Login to change scores"}!
        </p>

        {login ? (
          <Button type="button" variant="hiClick" onClick={onLogout}>
            Logout
          </Button>
        ) : (
          <Link className={"hiClick"} href={"/login"}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
