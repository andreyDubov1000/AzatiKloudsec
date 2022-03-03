# Canceling requests in unmounted components and repeated requests

To cancel requests you can use `useCancelToken` hook (in "src\services\utils.ts")

## Example:

To create service for get request:

```
    export const useGetRequest = () => {
      const [sourceRef, getCancelToken] = useCancelToken()

      const getRequest = useCallback(
      (user_id: string) => KloudApi.get(`/users/${user_id}`, {
         cancelToken: getCancelToken(),
      })
    },
    [getCancelToken]
    )
    return [sourceRef, getRequest] as const
    }
```

Implementation:

```
const [sourceRef, getRequest] = useGetRequest()
```

...

```
    useEffect(() => {
      getRequest(id)
    return () => {
      if (sourceRef.current) sourceRef.current.cancel('Request user cancel')
    }
   }, [id])
```
