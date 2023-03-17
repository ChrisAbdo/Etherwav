// @ts-nocheck
import React from "react";
import MusicLoader from "@/components/music-loader";
import Web3 from "web3";
import Radio from "../../backend/build/contracts/Radio.json";
import NFT from "../../backend/build/contracts/NFT.json";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Image from "next/image";
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
  Pause,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import LeaderboardLoader from "@/components/leaderboard-loader";
import QueueLoader from "@/components/queue-loader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import UploadAlert from "@/components/upload-alert";
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

export default function ListenPage() {
  const [modalMounted, setModalMounted] = React.useState(false);
  const [nfts, setNfts] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [shouldPlay, setShouldPlay] = React.useState(false);
  const [heatCount, setHeatCount] = React.useState(0);
  const [topThreeNfts, setTopThreeNfts] = React.useState([]);
  const [direction, setDirection] = React.useState("right");
  const [isOpen, setIsOpen] = React.useState(false);
  const [ascending, setAscending] = React.useState(false);
  const [songsLoaded, setSongsLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [position, setPosition] = React.useState("bottom");
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const audioRef = React.useRef(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    loadSongs();
  }, []);

  React.useEffect(() => {
    setModalMounted(true);
  }, []);

  React.useEffect(() => {
    if (audioRef.current) {
      // Set initial progress to 0
      setProgress(0);

      // Update duration when the song changes
      const updateDuration = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      };

      // Set the duration once the song is loaded
      audioRef.current.addEventListener("loadedmetadata", updateDuration);

      // Clean up the listener when the component unmounts
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener(
            "loadedmetadata",
            updateDuration
          );
        }
      };
    }
  }, [currentIndex]);

  async function loadSongs() {
    console.log("Loading songs...");
    // @ts-ignore
    const web3 = new Web3(window.ethereum);

    const networkId = await web3.eth.net.getId();

    // Get all listed NFTs
    const radioContract = new web3.eth.Contract(
      // @ts-ignore
      Radio.abi,
      // @ts-ignore
      Radio.networks[networkId].address
    );
    const listings = await radioContract.methods.getListedNfts().call();
    // Iterate over the listed NFTs and retrieve their metadata
    const nfts = await Promise.all(
      listings.map(async (i: any) => {
        try {
          const NFTContract = new web3.eth.Contract(
            // @ts-ignore
            NFT.abi,
            // @ts-ignore
            NFT.networks[networkId].address
          );
          const tokenURI = await NFTContract.methods.tokenURI(i.tokenId).call();
          const meta = await axios.get(tokenURI);
          const nft = {
            tokenId: i.tokenId,
            seller: i.seller,
            owner: i.buyer,
            image: meta.data.image,
            title: meta.data.title,
            coverImage: meta.data.coverImage,
            heatCount: i.heatCount,
            genre: meta.data.genre,
          };
          return nft;
        } catch (err) {
          console.log(err);
          return null;
        }
      })
    );
    // setNfts(nfts.filter((nft) => nft !== null));

    // set nfts in order of heatCount
    const sortedNfts = nfts
      .filter((nft) => nft !== null)
      .sort((a, b) => b.heatCount - a.heatCount);
    const topThreeNfts = sortedNfts.slice(0, 5);
    // @ts-ignore
    setTopThreeNfts(topThreeNfts);
    // @ts-ignore
    setNfts(sortedNfts);

    setSongsLoaded(true);
  }

  function handleNext() {
    setDirection("right");
    setCurrentIndex((currentIndex + 1) % nfts.length);
    setIsPlaying(true);
  }
  function handlePrevious() {
    setDirection("left");
    setCurrentIndex(currentIndex === 0 ? nfts.length - 1 : currentIndex - 1);
    setIsPlaying(true);
  }

  return (
    <div className="h-screen">
      <UploadAlert />
      <div className="flex h-full">
        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-64 flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 dark:border-[#333] bg-gray-100 dark:bg-black">
              <div className="flex flex-1 flex-col overflow-y-auto pb-4">
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="space-y-1 px-2">
                    <h1 className="text-gray-500 dark:text-white text-lg uppercase tracking-wider font-medium">
                      Queue
                    </h1>
                    <ScrollArea className="h-96">
                      {nfts.length > 0 ? (
                        nfts.map((nft, i) => (
                          <div
                            key={i}
                            className="relative mb-2 flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-[#333] dark:bg-[#111] px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                          >
                            <div className="flex-shrink-0">
                              <Image
                                className="h-10 w-10 rounded-md"
                                src={nft.coverImage}
                                alt=""
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="focus:outline-none">
                                <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                />
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {nft.title}
                                </p>
                                <p className="truncate text-sm text-gray-500 dark:text-zinc-500">
                                  {nft.seller.slice(0, 5)}...
                                  {nft.seller.slice(-4)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <QueueLoader />
                      )}
                    </ScrollArea>

                    <div>
                      <div className="mt-4">
                        <div className="mb-4">
                          <Separator />
                        </div>
                        <h1 className="text-gray-500 dark:text-white text-lg uppercase tracking-wider font-medium">
                          Filter
                        </h1>
                        {songsLoaded ? (
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
                        ) : (
                          <div className="mt-4">
                            <div className="mt-4 bg-gray-200 dark:bg-[#333] w-full h-8 animate-pulse rounded-md" />
                            <div className="mt-2 bg-gray-200 dark:bg-[#333] w-full h-8 animate-pulse rounded-md" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className=" z-0 flex-1 overflow-y-auto focus:outline-none flex items-center justify-center relative">
              {/* Main area */}

              {songsLoaded ? (
                <div key={currentIndex} className="flex flex-col items-center">
                  <div className="w-96">
                    <figure>
                      <div className="flex justify-between mb-2">
                        <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-[#333] px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:text-white">
                          {nfts[currentIndex].heatCount} Heat{" "}
                          <Flame className="ml-1" />
                        </span>
                        <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-[#333] px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:text-white">
                          {nfts[currentIndex].genre}
                        </span>
                      </div>
                      <motion.div
                        // @ts-ignore
                        key={nfts[currentIndex].tokenId}
                        initial={
                          direction === "right" ? { x: -100 } : { x: 100 }
                        }
                        animate={{ x: 0 }}
                        exit={direction === "right" ? { x: 100 } : { x: -100 }}
                        transition={transition}
                      >
                        <Image
                          // @ts-ignore
                          src={nfts[currentIndex].coverImage}
                          width={400}
                          height={400}
                          alt="cover"
                          className="rounded-none min-w-96 min-h-96 max-w-96 max-h-96"
                          priority
                        />
                      </motion.div>
                    </figure>
                    <HoverCard>
                      <HoverCardTrigger>
                        <h1 className="text-2xl font-medium text-gray-900 dark:text-white mt-4">
                          {/* @ts-ignore */}
                          {nfts[currentIndex].title}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-zinc-500 mt-1">
                          {/* @ts-ignore */}
                          {nfts[currentIndex].seller}
                        </p>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">
                            {/* @ts-ignore */}
                            {nfts[currentIndex].title}
                          </h4>
                          <p className="text-sm">
                            {/* @ts-ignore */}
                            {nfts[currentIndex].seller.slice(0, 5)}...
                            {/* @ts-ignore */}
                            {nfts[currentIndex].seller.slice(-4)}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    <div className="mt-4">
                      <div className="flex justify-between items-center text-center space-x-4">
                        <h1>
                          {!isNaN(audioRef.current?.currentTime)
                            ? `${Math.floor(
                                audioRef.current.currentTime / 60
                              )}:${
                                Math.floor(audioRef.current.currentTime % 60) <
                                10
                                  ? `0${Math.floor(
                                      audioRef.current.currentTime % 60
                                    )}`
                                  : Math.floor(
                                      audioRef.current.currentTime % 60
                                    )
                              }`
                            : "0:00"}
                        </h1>
                        <Progress value={progress} />
                        <div>
                          {!isNaN(duration) && audioRef.current?.currentTime
                            ? `${Math.floor(
                                (duration - audioRef.current.currentTime) / 60
                              )}:${
                                Math.floor(
                                  (duration - audioRef.current.currentTime) % 60
                                ) < 10
                                  ? `0${Math.floor(
                                      (duration -
                                        audioRef.current.currentTime) %
                                        60
                                    )}`
                                  : Math.floor(
                                      (duration -
                                        audioRef.current.currentTime) %
                                        60
                                    )
                              }`
                            : "0:00"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between w-96 mt-4">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      variant="default"
                    >
                      <ChevronsLeft />
                    </Button>

                    <audio
                      // @ts-ignore
                      src={nfts[currentIndex].image}
                      ref={audioRef}
                      onEnded={(e) => {
                        if (currentIndex < nfts.length - 1) {
                          setCurrentIndex(currentIndex + 1);
                          // set the progress to 0
                          setProgress(0);
                          // set the duration to the duration of the next song
                          // @ts-ignore
                          setDuration(e.target.duration);
                        }
                      }}
                      // onPlay={() => {
                      //   // @ts-ignore
                      //   setDuration(audioRef.current.duration);
                      //   // calculate the progress every second considering the duration
                      //   const interval = setInterval(() => {
                      //     setProgress(
                      //       // @ts-ignore
                      //       (audioRef.current.currentTime / duration) * 100
                      //     );
                      //   }, 500);
                      //   return () => clearInterval(interval);
                      // }}
                      onPlay={() => {
                        // Set the initial duration when the song starts playing
                        setDuration(audioRef.current.duration);

                        // Calculate the progress every second considering the duration
                        const interval = setInterval(() => {
                          // Check if the song is still playing
                          if (!audioRef.current.paused) {
                            // Round the progress value to 2 decimal places
                            const calculatedProgress = parseFloat(
                              (
                                (audioRef.current.currentTime / duration) *
                                100
                              ).toFixed(2)
                            );
                            setProgress(calculatedProgress);
                          }
                        }, 500);

                        return () => clearInterval(interval);
                      }}
                      className="h-12 w-full hidden"
                      controls
                      // autoplay after the first song
                      autoPlay={currentIndex !== 0}
                    />

                    <Button
                      onClick={() => {
                        if (isPlaying) {
                          // @ts-ignore
                          audioRef.current.pause();
                          setIsPlaying(false);
                        } else {
                          // @ts-ignore
                          audioRef.current.play();
                          // @ts-ignore
                          audioRef.current.pause();
                          // @ts-ignore
                          audioRef.current.play();
                          setIsPlaying(true);
                        }
                      }}
                      variant="default"
                    >
                      {isPlaying ? <Pause /> : <Play />}
                    </Button>

                    <Button
                      onClick={handleNext}
                      disabled={currentIndex === nfts.length - 1}
                      variant="default"
                    >
                      <ChevronsRight />
                    </Button>
                  </div>

                  <div className="flex w-full mt-4">
                    <Sheet>
                      <SheetTrigger>
                        <Button className="w-96" variant="destructive">
                          Give Heat <Flame />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>
                            Give Heat to {nfts[currentIndex].title}
                          </SheetTitle>
                          <SheetDescription>
                            <div>
                              <div className="pb-1 sm:pb-6">
                                <div>
                                  <div className="relative h-40 sm:h-56">
                                    <Image
                                      className="absolute h-full w-full object-cover"
                                      src={nfts[currentIndex].coverImage}
                                      alt=""
                                      width={500}
                                      height={500}
                                    />
                                  </div>
                                  <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                                    <div className="sm:flex-1">
                                      <div>
                                        <div className="flex items-center">
                                          <h3 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                                            {nfts[currentIndex].title}
                                          </h3>
                                          <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                            <span className="sr-only">
                                              Verified
                                            </span>
                                          </span>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-[#999]">
                                          {nfts[currentIndex].seller}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                                <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-white sm:w-40 sm:flex-shrink-0">
                                      Heat Sheet
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-[#999] sm:col-span-2">
                                      <p>
                                        1 Heat = 1 MATIC. You can give as many
                                        as you want. The more heat a song has,
                                        the higher on the queue it is.
                                      </p>
                                    </dd>
                                  </div>
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-white sm:w-40 sm:flex-shrink-0">
                                      Amount of Heat to Give
                                    </dt>
                                    {/* <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                      New York, NY, USA
                                    </dd> */}
                                    <Input
                                      type="number"
                                      placeholder="ex. 0.1"
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Button
                                      className="w-full"
                                      variant="destructive"
                                    >
                                      Give Heat <Flame />
                                    </Button>
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>
                    {/* <Dialog>
                      <DialogTrigger>
                        <Button className="w-96" variant="default">
                          Give Heat <Flame />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you are done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value="Pedro Duarte"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Username
                            </Label>
                            <Input
                              id="username"
                              value="@peduarte"
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog> */}
                  </div>

                  <div className="flex w-full mt-4">
                    {/* <Button className="w-full" variant="outline">
                      More Info
                    </Button> */}
                    <Dialog>
                      <DialogTrigger>
                        <Button className="w-96" variant="outline">
                          More Info
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you are done.
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ) : (
                <MusicLoader />
              )}
            </main>

            <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-l border-gray-200 dark:border-[#333] bg-gray-100 dark:bg-black xl:flex xl:flex-col">
              {/* Secondary column (hidden on smaller screens) */}
              <div className="">
                <div>
                  <div></div>
                </div>
              </div>
              <h1 className="mt-6 ml-3 text-gray-500 dark:text-white text-lg uppercase tracking-wider font-medium">
                Heat Leaderboard
              </h1>
              <ul role="list" className="p-4 space-y-4">
                {/* {Array.from({ length: 5 }).map((_, i) => ( */}

                {topThreeNfts.length > 0 ? (
                  topThreeNfts.map((nft, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, translateX: -50 }}
                      animate={{ opacity: 1, translateX: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center overflow-hidden rounded-lg dark:bg-[#111] dark:border-[#333] border px-4 py-5 shadow sm:p-6">
                        {/* Image */}
                        <Image
                          className="w-16 h-16 mr-4 rounded-md"
                          src={nft.coverImage}
                          alt="Image description"
                          width={64}
                          height={64}
                        />

                        {/* Content */}
                        <div>
                          <dt className="truncate text-sm font-medium text-gray-500 dark:text-white">
                            {nft.title}
                          </dt>
                          <dd className="mt-1 flex text-3xl font-semibold tracking-tight text-gray-900 dark:text-[#999]">
                            {nft.heatCount} <Flame className="mt-1.5" />
                          </dd>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <LeaderboardLoader />
                )}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
