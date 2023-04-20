import axios from 'axios'

export type RequestResponse<T> = { link: string; data: T }
export type RequestResult<T> = Record<string, T>

interface Service {
  requestsInSequence<T>(links: string[]): Promise<RequestResult<T>>
  requestsInParallel<T>(links: string[]): Promise<RequestResult<T>>
}

class RequestService implements Service {
  async requestsInSequence<T>(links: string[]): Promise<RequestResult<T>> {
    const result: RequestResult<T> = {}

    for (const link of links) {
      const { data } = await this.makeRequest<T>(link)
      result[link] = data
    }

    return result
  }

  async requestsInParallel<T>(links: string[]): Promise<RequestResult<T>> {
    const requests: Promise<RequestResponse<T>>[] = []
    const result: RequestResult<T> = {}

    links.forEach((link) => {
      const request = this.makeRequest<T>(link)
      requests.push(request)
    })

    await Promise.all(requests).then((response) => {
      response.forEach((req) => (result[req.link] = req.data))
    })

    return result
  }

  async makeRequest<T>(link: string): Promise<RequestResponse<T>> {
    const { data } = await axios.get<T>(link)
    return { link, data }
  }
}

export default new RequestService()
