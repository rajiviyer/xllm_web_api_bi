"use client";
import Link from "next/link";
import logo from "@/public/xLLM.png";
// import Image from "next/image";
function Navbar() {
  return (
    // <nav className="py-1 flex gap-x-4 border-b-1 border-slate-600 bg-slate-800 text-slate-200">
    <nav className="py-1 bg-bondingai_primary border-b border-gray-200 dark:border-gray-600 text-slate-200">
      <div className="flex flex-wrap items-center justify-between px-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo.src} className="h-8" alt="XLLM Logo" />
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            XLLM
          </span> */}
        </a>
        <div className="flex pr-6 md:order-2 space-x-5 md:space-x-0 rtl:space-x-reverse">
          <Link href="https://mltechniques.com/2024/09/22/no-code-llm-fine-tuning-and-debugging-in-real-time-case-study/" className="py-1">
            <button
              type="button"
              className="text-bondingai_secondary bg-bondingai_secondary/[0.25] hover:bg-[#facc15] hover:text-black focus:ring-4 focus:outline-none focus:ring-bondingai_secondary/[0.25] font-medium rounded-lg text-sm px-4 py-1 text-center"
            >
              Documentation
            </button>
          </Link>
        </div>
      </div>
      {/* <img src={logo.src} alt="xllm logo" className="pl-4" width="45" />
      <a className="text-xl font-semibold">XLLM</a>
      <Link href="/about">Article</Link> */}
    </nav>
  );
}
export default Navbar;
