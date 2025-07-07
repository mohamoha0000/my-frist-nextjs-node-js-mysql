'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleClick = (section: string) => {
    if (window.location.pathname === '/') {
      // On home page, just scroll to the section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Not on home page, navigate to home with hash
      router.push(`/#${section}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full bg-amber-400 px-8 py-4 shadow-md">
      <h1 className="text-2xl font-bold text-white cursor-pointer tracking-wide">
        Projects
      </h1>
      <ul className="flex space-x-6 text-white font-medium uppercase text-sm">
        {['home', 'home', 'contact'].map((section) => (
          <li
            key={section}
            className="hover:text-gray-100 transition-colors cursor-pointer"
            onClick={() => handleClick(section)}
          >
            <span className="hover:underline capitalize">{section}</span>
          </li>
        ))}
      </ul>
      <Link href="/login">
        <button className="bg-amber-700 hover:bg-amber-900 transition-colors px-5 py-2 rounded-md text-white font-semibold shadow-md hover:scale-105 transition-transform">
          Get Started
        </button>
      </Link>
    </header>
  );
}
