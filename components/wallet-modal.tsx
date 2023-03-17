import React from "react";
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
import { Button } from "@/components/ui/button";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function WalletModal() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {" "}
        <Button
          // onClick={connectWallet}
          type="button"
          variant="default"
          className="w-full"
        >
          Please connect your wallet to upload your song to Etherwav
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please Connect to Polygon Mainnet</AlertDialogTitle>
          <AlertDialogDescription>
            <ConnectWallet />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
