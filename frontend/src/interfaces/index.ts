import { Dispatch, SetStateAction } from "react";
export interface TasksTypes{
  page: number,
  pagesTotal: number,
  rowsTotal: number,
  rows: [{
    id: number,
    title: string,
    description: string,
    status: number,
  }]
}

export interface TaskType{
    id: number,
    title: string,
    description: string,
    status: number,
}
export interface TableTypes {
  tasks: TasksTypes | null,
  selected: {
    title: string,
    value:number},
  setSelected: Dispatch<SetStateAction<any>>,
  openModal: any,
  setTasks:Dispatch<SetStateAction<any>>,
}
export interface SelectCustomTypes{
  selected: {
    title: string,
    value:number
  },
  setSelected:Dispatch<SetStateAction<any>>,
}

export interface PaginateTypes{
  setPage:Dispatch<SetStateAction<number>>,
  tasks: any,
  selected: number,
} 