import { useEffect, useRef } from 'react'

function useWhyDidYouUpdate(name: string, props: { [key: string]: any }) {
  const previousProps = useRef<{ [key: string]: any }>()
  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props })
      const changesObj: { [key: string]: any } = {}

      allKeys.forEach((key) => {
        if (previousProps.current && previousProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          }
        }
      })

      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj)
      }
    }

    previousProps.current = props
  })
}

export default useWhyDidYouUpdate
