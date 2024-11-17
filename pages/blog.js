import Head from "next/head";
import Image from "next/image";
import arrow from "../icons/arrow.svg";
import styles from "../styles/Blog.module.css";
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

function Blog({ blogmediums }) {
  //   console.log(blogmediums);
  const { title, description, image, url, tag } = blogmediums[0].fields;
  const maxDescriptionLength = 180;
  const truncatedDescription =
    description.length > maxDescriptionLength
      ? description.substring(0, maxDescriptionLength) + "..."
      : description;
  return (
    <div className={styles.container}>
      <Head>
        <title>Ganesh</title>
        <meta name="description" content="Ganesh" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.borderscon}></div>
      <main className={styles.main}>
        <div className={styles.pagetitle}>Data Sci Blog</div>
        <div className={styles.date}>
          {moment().format("dddd")} , {moment().format("MMMM Do YYYY")}
        </div>
        <div className={styles.sectioncon}>
          <div className={styles.section}>
            <div className={styles.latestpostcon}>
              <a href={url}>
                <div className={styles.latestpost}>
                  <div className={styles.latestimagecon}>
                    <div className={styles.latestimage}>
                      <Image
                        src={"https:" + image.fields.file.url}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="top"
                        priority={true}
                      />
                    </div>
                  </div>
                  <div className={styles.latestbody}>
                    <div className={styles.profileblock}>
                      <div className={styles.profileimage}></div>
                      <div className={styles.name}>Ganesh Hemanth</div>
                    </div>

                    <div className={styles.latesttitle}>{title}</div>
                    <div className={styles.latestdesc}>
                      {truncatedDescription}
                    </div>
                    <div className={styles.link}>
                    Read{" "}
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
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className={styles.bloggrid}>
            {blogmediums.slice(1).map((blogmedium) => (
              <Blogpost key={blogmedium.sys.id} blogmedium={blogmedium} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Blog;
