function About() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>About The Event</h1>
      <p>
        A college-level technical and cultural fest inspired by the Upside Down.
      </p>
    </div>
  );
}

const styles = {
  page: { padding: "40px", color: "white" },
  title: { color: "red" },
};

export default About;
