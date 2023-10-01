import { Outlet } from "@remix-run/react";

export default function KanbansRoute() {
  return (
    <div>
      <h1>Kanbans</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
