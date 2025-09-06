import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BillingClient from "./BillingClient";

export default async function BillingPage() {
  const { userId } = await auth(); // server auth, awaited

  if (!userId) {
    redirect("/sign-in?redirect_url=%2Fbilling");
  }

  return <BillingClient />;
}