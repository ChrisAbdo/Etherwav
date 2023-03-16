import Web3 from "web3";
import Radio from "backend/build/contracts/Radio.json";
import NFT from "backend/build/contracts/NFT.json";

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

const ipfsClient = require("ipfs-http-client");
const projectId = "2FdliMGfWHQCzVYTtFlGQsknZvb";
const projectSecret = "2274a79139ff6fdb2f016d12f713dca1";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const client = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

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

  const [formInput, updateFormInput] = useState({
    title: "",
    coverImage: "",
    genre: "",
  });

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const [coverImage, setCoverImage] = useState(null);

  const [genre, setGenre] = useState("");

  const [songTitle, setSongTitle] = useState("");

  function handleDrop(e: any) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
  }

  function handleDrop2(e: any) {
    e.preventDefault();
  }

  function handleDragOver2(e: any) {
    e.preventDefault();
  }

  function handleFileInputChange(e: any) {
    // @ts-ignore
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  async function onChange(e: any) {
    // upload image to IPFS

    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog: any) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.io/ipfs/${added.path}`;
      console.log(url);

      // @ts-ignore
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createCoverImage(e: any) {
    // upload image to IPFS
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog: any) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.io/ipfs/${added.path}`;
      console.log(url);
      // @ts-ignore
      setCoverImage(url);
      updateFormInput({
        ...formInput,
        coverImage: url,
      }); // update form input with cover image URL
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function uploadToIPFS() {
    const { title, coverImage, genre } = formInput;
    if (!title || !coverImage || !genre || !fileUrl) {
      return;
    } else {
      // first, upload metadata to IPFS
      const data = JSON.stringify({
        title,
        coverImage,
        image: fileUrl,
        genre,
      });
      try {
        const added = await client.add(data);
        const url = `https://ipfs.io/ipfs/${added.path}`;
        // after metadata is uploaded to IPFS, return the URL to use it in the transaction

        return url;
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
  }

  async function listNFTForSale() {
    try {
      // @ts-ignore
      const web3 = new Web3(window.ethereum);
      const url = await uploadToIPFS();

      const networkId = await web3.eth.net.getId();

      // Mint the NFT
      // @ts-ignore
      const NFTContractAddress = NFT.networks[networkId].address;
      // @ts-ignore
      const NFTContract = new web3.eth.Contract(NFT.abi, NFTContractAddress);
      const accounts = await web3.eth.getAccounts();

      const radioContract = new web3.eth.Contract(
        // @ts-ignore
        Radio.abi,
        // @ts-ignore
        Radio.networks[networkId].address
      );

      NFTContract.methods
        .mint(url)
        .send({ from: accounts[0] })
        .on("receipt", function (receipt: any) {
          console.log("minted");
          // List the NFT
          const tokenId = receipt.events.NFTMinted.returnValues[0];
          radioContract.methods
            .listNft(NFTContractAddress, tokenId)
            .send({ from: accounts[0] })
            .on("receipt", function () {
              console.log("listed");
            });
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Checkout</h2>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
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
                    <div className="rounded-md border">
                      <div className="mb-4 p-4">
                        <input
                          id="fileInput"
                          type="file"
                          accept="audio/*"
                          // onChange={handleFileInputChange}
                          onChange={onChange}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div
                        className=" p-4 text-center"
                        onDrop={handleDrop2}
                        onDragOver={handleDragOver2}
                      >
                        <p className="text-gray-600">
                          Drag and drop a file here or choose a file.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Choose cover image
                  </label>
                  <div className="mt-1">
                    <div className="rounded-md border">
                      <div className="mb-4 p-4">
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          // onChange={handleFileInputChange}
                          onChange={(e) => {
                            createCoverImage(e);
                            handleFileInputChange(e);
                          }}
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
                      // @ts-ignore
                      updateFormInput({ ...formInput, title: e.target.value });
                    }}
                    id="title"
                    placeholder="Song title..."
                    className=""
                  />
                </div>

                <div className="mt-4">
                  <Label htmlFor="email">Genre</Label>
                  <Select
                    onValueChange={(e) => {
                      setGenre(e);
                      // @ts-ignore
                      updateFormInput({ ...formInput, genre: e });
                    }}
                  >
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
                        {file ? (
                          <img
                            // @ts-ignore
                            src={file}
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
                            <span>
                              {genre ? (
                                <span className="text-lg">{genre}</span>
                              ) : (
                                <div className="mt-1 bg-gray-200 w-1/3 h-6 animate-pulse rounded-md">
                                  &nbsp;Genre
                                </div>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <Button
                    onClick={listNFTForSale}
                    type="submit"
                    variant="default"
                    className="w-full"
                  >
                    Upload song!
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
