import { motion, AnimatePresence } from "framer-motion";
import {
  useNetworkMismatch,
  useAddress,
  ConnectWallet,
  useNetwork,
} from "@thirdweb-dev/react";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    title: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
];
const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];

const TextAnimation = ({ address = "" }) => {
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
      },
    }),
  };

  const renderLetters = () => {
    return address.split("").map((letter, index) => (
      <motion.span
        key={index}
        custom={index}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {letter}
      </motion.span>
    ));
  };

  return <>{renderLetters()}</>;
};

export default function Example() {
  const address = useAddress();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const [songTitle, setSongTitle] = useState("");

  function handleDrop(e: any) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
  }

  function handleFileInputChange(e: any) {
    setFile(e.target.files[0]);
    // @ts-ignore
    setFileUrl(URL.createObjectURL(e.target.files[0]));
  }

  function handleFormSubmit(e: any) {
    e.preventDefault();
    // do something with the file, such as upload it to a server
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Checkout</h2>

          <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Upload song to Etherwav
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Choose song
                  </label>
                  <div className="mt-1">
                    {/* <input
                    type="file"
                    id="email-address"
                    name="email-address"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  /> */}
                    {/* <input
                    type="file"
                    className="block w-full text-sm text-gray-500 file:py-1 file:px-6 file:rounded file:border-1 file:border-gray-400"
                  /> */}
                    <div className="rounded-md border">
                      <div className="mb-4 p-4">
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div
                        className=" p-4 text-center"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                      >
                        <p className="text-gray-600">
                          Drag and drop a file here or choose a file.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  {/* <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Song title
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email-address"
                    name="email-address"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  /> */}

                  <Label htmlFor="email">Title</Label>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setSongTitle(e.target.value);
                    }}
                    id="title"
                    placeholder="Song title..."
                    className=""
                  />
                </div>

                <div className="mt-4">
                  <Label htmlFor="email">Genre</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
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

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Confirm Upload
              </h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product.id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        {fileUrl ? (
                          <img
                            // @ts-ignore
                            src={fileUrl}
                            alt={product.imageAlt}
                            className="w-20 rounded-md"
                          />
                        ) : (
                          <div className="bg-gray-200 w-20 h-20 animate-pulse rounded-md"></div>
                        )}
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4>
                              {songTitle ? (
                                <span className=" text-lg text-gray-700">
                                  {songTitle}
                                </span>
                              ) : (
                                <div className="bg-gray-200 w-1/3 h-6 animate-pulse rounded-md">
                                  &nbsp;Song Title
                                </div>
                              )}
                            </h4>
                            {/* <p className="mt-1 text-sm text-gray-500">BLACK</p> */}
                            {/* <span className="text-sm">{address}</span> */}
                            <AnimatePresence>
                              {address ? (
                                <TextAnimation address={address} />
                              ) : (
                                <div className="mt-1 bg-gray-200 w-1/3 h-6 animate-pulse rounded-md">
                                  &nbsp;Address
                                </div>
                              )}
                            </AnimatePresence>
                            {/* <p className="mt-1 text-sm text-gray-500">GENRE</p> */}
                            <div className="mt-1 bg-gray-200 w-1/3 h-6 animate-pulse rounded-md">
                              &nbsp;Genre
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <Button type="submit" variant="default" className="w-full">
                    Upload song!
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
