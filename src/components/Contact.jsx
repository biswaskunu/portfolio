import AnimatedContent from "../fx/AnimatedContent.jsx";
import Magnet from "../fx/Magnet.jsx";

export default function Contact() {
  return (
    <section className="contact reveal" id="contact">
      <div className="contact-inner">
        <AnimatedContent>
          <h2 className="contact-title">
            Let's build
            <br />
            something real.
          </h2>
          <p className="contact-sub">
            Open to remote backend internships — GSoC, MLH Fellowship, Outreachy, or a YC-stage
            startup that needs someone who ships.
          </p>
        </AnimatedContent>
        <AnimatedContent delay={0.1} className="contact-links">
          <Magnet strength={0.2}>
            <a href="mailto:kunubiswas2@gmail.com" className="contact-link">
              <span className="contact-label">Email</span>
              <span className="contact-value">kunubiswas2@gmail.com</span>
            </a>
          </Magnet>
          <Magnet strength={0.2}>
            <a href="https://github.com/biswaskunu" target="_blank" rel="noopener" className="contact-link">
              <span className="contact-label">GitHub</span>
              <span className="contact-value">github.com/biswaskunu</span>
            </a>
          </Magnet>
          <Magnet strength={0.2}>
            <a
              href="https://linkedin.com/in/biswash-rath-25a871379"
              target="_blank"
              rel="noopener"
              className="contact-link"
            >
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">biswash-rath-25a871379</span>
            </a>
          </Magnet>
        </AnimatedContent>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; 2026 Biswash Rath. Built with React + Vite — no CMS, on purpose.</p>
    </footer>
  );
}
