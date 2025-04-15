export function Card({ children, className }) {
    return <div className={className} style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>{children}</div>;
  }
  
  export function CardContent({ children, className }) {
    return <div className={className}>{children}</div>;
  }
  