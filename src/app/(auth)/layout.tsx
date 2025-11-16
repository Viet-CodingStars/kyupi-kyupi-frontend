import { CoreServicesContainer } from "@/widgets/core-services";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      {/* Left side - Services Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
        <CoreServicesContainer />
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-start justify-center p-6 sm:p-12 bg-background overflow-y-auto">
        <div className="w-full max-w-md my-auto">{children}</div>
      </div>
    </div>
  );
}
