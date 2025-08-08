import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next|sign-in|sign-up).*)", // Exclude sign-in and sign-up from protection
    "/",
    "/(api|trpc)(.*)"
  ],
}; 