import { useCallback, useMemo, useState } from 'react'

interface UseHoverBind {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

type UseHoverResult = [boolean, UseHoverBind]

export const useHover = (): UseHoverResult => {
  const [onHover, setOnHover] = useState(false)

  const onMouseEnter = useCallback(() => {
    setOnHover(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setOnHover(false)
  }, [])

  return useMemo(
    () => [onHover, { onMouseEnter, onMouseLeave }],
    [onHover, onMouseEnter, onMouseLeave]
  )
}