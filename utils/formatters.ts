/**
 * Utility functions for formatting data
 * Centralized to avoid code duplication and improve performance
 */

/**
 * Format a date string to Brazilian locale format
 * @param dateString - ISO date string
 * @returns Formatted date string (dd/mm/yyyy)
 */
export function formatDateBR(dateString: string): string {
  if (!dateString) return 'Sem Informação';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  } catch {
    return 'Data Inválida';
  }
}

/**
 * Format a date string to Brazilian locale format with time
 * @param dateString - ISO date string
 * @returns Formatted date string (dd/mm/yyyy HH:mm)
 */
export function formatDateTimeBR(dateString: string): string {
  if (!dateString) return 'Não informado';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'Data Inválida';
  }
}

/**
 * Format CNPJ with mask
 * @param cnpj - CNPJ string
 * @returns Formatted CNPJ (XX.XXX.XXX/XXXX-XX)
 */
export function formatCNPJ(cnpj: string): string {
  if (!cnpj) return 'Não informado';
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

/**
 * Format CEP with mask
 * @param cep - CEP string
 * @returns Formatted CEP (XXXXX-XXX)
 */
export function formatCEP(cep: string): string {
  if (!cep) return 'Não informado';
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}

/**
 * Create a debounced function
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Memoize a function result
 * @param fn - Function to memoize
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}
