import React, { useEffect, useState, } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { STATES } from '../../constants'
import { TaskType } from "../../interfaces";
import { createTask } from '../../services/tasks'
interface FormInput {
  title?: string;
  description?: string;
  status?: boolean;
  update?: boolean;
  closeModal: () => void,
  taskSelected: TaskType | null,
  obtainTasks: any
}

const formStates = STATES.filter((status) => status.value != 0)

const FormTask = ({ closeModal, taskSelected, obtainTasks }: FormInput) => {

  const { register, handleSubmit, formState: { errors, isDirty, isSubmitting, touchedFields, isValid, submitCount } } = useForm<FormInput>(
    { defaultValues: { title: taskSelected?.title, description: taskSelected?.description } }
  );
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    let taskEdit: any = await taskSelected?.id ? taskSelected?.id : null;
    await createTask(data, taskEdit)
    await closeModal()
    await obtainTasks(0, 0)
  };
  useEffect(() => {

  }, [])

  return (
    <form className="px-1 pt-6" onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col mb-5'>
        <label className='mb-1' htmlFor="title">Title</label>
        <input defaultValue={taskSelected?.title} className={`border border-solid border-gray-300 rounded h-8 px-2 focus:caret-green-300 focus:outline-green-300`} type="text" {...register("title", { required: true, maxLength: 20 })} />
      </div>
      <div className='flex flex-col mb-5'>
        <label className='mb-1' htmlFor="description">Description</label>
        <input defaultValue={taskSelected?.description} className={`border border-solid border-gray-300 rounded h-8 px-2 focus:caret-green-300 focus:outline-green-300`} type="text" {...register("description", { required: true, maxLength: 20 })} />
      </div>
      <div className='flex flex-col mb-10'>
        <label className='mb-1' htmlFor="status">Status</label>
        <select defaultValue={taskSelected?.status} className="h-8 border border-solid border-gray-300 rounded h-8 px-2 focus:caret-green-300 focus:outline-green-300" {...register("status", { required: true })}>
          {formStates.map((status, index) => (
            <option key={index} value={status.value}>
              {status.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={closeModal}
          className="mr-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-600 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          {taskSelected ? 'Update' : 'Create'}
        </button>
      </div>
    </form >
  );
}
export default FormTask