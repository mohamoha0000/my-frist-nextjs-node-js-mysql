'use client';
//import Image from "next/image";
import Header from '../components/Header';
import Link from 'next/link';
export default function Home() {
  return (
    <div id="home" className="min-h-screen bg-amber-50 text-gray-800 font-sans">
      <Header />
      {/* Main */}
      <main className="max-w-4xl mx-auto p-6 space-y-10">
        
        {/* CTA Section */}
        <section className="text-center mt-10">
          <Link href="/login">
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-all">
            Get Started
          </button>
          </Link>
        </section>

        {/* Paragraph Section */}
        <section id="about" className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, repellat porro reprehenderit odio error, cum qui asperiores, ad sint est sunt voluptates. Ad, molestias quam magni aut cum exercitationem illum.
          </p>
        </section>

        {/* Contact Form */}
        <section id="contact" className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-amber-700">Contact</h2>
          <form onSubmit={(e) => {
            e.preventDefault(); 
            console.log("Form submitted!");}               
            }className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter title"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                placeholder="Enter message"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-all hover:scale-105 shadow-md"
            >
              Send
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
