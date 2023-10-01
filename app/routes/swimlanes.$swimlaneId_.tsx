import { Form, Link, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { db } from "~/services/db.server";
import { taskUpdateFormValidator } from "~/domains/tasks/EditableTaskModal";

export const loader = async ({ params }: LoaderArgs) => {
  const swimlane = await db.swimlane.findUnique({
    where: {
      id: Number(params.swimlaneId ?? 0) || 0,
    },
    include: {
      tasks: true,
      sprint: true
    },
  });
  return json(swimlane, { status: swimlane != null ? 200 : 404 });
};

export const action = async ({ request, params }: ActionArgs) => {
  if (params.swimlaneId == null) {
    return json({}, { status: 400 });
  }
  const form = await request.formData();
  const method = form.get("intent") || request.method;

  switch(method.toString().toUpperCase()) {
    case 'DELETE': {
      const swimlane = await db.swimlane.delete({
        where: {
          id: parseInt(params.swimlaneId),
        },
        include: {
          sprint: true,
        },
      });
      return redirect(`/sprints/${ swimlane.sprint.id }`);
    }

    case 'PUT': {
      const validationResult = await taskUpdateFormValidator.validate(form);
      if (validationResult.error) {
        console.log(validationResult.error);
        return json({}, { status: 400 });
      }

      const swimlane = await db.swimlane.update({
        where: {
          id: parseInt(params.swimlaneId),
        },
        data: validationResult.data,
        include: {
          sprint: true,
        },
      });
      return redirect(`/sprints/${ swimlane.sprint.id }`);
    }

    default: {
      return json({}, { status: 405 });
    }
  }
};

export default function Show() {
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
