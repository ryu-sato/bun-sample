import { Outlet } from "@remix-run/react";

export default function SprintRoute() {
  return (
    <div>
      <h1>Sprints</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
