import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import arrow from "../icons/arrow.svg";
import Blogpost from "../components/Blogpost.js";
import moment from "moment";
import { createClient } from "contentful";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: "blogmedium" });
  const blogmediums = res.items;

  return {
    props: {
      blogmediums,
    },
    revalidate: 1,
  };
}

export default function Home({ blogmediums }) {
  return (
    <>
      <Head>
        <title>Ganesh</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ipng" />
      </Head>
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <section className={`${styles.section} ${styles.herosec}`}>
            <div className={styles.grid2x}>
              <div className={styles.profileblock}>
                {/* <div className={styles.profileimage}></div> */}
                <div>
                  <div className={styles.title}>Ganesh</div>
                  <div className={styles.pro}>Data Scientist, Researcher.</div>
                  {/* <div className={styles.date}>
                    {moment().format("Do MMM YYYY")}
                  </div> */}
                </div>
              </div>
              <div className={styles.biocon}>
                <div className={styles.bio}>
                  Hi, I am Ganesh. I am a Data Scientist and Reseacher. I have 3
                  years of experience in the field. Previously worked at
                  Sagacious Research and Waycool Technologies. Currently
                  pursuing masters in Business Intelligence from Wichita State
                  University.
                </div>
                <Link href="/about">
                  <div className={styles.link}>
                    Learn more{" "}
                    <span>
                      {" "}
                      <Image
                        src={arrow}
                        width="12"
                        height="12"
                        alt="G"
                        className={styles.arrow}
                      />
                    </span>{" "}
                  </div>
                </Link>
              </div>
            </div>
          </section>
          <div className={styles.section}>
            <div className={styles.grid2x}>
              <div className={styles.gridtitle}>
                {" "}
                <span className={styles.circle}></span> Writing
              </div>
              <div>
                <div className={styles.bloggrid}>
                  {blogmediums.slice(0, 1).map((blogmedium) => (
                    <Blogpost key={blogmedium.sys.id} blogmedium={blogmedium} />
                  ))}
                </div>
                <div className={styles.btncon}>
                  <Link href="/blog">
                    <div className={styles.btn}>View Blog</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.grid2x}>
              <div className={styles.gridtitle}>
                <span className={styles.circle}></span> Research
              </div>
              <div></div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
