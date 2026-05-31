"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Button onClick={()=> {
        router.replace('dashboard')
      }}>Click me</Button>
    </div>
  );
}
