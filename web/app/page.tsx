"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MdArrowDropUp } from "react-icons/md";
import { IoPaperPlaneOutline } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IoIosMenu } from "react-icons/io";
import { FaX } from "react-icons/fa6";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { CgListTree } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import { BsViewList } from "react-icons/bs";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import WalletList from "@/components/WalletList";


export default function Home() {
  // const res = await
  return (
    <div className="h-screen">
      <Header />
      <main className="h-full">
        <div className="md:flex w-full mx-auto h-full">
          <div className="w-20 bg-light-grey h-full md:block hidden p-4">
            <button className="text-2xl font-bold italic">WT</button>
            <div className="flex flex-col gap-2 mt-8">
              <Link href="/" className="w-10 h-10 rounded-lg bg-white flex items-center justify-center hover:bg-slate-800 group"><IoMdHome className="inline-block group-hover:text-white" /></Link>
              <Link href="/wallets" className="rounded-lg w-10 h-10 bg-white flex items-center justify-center hover:bg-slate-800 group"><BsViewList className="inline-block group-hover:text-white" /></Link>
            </div>
          </div>
          <section className="w-full md:w-2/3">
            <div className="p-4">
              <div className="p-4 lg:p-8 bg-yellow-200 text-center rounded-lg">
                <p className="text-sm">My wallet</p>
                <h2 className="text-3xl font-bold pt-6">$128,192</h2>
                <span className="text-xs font-bold text-slate-700">+$15,258</span>
              </div>

              <div className="mt-8">
                <div>
                  <h1>Wallets from AWS KMS</h1>
                  <WalletList />
                </div>
                <Link href="/wallets" className="text-sm mt-4 text-blue-400 inline-block">View all Wallets</Link>
              </div>
            </div>
            {/* wallet amount */}
          </section>
          <Aside />
        </div>
      </main>
    </div>
  );
}
