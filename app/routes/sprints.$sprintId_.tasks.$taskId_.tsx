import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { EditableTaskModal } from "~/domains//tasks/EditableTaskModal";
import { json } from "@remix-run/node";
import { db } from "~/services/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const sprint = await db.task.findUnique({
    where: {
      id: Number(params.taskId ?? 0) || 0,
    },
  });
  return json(sprint, { status: sprint != null ? 200 : 404 });
};

export default function Edit() {
  const task = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return <>
    <EditableTaskModal
      show={ true }
      task={ task }
      onCancel={ hideEditableTaskModal }
    />
  </>

  function hideEditableTaskModal(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    return navigate('..', { replace: true });
  }
}
