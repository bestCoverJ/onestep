import { get, post} from '@/api/axios.js'

export const getSearchSuggestion = (params) => {
  return get('/baidu/sugrec', params)
}

export const getStatement = (params) => {
  return get('https://v1.hitokoto.cn', params)
}