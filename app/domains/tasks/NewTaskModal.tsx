import { useEffect, type FormEventHandler, type MouseEventHandler} from 'react';
import { ValidatedForm } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { TaskSchema, type User } from '~/../prisma/generated/zod';
import { useFetcher } from '@remix-run/react';
import type { SerializeFrom } from '@remix-run/node';
import { zfd } from "zod-form-data";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormInput } from '~/components/FormInput';
import { FormSubmitButton } from '~/components/FormSubmitButton';
import { FormTextArea } from '~/components/FormTextArea';
import { FormSelect } from '~/components/FormSelect';

const zod = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

type NewTaskModalProps = {
  show?: boolean,
  onCancel: MouseEventHandler<HTMLButtonElement>,
  onSubmit: FormEventHandler<HTMLFormElement>,
  swimlaneId: number,
}

export const taskCreateFormData = zfd.formData(zod);
export const taskCreateFormValidator = withZod(zod);

export function NewTaskModal(props: NewTaskModalProps) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data == null) {
      fetcher.load('/users.json');
    }
  }, [fetcher]);

  const selectableUsers = fetcher.data?.map((user: SerializeFrom<User>) => ({ value: user.id, label: user.name }));

return <>
    <Modal isOpen={ props.show } id="domains.tasks.EditableTaskModal">
      <ValidatedForm
        method="post"
        validator={ taskCreateFormValidator }
        defaultValues={
          {
            swimlaneId: props.swimlaneId,
            status: 'OPEN',
          }
        }
        resetAfterSubmit={ true }
        onSubmit={ (_data, event) => props.onSubmit(event) }
      >
        <FormInput type="number" name="swimlaneId" label="swimlane" hidden={ true } />
        <FormInput type="text" name="status" label="status" hidden={ true } />

        <ModalHeader>
          New task
        </ModalHeader>
        <ModalBody>
          <FormInput type="text" name="title" label="title" />
          <FormTextArea name="body" label="body" />
          <FormSelect name="assigneeId" label="assigneeId" options={ selectableUsers || [] } />
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-sm btn-secondary" onClick={ props.onCancel }>Cancel</button>
          <FormSubmitButton text="Create" textProcessing="Creating..." />
        </ModalFooter>
      </ValidatedForm>
    </Modal>
  </>
}
