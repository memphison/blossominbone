import Image from "next/image";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";
import Floret from "../ui/Floret";
import Placeholder from "../ui/Placeholder";
import { products } from "@/content/products";
import { externalLinkProps } from "@/lib/externalLinkProps";
import styles from "./Merch.module.css";

export default function Merch() {
  return (
    <section id="merch" className={styles.merch}>
      <Container>
        <SectionIntro>Merch</SectionIntro>

        <div className={styles.goods}>
          {products.map((product, i) => (
            <Reveal key={product.name} delayMs={(i % 3) * 90}>
              {product.image ? (
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  width={product.image.width}
                  height={product.image.height}
                  className={styles.shot}
                  loading="lazy"
                />
              ) : (
                <Placeholder aspectRatio="1/1" label={product.placeholderLabel} className={styles.shot} />
              )}
              <div className={styles.pname}>{product.name}</div>
              <div className={styles.price}>{product.price}</div>
              <a className={styles.buy} href={product.buyHref} {...externalLinkProps(product.buyHref)}>
                Buy
              </a>
            </Reveal>
          ))}
        </div>

        <Floret src="/images/flower-star.webp" width={300} height={258} align="left" />
      </Container>
    </section>
  );
}
