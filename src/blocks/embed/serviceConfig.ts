/**
 * @description Service configuration object
 */
export interface ServiceConfig {
  /** Iframe which contains embedded content */
  html: string;
}

/**
 * @description Type for services configuration
 */
export type ServicesConfigType = { [key: string]: ServiceConfig };
