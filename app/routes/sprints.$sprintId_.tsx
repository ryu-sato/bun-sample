import type { ShouldRevalidateFunction} from "@remix-run/react";
import { Outlet, useLoaderData } from "@remix-run/react";
import { SprintTable } from "~/domains/sprints/SprintTable";
import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/services/db.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Sprint" },
  ];
};

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return true;
};

export const loader = async ({ params }: LoaderArgs) => {
  const sprint = await db.sprint.findUnique({
    where: {
      id: Number(params.sprintId ?? 0) || 0,
    },
    include: {
      swimlanes: {
        include: {
          tasks: {
            include: {
              assignee: true,
            },
          },
        }
      },
    }
  });
  return json(sprint, { status: sprint != null ? 200 : 404 });
};

export default function Show() {
  const sprint = useLoaderData<typeof loader>();

  if (sprint == null) {
    return <></>
  }

  return <>
    <SprintTable { ...sprint } />
    <Outlet />
  </>;
}
