"use client";

import { Button } from "@/components/ui/button";
import { IoIosMenu, IoMdHome } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import { BsViewList } from "react-icons/bs";
import { FaX } from "react-icons/fa6";

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    return (
        <header className="w-full z-50 relative block shadow md:hidden">
            <div className="flex p-4 justify-between items-center relative z-50">
                <button className="text-2xl font-bold italic">WT</button>
                <div className="flex items-center gap-2">
                    <Button variant="default" size="sm">Connect Metamask</Button>
                    <div className="w-6 h-6 flex items-center justify-center" onClick={() => setIsNavOpen(!isNavOpen)}>
                        {isNavOpen ? (
                            <FaX className="w-4 h-4 cursor-pointer" onClick={() => setIsNavOpen(false)} />
                        ) : (
                            <IoIosMenu className="w-6 h-6 cursor-pointer" onClick={() => setIsNavOpen(true)} />
                        )}
                    </div>
                </div>
            </div>
            <nav className={`absolute left-0 right-0 shadow bg-white z-10 transition-all duration-500 ease-in-out ${isNavOpen ? 'block' : 'hidden'}`}>
                <div className="flex flex-col gap-2 p-4">
                    <Link href="/" className="hover:bg-slate-50 rounded-lg p-2"><IoMdHome className="inline-block group-hover:text-white mr-4" />Home</Link>
                    <Link href="/wallets" className="hover:bg-slate-50 rounded-lg p-2"><BsViewList className="inline-block group-hover:text-white mr-4" /> Wallets</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;