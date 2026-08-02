import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative">
        <SignedIn>
          {children}
        </SignedIn>
        <SignedOut>
          <div className="flex items-center justify-center min-h-screen bg-zinc-950">
            <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl text-center space-y-4 max-w-sm w-full">
              <h2 className="text-xl font-bold text-white">Admin Authentication</h2>
              <p className="text-sm text-zinc-400">Please sign in to access the portfolio admin panel.</p>
              <div className="pt-2">
                <RedirectToSignIn />
              </div>
            </div>
          </div>
        </SignedOut>
      </div>
    </ClerkProvider>
  );
}
