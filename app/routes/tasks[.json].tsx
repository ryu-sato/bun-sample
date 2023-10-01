import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/services/db.server";
import { taskCreateFormValidator } from "~/domains/tasks/NewTaskModal";

export const action = async ({ request }: ActionArgs) => {

  switch(request.method) {
    case 'POST': {
      const validationResult = await taskCreateFormValidator.validate(await request.json());
      if (validationResult.error) {
        console.warn(validationResult.error);
        return json({}, { status: 400 });
      }

      const task = await db.task.create({
        data: validationResult.data,
      });

      return json(task);
    }

    default: {
      return json({}, { status: 405 });
    }
  }
};
