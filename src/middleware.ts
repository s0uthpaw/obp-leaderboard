// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Update this predicate to match what you want to protect
function isProtectedRoute(req: Request) {
  const path = new URL(req.url).pathname;
  // Example: protect everything under /billing (adjust as you like)
  return path.startsWith("/billing");
}

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth(); // <-- await is required here
    if (!userId) {
      const url = new URL("/sign-in", req.url);
      url.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
});

// Adjust matcher to cover only what you want the middleware to run on.
// This example runs on all app routes except assets and _next.
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};