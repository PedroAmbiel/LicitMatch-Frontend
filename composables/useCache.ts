/**
 * Composable for caching API responses
 * Reduces redundant API calls and improves performance
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class ApiCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Get cached data or fetch new data
   * @param key Cache key
   * @param fetcher Function to fetch data if not cached or expired
   * @param ttl Time to live in milliseconds (default: 5 minutes)
   * @returns Cached or fresh data
   */
  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = this.DEFAULT_TTL
  ): Promise<T> {
    const cached = this.cache.get(key);
    const now = Date.now();

    // Return cached data if valid
    if (cached && cached.expiresAt > now) {
      return cached.data;
    }

    // Fetch new data
    const data = await fetcher();
    
    // Store in cache
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + ttl,
    });

    return data;
  }

  /**
   * Invalidate a specific cache entry
   * @param key Cache key
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Invalidate all cache entries matching a pattern
   * @param pattern Regular expression pattern to match keys
   */
  invalidatePattern(pattern: RegExp): void {
    for (const key of this.cache.keys()) {
      if (pattern.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Remove expired entries from cache
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt <= now) {
        this.cache.delete(key);
      }
    }
  }
}

// Singleton instance
const cacheInstance = new ApiCache();

// Auto cleanup expired entries every 10 minutes
if (process.client) {
  setInterval(() => {
    cacheInstance.cleanup();
  }, 10 * 60 * 1000);
}

/**
 * Composable to use API cache
 * @returns Cache utilities
 */
export function useCache() {
  return {
    get: cacheInstance.get.bind(cacheInstance),
    invalidate: cacheInstance.invalidate.bind(cacheInstance),
    invalidatePattern: cacheInstance.invalidatePattern.bind(cacheInstance),
    clear: cacheInstance.clear.bind(cacheInstance),
  };
}
