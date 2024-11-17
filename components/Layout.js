import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useHistory } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Layout.module.css";
import Image from "next/image";
import logo from "../icons/logo.svg";

function Layout({ children }) {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };
  const logotoggle = () => {
    if (isActive == true) {
      setActive(!isActive);
    }
  };

  const [isShown, setIsShown] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40 || isActive) {
        setIsShown(true);
      } else if (currentScrollY < lastScrollY) {
        setIsShown(true);
      } else if (currentScrollY > lastScrollY) {
        setIsShown(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const showhide = isShown ? "show" : "hide";

  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Ganesh </title>
        <meta name="description" content="Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.headerblock}>
        <header className={`${styles.header} ${styles[showhide]}`}>
          <div className={styles.logoblock} onClick={logotoggle}>
            <Link href="/">
              <div className={styles.logocon}>
                <Image
                  src={logo}
                  width="16"
                  height="16"
                  alt="G"
                  className={styles.logo}
                />
              </div>
            </Link>

            {/* <Link href="/">
              <div className={styles.name}>ganesh</div>
            </Link> */}
          </div>
          <div className={styles.webonly}>
            <div className={styles.menucon}>
              <Link href="/about">
                <div
                  className={`${styles.menu} ${
                    router.pathname === "/about" ? styles.active : ""
                  }`}
                >
                  About
                </div>
              </Link>
              <Link href="/blog">
                <div
                  className={`${styles.menu} ${
                    router.pathname === "/blog" ? styles.active : ""
                  }`}
                >
                  Blog
                </div>
              </Link>
              <Link href="/research">
                <div
                  className={`${styles.menu} ${
                    router.pathname === "/research" ? styles.active : ""
                  }`}
                >
                  Research
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.mobileonly}>
            <div className={styles.mblock} onClick={toggleClass}>
              {isActive ? "Close" : "Menu"}
            </div>
          </div>
        </header>
      </div>

      <div className={styles.mobileonly}>
        <div
          className={styles[isActive ? "menubar" : "nomenubar"]}
          onClick={toggleClass}
        >
          <Link href="/about">
            <div
              className={`${styles.menux} ${
                router.pathname === "/about" ? styles.activex : ""
              }`}
            >
              About
            </div>
          </Link>
          <Link href="/blog">
            <div
              className={`${styles.menux} ${
                router.pathname === "/blog" ? styles.activex : ""
              }`}
            >
                Blog
            </div>
          </Link>
          <Link href="/research">
            <div
              className={`${styles.menux} ${
                router.pathname === "/research" ? styles.activex : ""
              }`}
            >
              Research
            </div>
          </Link>
        </div>
      </div>

      <main>
        <div>{children}</div>
      </main>
    </div>
  );
}

export default Layout;
