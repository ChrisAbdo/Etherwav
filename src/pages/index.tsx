import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "@/components/navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
