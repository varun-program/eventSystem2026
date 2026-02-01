function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.college}>V.S.B College Of Enginnering Technical Campus</h1>
      <h2 style={styles.dept}>Department Of Information Technology & AIML</h2>

      <h1 style={styles.event}>StrangerTrix</h1>

      <p style={styles.tagline}>
        Enter the Upside Down of Talent & Innovation
      </p>

      <button style={styles.button}>
        ENTER THE UPSIDE DOWN
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  college: {
    color: "#ff0000",
    letterSpacing: "3px",
  },
  dept: {
    marginBottom: "30px",
  },
  event: {
    fontSize: "60px",
    color: "#ff0000",
    textShadow: "0 0 20px red",
  },
  tagline: {
    marginTop: "20px",
    opacity: 0.8,
  },
  button: {
    marginTop: "40px",
    padding: "15px 30px",
    backgroundColor: "black",
    color: "red",
    border: "2px solid red",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Home;
