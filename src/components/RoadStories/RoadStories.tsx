import Image from "next/image";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";
import Floret from "../ui/Floret";
import Placeholder from "../ui/Placeholder";
import { posts } from "@/content/posts";
import styles from "./RoadStories.module.css";

export default function RoadStories() {
  return (
    <section id="stories" className={styles.stories}>
      <Container>
        <SectionIntro>Road Stories</SectionIntro>

        <div className={styles.entries}>
          {posts.map((post, i) => (
            <Reveal as="article" key={post.title} className={styles.entry} delayMs={(i % 3) * 90}>
              {post.image ? (
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  width={post.image.width}
                  height={post.image.height}
                  className={styles.shot}
                  loading="lazy"
                />
              ) : (
                <Placeholder aspectRatio="5/4" label="Roadside photo" className={styles.shot} />
              )}
              <div className={styles.text}>
                <p className={styles.meta}>
                  {post.date} · {post.location}
                </p>
                <h3 className={styles.title}>{post.title}</h3>
                <p>{post.excerpt}</p>
                <a className={styles.more} href={post.href}>
                  Read it
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Floret src="/images/skull-cat.webp" width={700} height={732} align="right" />
      </Container>
    </section>
  );
}
