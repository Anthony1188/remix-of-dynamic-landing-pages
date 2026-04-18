import { Outlet } from "react-router-dom";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
