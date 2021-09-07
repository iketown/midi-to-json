import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Link passHref href="/midi" as="/midi">
        <a className="text-2xl hover:underline">convert midi to JSON</a>
      </Link>
    </div>
  );
};

export default Home;
