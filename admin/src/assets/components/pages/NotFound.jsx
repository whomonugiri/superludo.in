import { Link } from "react-router-dom";

export const NotFound = () => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      backgroundColor: "#f7f7f7",
      fontFamily: "Arial, sans-serif",
    },
    message: {
      fontSize: "3rem",
      fontWeight: "bold",
      color: "#333",
    },
    subMessage: {
      fontSize: "1.5rem",
      color: "#555",
    },
    link: {
      marginTop: "20px",
      fontSize: "1.2rem",
      color: "#007BFF",
      textDecoration: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.message}>404 - Page Not Found</div>
      <div style={styles.subMessage}>
        Oops! The page you're looking for doesn't exist.
      </div>
      <Link to="/" style={styles.link}>
        Go Back to Home
      </Link>
    </div>
  );
};
