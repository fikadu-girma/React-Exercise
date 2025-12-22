import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"; 

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <h2 style={styles.logo}>🎬 GC Movies</h2>

        <p style={styles.text}>
          © {new Date().getFullYear()} GC. All rights reserved. | Designed with ❤️ by the GC Team.
        </p>

        <div style={styles.socials}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
            <FaLinkedin />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "linear-gradient(135deg, #0d0d0d, #1a1a40)",
    color: "#fff",
    padding: "30px 20px",
    textAlign: "center",
    marginTop: "40px",
    boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
  },
  content: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  logo: {
    fontSize: "1.8rem",
    marginBottom: "10px",
    color: "#00aaff",
    letterSpacing: "1px",
  },
  text: {
    fontSize: "0.95rem",
    color: "#ccc",
    marginBottom: "15px",
  },
  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "18px",
  },
  icon: {
    color: "#ccc",
    fontSize: "1.6rem",
    transition: "all 0.3s ease",
  },
};

Object.assign(styles.icon, {
  cursor: "pointer",
});
Object.assign(styles.icon, {
  ':hover': {
    color: '#00aaff'
  }
});

export default Footer;
