import { Counter, CounterLocalStorage } from '@/types/Counter.types'
import { useEffect, useState } from 'react'

export function useLocal() {
  const [loading, setLoading] = useState<boolean>(true)
  const [counters, setCounters] = useState<Counter[]>([])

  useEffect(() => {
    setCounters(all())
    setLoading(false)
  }, [])

  function save(counter: Counter) {
    localStorage.setItem(counter.id, JSON.stringify({
      ...counter,
      type: 'counter'
    }))
  }

  function all(): Counter[] {
    const keys = Object.keys(localStorage)
    const counters: Counter[] = []

    for (const key of keys) {
      try {
        const raw = localStorage.getItem(key)
        if (!raw) {
          continue
        }
        const counter = JSON.parse(raw) as CounterLocalStorage
        if (counter.type === 'counter') {
          counters.push({
            id: counter.id,
            count: counter.count,
            title: counter.title,
            description: counter.description,
            modified: counter.modified
          })
        }
      } catch (error) {
        // continue
      }
    }

    return counters.sort((a, b) => a.modified.localeCompare(b.modified))
  }

  return {
    save,
    loading,
    counters
  }
}