import { useEffect, useState } from 'react'

// Tiny helper: runs an async loader on mount and tracks loading/error/data.
// `deps` lets a page reload when something (like a route param) changes.
export function useAsync(loader, deps = []) {
  const [state, setState] = useState({ loading: true, error: null, data: null })

  useEffect(() => {
    let alive = true
    setState({ loading: true, error: null, data: null })
    loader()
      .then((data) => alive && setState({ loading: false, error: null, data }))
      .catch((error) => alive && setState({ loading: false, error, data: null }))
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
