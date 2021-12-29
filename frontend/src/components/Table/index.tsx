import { TableTypes, TaskType } from '../../interfaces'
import Image from 'next/image'
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import ConfirmModal from '../ConfirmModal'
import { useState } from 'react'


const titles = ['Title', 'Description', 'Status', 'Actions']

const Table = ({ tasks, setSelected, selected, openModal, setTasks }: TableTypes) => {
  const seeAllTasks = async () => {
    setSelected({ title: 'All', value: '0' })
  };
  const [isOpen, setIsOpen] = useState(false)
  const [confirmModalTask, setConfirmModalTask] = useState(null)
  // Confirm Modal
  const closeConfirmModal = () => {
    setIsOpen(false)
  }
  const openConfirmModal = (task: any) => {
    setConfirmModalTask(task)
    setIsOpen(true)
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-white">
              <thead className="bg-gray-700">
                <tr>
                  {titles.map((title, titleIdx) => (
                    <th
                      key={title}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider ${titleIdx == 3 && 'text-right'}`}>
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tasks?.rows.length ? (
                  tasks.rows.map((task, taskIndex: number) => (
                  <tr key={taskIndex} className={taskIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task?.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task?.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task?.status}</td>
                      <td className=" px-6 py-4 text-right text-sm font-medium">
                        <a onClick={() => openModal(task)} href="#" className="text-gray-700 hover:text-indigo-900">
                          <PencilAltIcon className="h-6 inline-flex mr-3" />
                      </a>
                        <a onClick={() => openConfirmModal(task)} href="#" className="text-gray-700 text-red-500  hover:text-indigo-900">
                          <TrashIcon className="h-6 inline-flex" />
                      </a>
                    </td>
                  </tr>
                  ))) : (
                    <tr className='bg-gray-600'>
                      <td colSpan={4} rowSpan={4} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="select-none flex flex-col items-center mx-w-100">
                          <Image width="600" height="400" alt="No hay Registros" src="/images/travolta.gif"></Image>
                          {selected && selected.value == 0 ?
                            (
                              <h2 className="mt-4 text-gray-400 text-center">there are no tasks</h2>
                            ) :
                            (
                              <h2 className="mt-4 text-gray-400 text-center">there are no tasks with this status <a onClick={seeAllTasks} className="cursor-pointer text-gray-300 hover:text-gray-100 underline">see all here</a></h2>
                            )
                          }
                        </div>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
            <ConfirmModal setTasks={setTasks} task={confirmModalTask} isOpen={isOpen} closeConfirmModal={closeConfirmModal} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Table