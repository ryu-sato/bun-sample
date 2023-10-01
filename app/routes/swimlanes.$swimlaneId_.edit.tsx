import { json, type LoaderArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { db } from "~/services/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const swimlane = await db.swimlane.findUnique({
    where: {
      id: Number(params.swimlaneId ?? 0) || 0,
    },
    include: {
      tasks: true,
      sprint: true,
    },
  });
  return json(swimlane, { status: swimlane != null ? 200 : 404 });
};

export default function Edit() {
  const swimlane = useLoaderData<typeof loader>();

  if (swimlane == null) {
    return <></>
  }

  const parentSprintLink = `/sprints/${ swimlane.sprint.id }`;

  return (
    <div>
      <h2>Swimlane</h2>
      <dl>
        <dt>id</dt><dd>{ swimlane.id }</dd>
        <dt>title</dt><dd>{ swimlane.title }</dd>
        <dt>body</dt><dd>{ swimlane.body }</dd>
        <dt>point</dt><dd>{ swimlane.point }</dd>
        <dt>sprint</dt>
        <dd>
          <Link
            to={ parentSprintLink }
          >
            { parentSprintLink }
          </Link>
        </dd>
      </dl>
      <ul>
        { swimlane.tasks.map((t) => (
          <li
            key={ t.id }
          >
            <Link
              to={ `/tasks/${ t.id }` }
            >
              { t.title }
            </Link>
          </li>
        ))}
      </ul>
      <Form method="post">
        <button name="intent" type="submit" value="delete">
          Delete
        </button>
      </Form>
    </div>
  );
}
