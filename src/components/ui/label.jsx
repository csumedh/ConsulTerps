export function Label({ children, className }) {
    return <label className={className} style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>{children}</label>;
  }
  