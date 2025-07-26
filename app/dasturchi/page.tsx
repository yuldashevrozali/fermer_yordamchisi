"use client";

import { Header } from "@/components/header";
import { Github, Instagram, Mail, Facebook, Globe } from "lucide-react";

export default function Dasturchi() {
  return (
    <div>
        <Header />
        <div className="max-w-xl mx-auto mt-10 text-center">
        
      <h2 className="text-2xl font-semibold mb-6 text-green-700">Social media</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        <a
          href="https://t.me/rozali_dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 transition"
        >
        </a>
        <a
          href="https://instagram.com/rozalibekyuldashev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-700 transition"
        >
          <Instagram size={28} />
        </a>
        <a
          href="https://yuldashevportfolio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-black transition"
        >
          <Globe size={28} />
        </a>
        <a
          href="https://github.com/yuldashevrozali"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-black transition"
        >
          <Github size={28} />
        </a>
        <a
          href="mailto:yuldashevrozali08@gmail.com"
          className="text-red-500 hover:text-red-700 transition"
        >
          <Mail size={28} />
        </a>
        <a
          href="https://facebook.com/rozali.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition"
        >
          <Facebook size={28} />
        </a>
      </div>
    </div>
    </div>
    
  );
}
