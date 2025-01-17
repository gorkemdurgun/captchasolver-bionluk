interface TextProps {
  children: string;
  className?: string;
}

export default function Text({ children, className }: TextProps) {
  return <p className={className}>{children}</p>;
}
