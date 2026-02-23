"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  function handleNavChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value && value !== pathname) {
      router.push(value);
    }
  }

  return (
    <header className="site-header">
      {/* Logo */}
      <Link href="/" className="logo">
        <span className="logo-main">SonMat</span>
        <span className="logo-sub">by josh</span>
      </Link>

      {/* Select Nav */}
      <select
        className="home-select"
        value={pathname}
        onChange={handleNavChange}
        aria-label="Site navigation"
      >
        <option value="/recipes">recipes</option>
        <option value="/reviews">reviews</option>
        <option value="/about">about</option>
        <option value="/blog">blog</option>
      </select>
    </header>
  );
}