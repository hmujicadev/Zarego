import { Dialog, Transition } from '@headlessui/react'
import { Fragment, Dispatch, SetStateAction } from 'react'
import { createTask, getTasks } from '../../services/tasks'

interface ConfirmModalProps {
    closeConfirmModal: () => void,
    isOpen: boolean,
    task: any,
    setTasks: Dispatch<SetStateAction<any>>,
}

const ConfirmModal = ({ closeConfirmModal, isOpen, task, setTasks }: ConfirmModalProps,) => {

    const deleteTask = async () => {
        try {
            let oldStatus = task.status;
            task.status = 3;
            await closeConfirmModal()
            await createTask(task, task.id);
            setTasks(await getTasks(oldStatus, 0))
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeConfirmModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-700 opacity-20" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                                >
                                    Confirm
                                </Dialog.Title>
                                <div className="mt-2">
                                    <span>Are you sure to delete this task?</span >

                                    <div className="flex justify-end mt-5">
                                        <button
                                            type="button"
                                            onClick={closeConfirmModal}
                                            className="mr-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={() => deleteTask()}
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-600 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
export default ConfirmModal