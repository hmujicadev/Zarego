import axios from "../config/axios"


export const getTasks = async (status: number,page:number) => {
  try {
    const res = await axios.get(`/tasks/`,{
      params: {
        status: status,
        page: page,
      }
    })
    return res.data;
  } catch (error) {
  }
}

export const createTask = async (data: any, id: {}) => {
  let { title, description, status } = data

  try {
    const res = await axios.post(`/tasks/`,{
      title: title,
      description: description,
      status: status,
      id:id,
    })
    return res.data;
  } catch (error) {
    console.log(error)
  }
}
