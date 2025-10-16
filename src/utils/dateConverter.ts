/**
 * Date Converter Utilities
 * Provides consistent date handling across the application
 */

/**
 * Date format types for different use cases
 */
export type DateFormat =
  | "iso" // ISO string (2024-10-15T10:30:00.000Z)
  | "date-only" // Date only (2024-10-15)
  | "indonesian" // Indonesian format (15 Oktober 2024)
  | "short" // Short format (15/10/2024)
  | "api"; // API format (usually ISO)

/**
 * Configuration for date conversion
 */
export interface DateConverterConfig {
  timezone?: string;
  locale?: string;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: DateConverterConfig = {
  timezone: "Asia/Jakarta",
  locale: "id-ID",
};

/**
 * Main date converter class
 */
export class DateConverter {
  private config: DateConverterConfig;

  constructor(config: DateConverterConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Convert input to Date object
   */
  private toDate(input: string | Date | number): Date {
    if (input instanceof Date) {
      return input;
    }

    if (typeof input === "number") {
      return new Date(input);
    }

    if (typeof input === "string") {
      // Handle various string formats
      if (input.includes("T") || input.includes("Z")) {
        return new Date(input);
      }

      if (input.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return new Date(input + "T00:00:00");
      }

      if (input.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        const parts = input.split("/");

        if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
          const [day, month, year] = parts;

          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }
      }

      return new Date(input);
    }

    throw new Error("Invalid date input");
  }

  /**
   * Convert to ISO string format (for API)
   */
  toISO(input: string | Date | number): string {
    const date = this.toDate(input);

    return date.toISOString();
  }

  /**
   * Convert to date-only format (YYYY-MM-DD)
   */
  toDateOnly(input: string | Date | number): string {
    const date = this.toDate(input);
    const isoString = date.toISOString().split("T")[0];

    if (!isoString) {
      throw new Error("Failed to convert date to date-only format");
    }

    return isoString;
  }

  /**
   * Convert to Indonesian format
   */
  toIndonesian(input: string | Date | number): string {
    const date = this.toDate(input);

    return date.toLocaleDateString(this.config.locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: this.config.timezone,
    });
  }

  /**
   * Convert to short format (DD/MM/YYYY)
   */
  toShort(input: string | Date | number): string {
    const date = this.toDate(input);

    return date.toLocaleDateString(this.config.locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: this.config.timezone,
    });
  }

  /**
   * Generic convert method using format type
   */
  convert(input: string | Date | number, format: DateFormat): string {
    switch (format) {
      case "iso":
      case "api":
        return this.toISO(input);
      case "date-only":
        return this.toDateOnly(input);
      case "indonesian":
        return this.toIndonesian(input);
      case "short":
        return this.toShort(input);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  /**
   * Check if a date string is valid
   */
  isValid(input: string | Date | number): boolean {
    try {
      const date = this.toDate(input);

      return !isNaN(date.getTime());
    } catch {
      return false;
    }
  }

  /**
   * Get current date in specified format
   */
  now(format: DateFormat = "iso"): string {
    return this.convert(new Date(), format);
  }
}
