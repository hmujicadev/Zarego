import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { STATES } from '../../constants'
import { SelectCustomTypes } from '../../interfaces'

const SelectCustom = ({ selected, setSelected }: SelectCustomTypes) => {
  return (
    <div className="h-10 w-32">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected.title}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {STATES.map((status) => (
                <Listbox.Option
                  key={status.value}
                  className={({ active }) =>
                    `${active ? ' text-gray-900 bg-green-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-7 pr-4`
                  }
                  value={status}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                      >
                        {status.title}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? 'text-green-600' : 'text-green-600'
                            }
                                absolute inset-y-0 left-0 flex items-center pl-1`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default SelectCustom