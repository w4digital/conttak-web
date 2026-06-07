import type { Metadata } from "next";
import { EventosClient } from "./eventos-client";

export const metadata: Metadata = {
  title: "Eventos | Conttak",
};

export default function EventosPage() {
  return <EventosClient />;
}
