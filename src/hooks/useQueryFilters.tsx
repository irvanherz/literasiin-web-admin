import qs from 'qs'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type FilterConfig = {
  match: RegExp,
  default: string
  translate?: (value: string) => Record<string, string> | {} | undefined
}

export default function useQueryFilters (schema: Record<string, FilterConfig>) {
  const navigate = useNavigate()
  const location = useLocation()
  const sanitizedFilters = useMemo(() => {
    const filters = qs.parse(location.search || '', { ignoreQueryPrefix: true }) as Record<string, string>
    const sanitized: any = {}
    for (const key in schema) {
      const regex: RegExp = schema[key].match
      if (regex.test(filters[key])) {
        sanitized[key] = filters[key]
      } else {
        sanitized[key] = schema[key].default
      }
    }
    return sanitized
  }, [location.search, schema])

  const transformedFilters = useMemo(() => {
    let result: any = {}
    for (const key in schema) {
      if (!sanitizedFilters[key]) continue
      if (schema[key].translate) {
        const translator = schema[key].translate
        const translated = translator?.(sanitizedFilters[key])
        result = { ...result, ...translated }
      } else {
        result[key] = sanitizedFilters[key]
      }
    }
    return result
  }, [sanitizedFilters, schema])

  const refilter = (params: Record<string, string>) => {
    const filters = { ...sanitizedFilters, ...params }
    for (const key in schema) {
      if (filters[key] === schema[key].default) {
        delete filters[key]
      }
    }
    const q = qs.stringify(filters, { addQueryPrefix: true })
    navigate(q, { replace: true })
  }
  return [sanitizedFilters, transformedFilters, refilter]
}
