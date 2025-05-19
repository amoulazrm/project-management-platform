import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({ children }) {
  return (
    <>
      {/* Providers and UI elements should be in RootLayout, so normally you don't need them here again. */}
      {/* If needed, keep only the children and any dashboard-specific UI here */}

      <div>
        {children}
        <footer>
          <p>&copy; {new Date().getFullYear()} ProjectHub. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
