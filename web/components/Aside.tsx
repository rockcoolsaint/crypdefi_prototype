import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoPaperPlaneOutline } from "react-icons/io5";

const Aside = () => {
    return (
        <aside className="w-full md:w-1/3 p-4">
            <Button variant="default" className="mb-4 hidden md:block">Connect Metamask</Button>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="receiver">Receiver</Label>
                                <Input id="receiver" placeholder="0xtyfe..." />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="amount">Amount</Label>
                                <Input id="amount" placeholder="0.00" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className="w-full group">Send <IoPaperPlaneOutline className="w-4 ml-2 h-4 text-white group-hover:text-slate-900" /></Button>
                </CardFooter>
            </Card>

        </aside>
    )
}

export default Aside;