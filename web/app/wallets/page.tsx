import Header from "@/components/Header";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { BsViewList } from "react-icons/bs";
import { DataTable } from "@/components/DataTable";

const Wallets = () => {
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
                    <section className="w-full">
                        <div className="p-4">
                            <h1 className="text-2xl font-bold">Wallets</h1>
                        </div>
                        <div className="p-4">
                            <DataTable />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default Wallets;