import React from "react";
import Marquee from "react-fast-marquee";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Flame,
  Info,
  InfoIcon,
  Laptop,
  Menu,
  MenuIcon,
  Moon,
  Play,
  Search,
  SearchIcon,
  Sun,
  X,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import Link from "next/link";
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Calendar", href: "#", current: false },
  { name: "Teams", href: "#", current: false },
  { name: "Directory", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
export default function ListenPage() {
  const [modalMounted, setModalMounted] = React.useState(false);

  React.useEffect(() => {
    setModalMounted(true);
  }, []);
  return (
    <div className="h-screen">
      <div className="flex h-full">
        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-64 flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4 border-b border-gray-200">
                  <Link href="/" className="text-2xl">
                    Etherwav
                  </Link>
                </div>
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="space-y-1 px-2">
                    {/* {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    ))} */}
                    <h1 className="text-gray-500 text-lg uppercase tracking-wider font-medium">
                      Queue
                    </h1>
                    <ScrollArea className="h-96">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div className="relative mb-2 flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://imgs.search.brave.com/oSBbiSRQWESLXT7dvYa2k3wdxoNOTNpg5MWjni2rHhQ/rs:fit:1200:1200:1/g:ce/aHR0cDovL3RoZXdv/d3N0eWxlLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNS8w/MS9uYXR1cmUtaW1h/Z2VzLmpwZw"
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <a href="#" className="focus:outline-none">
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              <p className="text-sm font-medium text-gray-900">
                                NAMEEEEE
                              </p>
                              <p className="truncate text-sm text-gray-500">
                                ROLEEEEE
                              </p>
                            </a>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>

                    <div>
                      <div className="mt-4">
                        <div className="mb-4">
                          <Separator />
                        </div>
                        <h1 className="text-gray-500 text-lg uppercase tracking-wider font-medium">
                          Filter
                        </h1>
                        <div className="space-y-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sort by genre" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sort by descending" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                <a href="#" className="group block w-full flex-shrink-0">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        Whitney Francis
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </div>
              <div>
                <Sheet>
                  <SheetTrigger>
                    <Button variant="ghost">
                      <Menu
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                      <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 bg-gray-100 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 " aria-hidden="true" />
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm ">
                  Want to upload your own songs? Check out the upload page!
                </p>
                <p className="mt-3 text-sm md:mt-0 md:ml-6">
                  <Link
                    href="/upload"
                    className="whitespace-nowrap font-medium "
                  >
                    Upload your songs here!
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className=" z-0 flex-1 overflow-y-auto focus:outline-none flex items-center justify-center relative">
              {/* Main area */}
              <div className="flex flex-col items-center">
                <div>
                  <img
                    className="h-96 w-96 rounded-md"
                    src="https://imgs.search.brave.com/oSBbiSRQWESLXT7dvYa2k3wdxoNOTNpg5MWjni2rHhQ/rs:fit:1200:1200:1/g:ce/aHR0cDovL3RoZXdv/d3N0eWxlLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNS8w/MS9uYXR1cmUtaW1h/Z2VzLmpwZw"
                    alt=""
                  />
                  <HoverCard>
                    <HoverCardTrigger>
                      <h1 className="text-2xl font-medium text-gray-900 mt-4">
                        Title
                      </h1>
                      <p className="text-sm text-gray-500 mt-1">Artist</p>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">@nextjs</h4>
                        <p className="text-sm">
                          The React Framework – created and maintained by
                          @vercel.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <div className="mt-4">
                    <Progress value={33} />
                  </div>
                </div>

                <div className="flex justify-between w-96 mt-4">
                  <Button variant="default">
                    <ChevronsLeft />
                  </Button>
                  <Button variant="default">
                    <Play />
                  </Button>
                  <Button variant="default">
                    <ChevronsRight />
                  </Button>
                </div>

                <div className="flex w-full mt-4">
                  <Button className="w-full" variant="default">
                    Give Heat <Flame />
                  </Button>
                </div>

                <div className="flex w-full mt-4">
                  <Button className="w-full" variant="outline">
                    More Info
                  </Button>
                </div>
              </div>

              {/* Footer */}
              {/* <div className="absolute bottom-0 left-0 right-0 bg-gray-100 py-6 text-center">
                <span className="text-gray-600">Footer content goes here</span>
              </div> */}
            </main>

            <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-l border-gray-200 bg-gray-100 xl:flex xl:flex-col">
              {/* Secondary column (hidden on smaller screens) */}
              <div className="bg-white ">
                <div>
                  <div>
                    <Marquee gradient={false} className="overflow-hidden">
                      <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                        {/* cheeky message about the heat leaderboard */}
                        🔥 Hot Tracks! Here are the Top 5 Songs on Fire Right
                        Now! 🎶
                      </h2>
                    </Marquee>
                  </div>
                </div>
              </div>
              <h1 className="text-gray-500 text-lg uppercase tracking-wider font-medium">
                Heat Leaderboard
              </h1>
              <ul role="list" className="p-4 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, translateX: -50 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="flex items-center overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                      {/* Image */}
                      <img
                        className="w-16 h-16 mr-4 rounded-md"
                        src="https://cdn.openai.com/labs/images/3D%20render%20of%20a%20cute%20tropical%20fish%20in%20an%20aquarium%20on%20a%20dark%20blue%20background,%20digital%20art.webp?v=1"
                        alt="Image description"
                      />

                      {/* Content */}
                      <div>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          name
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                          stat
                        </dd>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
