import Table from '../Table'
import Select from '../Select'
import Paginate from '../Paginate'
import { ViewGridAddIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import Modal from '../Modal'
import FormTask from '../FormTask'
import { getTasks } from '../../services/tasks'
import { STATES } from '../../constants'


const Task = () => {
  // Hooks
  const [tasks, setTasks] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(STATES[0])
  const [page, setPage] = useState(0)
  const [taskSelected, setTaskSelected] = useState(null)

  // Modal
  const closeModal = () => {
    setIsOpen(false)
  }
  const openModal = (data: any) => {
    setTaskSelected(data)
    setIsOpen(true)
  }
  //Service Functions
  const obtainTasks = async (status?: any, offset?: any) => {
    if (status && offset) {
      await setTasks(await getTasks(status, offset))
    } else {
      await setTasks(await getTasks(selected.value, page))
    }

  }
  // General Functions
  const init = () => {
    obtainTasks()
  }

  // Listeners
  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    obtainTasks()
  }, [selected, page])

  return (

    <div className="rounded bg-gray-600 shadow-xl shadow-gray-800 p-10">
      <div className="flex justify-between">
        <h2 className="text-center text-white text-2xl mb-5 font-bold">TASKS CHALLENGE</h2>
        {/* Filter and create button */}
        <div className="flex basis-80 justify-between items-start">
          <button
            type="submit"
            onClick={() => openModal(null)}
            className="mt-1 inline-flex justify-center px-4 py-2 text-sm font-medium text-green-600 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 bg-green-100"
          >
            Create New Task
            <ViewGridAddIcon className="ml-2 h-4 w-4" aria-hidden="true" />
          </button>
          <Select selected={selected} setSelected={setSelected} />
        </div>

      </div>

      <Table setTasks={setTasks} tasks={tasks} setSelected={setSelected} selected={selected} openModal={openModal} />
      {/* Paginate */}
      <Paginate tasks={tasks} setPage={setPage} selected={selected.value} />

      <Modal taskSelected={taskSelected} closeModal={closeModal} isOpen={isOpen}><FormTask taskSelected={taskSelected} closeModal={closeModal} obtainTasks={obtainTasks} /></Modal >

    </div>
  )
}
export default Task