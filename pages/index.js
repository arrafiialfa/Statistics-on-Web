import Head from "next/head";
import Table from "../components/Table";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Statistics on Web</title>
        <meta
          name="description"
          content="Calculate Mean, Deviation Product Deviation, etc"
        />
      </Head>

      <main className=" w-full py-28 mx-auto px-4">
        <Table />
      </main>
    </div>
  );
}
