import { useAuthBootstrap } from "@/feature/auth/useAuthBootstrap";
import { useGetTablesQuery } from "@/feature/table/tableApi";
import { GuestRoomPage } from "./GuestRoomPage";
import { AdminRoomPage } from "./AdminRoomPage";
import { UserRoomPage } from "./UserRoomPage";

export const RoomPage = () => {
  /* user */
  const { user, isAuthenticated, isLoading } = useAuthBootstrap();
  const isAdmin = isAuthenticated && user?.role === "admin";

  /* tables */
  const { data: tablesData, isLoading: isTablesLoading } = useGetTablesQuery();

  /* loadings */
  if (isLoading || isTablesLoading || tablesData == null) {
    return (
      <header className="...">
        <div className="px-5 py-5 text-[var(--text-muted)]">Loading...</div>
      </header>
    );
  }

  return (
    <div>
      {!isAuthenticated ? (
        <GuestRoomPage tablesData={tablesData} />
      ) : isAdmin ? (
        <AdminRoomPage tablesData={tablesData} />
      ) : (
        <UserRoomPage tablesData={tablesData} />
      )}
    </div>
  );
};
