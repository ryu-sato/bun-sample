import axios from "~/services/axios.client";
import type { Task } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";

export type SerializedTask = SerializeFrom<Task>

export async function create(task: Partial<SerializedTask>) {
  const response = await axios.post(`/tasks.json`, task);
  return response.data as SerializedTask;
}

export async function update(task: SerializedTask, updateFields: Partial<SerializedTask>) {
  const response = await axios.put(`/tasks/${ task.id }.json`, updateFields);
  return response.data as SerializedTask;
}
