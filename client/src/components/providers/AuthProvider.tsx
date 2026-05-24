import { useAuthBootstrap } from "@/feature/auth/useAuthBootstrap";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuthBootstrap();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};
