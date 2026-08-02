// middleware.ts (Kodingan Baru yang Benar)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Kita tentuin route mana aja yang mau diproteksi (wajib login)
// Di sini kita proteksi semua yang diawali dengan /admin
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  // Kalau user nyoba akses route yang diproteksi...
  if (isProtectedRoute(req)) {
    // ...Clerk bakal otomatis nge-cek login dan nendang ke login page kalau belum
    auth().protect();
  }
});

export const config = {
  // Ini matcher bawaan Clerk biar dia bisa nge-scan semua request kecuali static files
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};