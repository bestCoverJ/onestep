import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getStatement } from '@/api/api.js'

export const useStatementStore = defineStore('statement', () => {
  const statement = ref('')

  const setStatement = () => {
    const statementCache = JSON.parse(localStorage.getItem('statement'))
    if (!statementCache || new Date().getTime() > statementCache.expire) {
      getStatement().then((res) => {
        const statementObj = {
          value: res,
          expire: new Date().getTime() + 1000 * 60 * 60
        }
        localStorage.setItem('statement', JSON.stringify(statementObj))
        statement.value = res
      })
    } else {
      statement.value = statementCache.value
    }
  }

  return {
    statement,
    setStatement
  }
})