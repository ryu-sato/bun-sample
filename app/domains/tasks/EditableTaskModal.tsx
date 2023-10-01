import { useEffect, type FormEventHandler, type MouseEventHandler } from "react";
import { ValidatedForm } from "remix-validated-form";
import { useFetcher } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { zfd } from "zod-form-data";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import type { User } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { FormInput } from "~/components/FormInput";
import { FormSelect } from "~/components/FormSelect";
import { FormTextArea } from "~/components/FormTextArea";
import { FormSubmitButton } from "~/components/FormSubmitButton";
import { taskCreateFormValidator } from "~/domains/tasks/NewTaskModal";
import type { SerializedTask } from "~/services/tasks.client";
import { TaskSchema } from '~/../prisma/generated/zod';

const zod = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

type EditableTaskModalProps = {
  task: SerializedTask | null,
  show?: boolean,
  onCancel?: MouseEventHandler<HTMLButtonElement>,
  onSubmit?: FormEventHandler<HTMLFormElement>,
}

export const taskUpdateFormData = zfd.formData(zod);

export const taskUpdateFormValidator = withZod(zod);

export function EditableTaskModal(props: EditableTaskModalProps) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data == null) {
      fetcher.load('/users.json');
    }
  }, [fetcher]);

  const selectableUsers = fetcher.data?.map((user: SerializeFrom<User>) => ({ value: user.id, label: user.name }));

  if (props.task == null) {
    return <></>;
  }

  return (
    <Modal isOpen={ props.show } id="domains.tasks.EditableTaskModal">
      <ValidatedForm
        action={ `/tasks/${ props.task.id }` }
        method="post"
        validator={ taskCreateFormValidator }
        defaultValues={
          {
            title: props.task.title ?? undefined,
            body: props.task.body ?? undefined,
            status: (props.task.status as 'OPEN'|'INPROGRESS'|'TOVERIFY'|'DONE'|'REJECT') ?? undefined,
            swimlaneId: props.task.swimlaneId,
            assigneeId: props.task.assigneeId,
          }
        }
        resetAfterSubmit={ true }
        onSubmit={ (_data, event) => props.onSubmit && props.onSubmit(event) }
      >
        <input type="hidden" name="intent" value="put" />

        <ModalHeader>
          Edit task
        </ModalHeader>
        <ModalBody>
          <FormInput type="number" name="swimlaneId" label="swimlaneId" />
          <FormInput type="text" name="title" label="title" />
          <FormInput type="text" name="status" label="status" />
          <FormTextArea name="body" label="body" />
          <FormSelect name="assigneeId" label="assigneeId" options={ selectableUsers || [] } />
        </ModalBody>
        <ModalFooter>
          <button type="reset" className="btn btn-sm btn-secondary" onClick={ props.onCancel }>Cancel</button>
          <FormSubmitButton text="Update" textProcessing="Updating..." />
        </ModalFooter>
      </ValidatedForm>
    </Modal>
  );
}
