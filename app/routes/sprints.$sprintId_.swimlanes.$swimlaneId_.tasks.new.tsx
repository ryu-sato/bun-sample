import { useNavigate } from "@remix-run/react";
import { useParams } from "react-router-dom";
import { NewTaskModal, taskCreateFormData } from "~/domains/tasks/NewTaskModal";
import * as Task from '~/services/tasks.client';

export default function New() {
  const navigate = useNavigate();
  const { swimlaneId } = useParams();

  return <>
    <NewTaskModal
      show={ true }
      onCancel={ cancelNewTaskModal }
      onSubmit={ createNewTaskModal }
      swimlaneId={ Number(swimlaneId) }
    />
  </>

  function cancelNewTaskModal(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    navigate('..', { replace: true,  });
  }

  function createNewTaskModal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const newTaskData = taskCreateFormData.parse(formData);
    (async () => await Task.create(newTaskData))();

    navigate('..', { replace: true });
  }
}
