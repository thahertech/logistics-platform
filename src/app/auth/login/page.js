import { GalleryVerticalEnd } from "lucide-react"
import 'tailwindcss/tailwind.css';
//import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-transparent p-6 md:p-10">
      <div className="flex w-full max-w-2xl flex-col gap-6">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Logistix.
      </div>
    </div>
  )
}
