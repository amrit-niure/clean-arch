// A generic interface for a response
export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
  key?: string; // Optional key (e.g., for caching, identifiers, etc.)
}
