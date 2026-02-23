import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-socials">
        <Link
          href="https://www.instagram.com/sonmatbyjosh"
          target="_blank"
          aria-label="Instagram"
        >
          <FaInstagram size={25} />
        </Link>

        <Link
          href="https://beliapp.co/app/sonmatbyjosh"
          target="_blank"
          aria-label="Beli"
        >
          <img src="/icons/beli.png" alt="Beli logo" />
        </Link>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} sonmatbyjosh. All rights reserved.
      </p>
    </footer>
  );
}