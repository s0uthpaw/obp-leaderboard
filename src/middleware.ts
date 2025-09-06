// src/middleware.ts
import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/billing(.*)",
  "/dashboard(.*)",
  "/api/billing(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = auth();
    if (!userId) {
      const url = new URL("/sign-in", req.url);
      url.searchParams.set("redirect_url", req.url);
      url.searchParams.set("redirectUrl", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // run on all app routes (not static)
};