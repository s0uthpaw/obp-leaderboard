import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BillingClient from "./BillingClient";

export default async function BillingPage() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in?redirect_url=%2Fbilling"); // force auth if needed
  return <BillingClient />;
}