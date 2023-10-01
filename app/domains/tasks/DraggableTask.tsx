import type { Task, User } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { SortableItem } from "~/components/SortableItem";

export type TaskWithAssignee = Omit<SerializeFrom<Task>, "assigneeId"> & {
  assignee?: SerializeFrom<User>;
}
type DraggableTaskProps = TaskWithAssignee

export function DraggableTask(task: DraggableTaskProps) {
  if (task == null) {
    return <></>
  }

  return (
    <SortableItem
      id={ String(task.id) }
      className="card d-inline-flex m-1"
      style={{
        width: "150px",
        height: "150px",
      }}
    >
      <div
        className="card-body"
      >
        <div
          className="d-flex"
        >
          <Link
            to={ `/tasks/${ task.id }` }
            className="d-inline-block flex-fill"
          >
            { task.id }
          </Link>
          <div>
            <Link
              to={ `./tasks/${ task.id }` }
              replace={ true }
            >
              <span
                className="btn btn-sm btn-outline-secondary"
              >
                &#9998;
              </span>
            </Link>
          </div>
        </div>

        { task.title }
      </div>
      <div
        className="card-footer"
        style={
          {
            backgroundColor: task.assignee?.taskColor,
            color: task.assignee?.taskColor != null ? textColor(task.assignee.taskColor) : undefined,
          }
        }
      >
        { task.assignee?.name || "-" }
      </div>
    </SortableItem>
  )

  function textColor(bgColorString: string) {
    const bgColorR = Number(bgColorString.substr(1, 2));
    const bgColorG = Number(bgColorString.substr(3, 4));
    const bgColorB = Number(bgColorString.substr(5, 6));
    const textColor = `#${ (0xFF - bgColorR).toString(16) }${ (0xFF - bgColorG).toString(16) }${ (0xFF - bgColorB).toString(16) }`;
    return textColor;
  }
}
