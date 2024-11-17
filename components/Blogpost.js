import React from "react";
import Link from "next/link";
import Image from "next/image";
// import exlink from '../assets/exlink.svg'
import styles from "../styles/Blog.module.css";

export default function Blogpost({ blogmedium }) {
  const { title, description, image, url, tag } = blogmedium.fields;
  const maxDescriptionLength = 120;
  const truncatedDescription =
    description.length > maxDescriptionLength
      ? description.substring(0, maxDescriptionLength) + "..."
      : description;

  return (
    <div>
      <main classNane={styles.main}>
        <a href={url}>
          <div className={styles.blogpost}>
            <div className={styles.blogimagecon}>
              <div className={styles.blogimage}>
                <Image
                  src={"https:" + image.fields.file.url}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                  priority={true}
                />
              </div>
            </div>

            <div className={styles.blogbody}>
              {/* <div className={styles.tag}>{tag}</div> */}
              <div className={styles.profileblock}>
                <div className={`${styles.profileimage} ${styles.prox}`}></div>
                <div className={styles.name}>Ganesh Hemanth</div>
              </div>
              <div className={styles.blogtitle}>{title}</div>
              <div className={styles.desc}>{truncatedDescription}</div>
           
            </div>
          </div>
        </a>
      </main>
    </div>
  );
}
