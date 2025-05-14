function Title({ level, children, className = "" }) {
  const Tag = `h${level}`;
  return <Tag className={className}>{children}</Tag>;
}

export default Title;
