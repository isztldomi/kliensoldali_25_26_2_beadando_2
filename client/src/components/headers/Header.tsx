import { useEffect, useRef, useState } from "react";
import { ThemeButton } from "@/components/buttons/ThemeButton";
import { HeaderLink } from "./HeaderLink";
import { useAuthBootstrap } from "@/feature/auth/useAuthBootstrap";

export const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuthBootstrap();
  const isAdmin = isAuthenticated && user?.role === "admin";

  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <header className="...">
        <div className="px-5 py-5 text-[var(--text-muted)]">Loading...</div>
      </header>
    );
  }

  return (
    <header
      className={`
        sticky top-0 z-50
        flex items-center
        px-5 py-5
        bg-[var(--surface-1)]
        border-b border-[var(--border)]
        transform
        transition-transform transition-colors duration-300 ease-in-out
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div className="flex w-full items-center justify-between">
        {/* egy egység */}
        <div className="flex gap-6 items-center">
          {/* mindig */}
          <HeaderLink to="">
            <h1>Roomlie</h1>
          </HeaderLink>
          {/* mindig */}
          <HeaderLink to="room">
            <h3>Terem</h3>
          </HeaderLink>
          {isAuthenticated && (
            <>
              {isAdmin ? (
                /* bejelentkezett -> admin */
                <HeaderLink to="reservation/all">
                  <h3>Beérkezett Foglalások</h3>
                </HeaderLink>
              ) : (
                /* bejelentkezett -> felhasználó */
                <HeaderLink to="reservation/me">
                  <h3>Foglalásaim</h3>
                </HeaderLink>
              )}
            </>
          )}
        </div>

        {/* egy egység */}
        <div className="flex gap-6 items-center">
          {isAuthenticated ? (
            /* bejelentkezett */
            <>
              <div>
                <h3>user name</h3>
              </div>
              <HeaderLink to="logout">
                <h3>Kijelentkezés</h3>
              </HeaderLink>
            </>
          ) : (
            /* Guest */
            <>
              <HeaderLink to="login">
                <h3>Bejelentkezés</h3>
              </HeaderLink>

              <HeaderLink to="registration">
                <h3>Regisztráció</h3>
              </HeaderLink>
            </>
          )}
          {/* mindig */}
          <ThemeButton />
        </div>
      </div>
    </header>
  );
};
