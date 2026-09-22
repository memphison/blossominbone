import type { ElementType, ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export default function Container({ as: Tag = "div", children, className }: ContainerProps) {
  return <Tag className={className ? `${styles.wrap} ${className}` : styles.wrap}>{children}</Tag>;
}
