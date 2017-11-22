import { devlog } from "./utils/log"
import axios from "axios"

export default class Api {
  constructor(baseUrl, token, headersExpose) {
    this.baseUrl = baseUrl
    this.token = token
    this.headersExpose = headersExpose
  }
  withToken(token) {
    return new Api(this.baseUrl, token)
  }
  request = async request => {
    try {
      const response = await request
      return response.data
    } catch (err) {
      devlog("ERROR API", err)

      if (err.message === "Network Error") {
        return { error: "API", data: { response: { data: "Network Error" } } }
      }
      return { error: "API", data: err }
    }
  }

  url = url => `${this.baseUrl}${url}`
  generateHeader = () => ({
    "Content-Type": "application/json",
    Authorization: this.token ? `Bearer ${this.token}` : undefined,
  })
  generateInstance = () => {
    return axios.create({
      baseURL: this.baseUrl,
      headers: this.generateHeader(),
    })
  }
  get = async (url, params) =>
    this.request(this.generateInstance().get(url, { params }));
  getExcel = async (url, params) =>
    this.request(this.generateExcelInstance().get(url, { params }))
  post = async (url, body) =>
    this.request(this.generateInstance().post(url, body))
  del = async url => this.request(this.generateInstance().delete(url))
  put = async (url, body) =>
    this.request(this.generateInstance().put(url, body))
  patch = async (url, body) =>
    this.request(this.generateInstance().patch(url, body))
}
