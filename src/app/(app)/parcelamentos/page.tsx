import type { Metadata } from "next";
import { ParcelamentosClient } from "./parcelamentos-client";

export const metadata: Metadata = {
  title: "Parcelamentos | Conttak",
};

export default function ParcelamentosPage() {
  return <ParcelamentosClient />;
}
