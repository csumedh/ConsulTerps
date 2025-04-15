export function Button({ children, ...props }) {
    return (
      <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", borderRadius: "5px", border: "none" }} {...props}>
        {children}
      </button>
    );
  }
  