import { AuthContainer } from "@/components/auth-container"
import { FeaturesSection } from "@/components/features-section"

export default function Home() {
  return (
    <main className="bg-background">
      <AuthContainer />
      <FeaturesSection />
    </main>
  )
}
