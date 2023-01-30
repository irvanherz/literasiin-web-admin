import { axiosInstance } from 'libs/api'

export default class StoriesService {
  static async findMany (params: any) {
    const resp = await axiosInstance.get('http://localhost:3001/stories', { params })
    return resp
  }

  static async findById (id: number) {
    const resp = await axiosInstance.get(`http://localhost:3001/stories/${id}`)
    return resp
  }
}
