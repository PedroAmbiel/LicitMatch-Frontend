/**
 * Composable for debounced search and filter operations
 * Reduces unnecessary computations and API calls
 */

import { ref, watch, type Ref } from 'vue'
import { debounce } from '~/utils/formatters'

/**
 * Create a debounced search composable
 * @param searchFn Function to execute after debounce
 * @param delay Debounce delay in milliseconds (default: 300ms)
 * @returns Debounced search utilities
 */
export function useDebouncedSearch<T>(
  searchFn: (query: string) => Promise<T> | T,
  delay: number = 300
) {
  const searchQuery = ref('')
  const isSearching = ref(false)
  const searchResults = ref<T | null>(null)

  const debouncedSearch = debounce(async (query: string) => {
    if (!query || query.trim() === '') {
      searchResults.value = null
      isSearching.value = false
      return
    }

    isSearching.value = true
    try {
      const results = await searchFn(query)
      searchResults.value = results
    } catch (error) {
      // Silently fail - error handling should be done by the calling component
      searchResults.value = null
    } finally {
      isSearching.value = false
    }
  }, delay)

  watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery)
  })

  return {
    searchQuery,
    isSearching,
    searchResults,
  }
}

/**
 * Create a debounced filter composable
 * @param filterFn Function to execute after debounce
 * @param delay Debounce delay in milliseconds (default: 150ms)
 * @returns Debounced filter utilities
 */
export function useDebouncedFilter<TInput, TOutput>(
  filterFn: (input: TInput) => TOutput,
  delay: number = 150
) {
  const filterInput = ref<TInput | null>(null)
  const isFiltering = ref(false)
  const filteredData = ref<TOutput | null>(null)

  const debouncedFilter = debounce((input: TInput) => {
    isFiltering.value = true
    try {
      const result = filterFn(input)
      filteredData.value = result
    } catch (error) {
      // Silently fail - error handling should be done by the calling component
    } finally {
      isFiltering.value = false
    }
  }, delay)

  watch(filterInput, (newInput) => {
    if (newInput !== null) {
      debouncedFilter(newInput)
    }
  }, { deep: true })

  return {
    filterInput,
    isFiltering,
    filteredData,
    applyFilter: (input: TInput) => {
      filterInput.value = input
    }
  }
}

/**
 * Create a throttled function that executes at most once per interval
 * @param func Function to throttle
 * @param interval Minimum time between executions in milliseconds
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  interval: number = 200
): (...args: Parameters<T>) => void {
  let lastCall = 0
  let timeoutId: NodeJS.Timeout | null = null

  return function(...args: Parameters<T>) {
    const now = Date.now()
    const timeSinceLastCall = now - lastCall

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    if (timeSinceLastCall >= interval) {
      lastCall = now
      func(...args)
    } else {
      timeoutId = setTimeout(() => {
        lastCall = Date.now()
        func(...args)
      }, interval - timeSinceLastCall)
    }
  }
}
