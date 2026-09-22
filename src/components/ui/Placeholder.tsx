import styles from "./Placeholder.module.css";

interface PlaceholderProps {
  aspectRatio: string;
  label: string;
  className?: string;
}

/** Stands in for a missing photo at the real crop's aspect ratio, so nothing reflows when the photo arrives. */
export default function Placeholder({ aspectRatio, label, className }: PlaceholderProps) {
  return (
    <div className={className ? `${styles.placeholder} ${className}` : styles.placeholder} style={{ aspectRatio }}>
      <span>
        {label.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </span>
    </div>
  );
}
