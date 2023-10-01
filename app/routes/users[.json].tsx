import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/services/db.server";

export const loader = async ({ request }: ActionArgs) => {
  switch(request.method) {
    case 'GET': {
      const users = await db.user.findMany();
      return json(users);
    }

    default: {
      return json({}, { status: 405 });
    }
  }
};
