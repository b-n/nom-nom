import debounce from 'debounce'
import { useState, useEffect } from 'react'

const getDimensions = (): [number, number] => {
  return typeof window === 'undefined'
    ? [1024, 768]
    : [document.body.scrollWidth, document.body.clientHeight]
}

const useWindowDimensions = (): [number, number] => {
  const [dimensions, setDimensions] = useState(getDimensions())

  useEffect(() => {
    window.addEventListener('resize', debounce(() => {
      setDimensions(getDimensions())
    }, 500))
    window.addEventListener('orientationchange', debounce(() => {
      setDimensions(getDimensions())
    }, 500))
  }, [])

  return dimensions
}

export { useWindowDimensions }
