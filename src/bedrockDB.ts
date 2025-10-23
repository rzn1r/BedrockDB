// bedrockDB.ts
// A lightweight, type-safe database for Minecraft Bedrock Editimport

import { world, Vector3 } from "@minecraft/server";

/**
 * The global namespace prefix for all stored dynamic properties.
 * This prevents name collisions with other scripts or add-on
 */

const NAMESPACE = "bedrockDB:";

/**
 * A small wrapper around Minecraft's dynamic properties
 */

export class BedrockDB<T = any> {
  private dbName: string;

  /**
   * Create a new database instance.
   * @param dbName A short unique identifier for this database (e.g. "playerData")
   */
  constructor(dbName: string) {
    this.dbName = dbName;
  }

  /**
   * Construct a full namespaced property key.
   * @param key The internal key within this database.
   */
  private fullKey(key: string): string {
    return `${NAMESPACE}${this.dbName}:${key}`;
  }

  /**
   * Store a value in the database.
   * @param key Unique identifier within this database.
   * @param value Any serializable data (object, string, number, etc.)
   */
  set(key: string, value: T): void {
    // check if value is serializable
    if (value === undefined) {
      throw new Error("Cannot store undefined value in BedrockDB.");
    }
    const json = JSON.stringify(value);
    world.setDynamicProperty(this.fullKey(key), json);
  }

  /**
   * Retrieve a value from the database.
   * Returns `null` if not found or failed to parse.
   * @param key Unique identifier within this database.
   */
  get(key: string): T | null {
    const raw = world.getDynamicProperty(this.fullKey(key));

    if (raw === undefined) return null;

    try {
      return JSON.parse(raw as string) as T;
    } catch (error) {
      console.warn(`[BedrockDB] Failed to parse data for key "${key}":`, error);
      return null;
    }
  }

  /**
   * Delete a key from the database.
   * @param key Unique identifier within this database.
   */
  delete(key: string): void {
    world.setDynamicProperty(this.fullKey(key), undefined);
  }

  /**
   * Check if a key exists.
   * @param key Unique identifier within this database.
   */
  has(key: string): boolean {
    return world.getDynamicProperty(this.fullKey(key)) !== undefined;
  }

  /** 
   * Clear all keys stored under this database name.
   */
  clear(): void {
    const keysToDelete = this.keys();
    for (const key of keysToDelete) {
      this.delete(key);
    }
  }

  /**
   * Get all keys stored under this database name.
   * (Useful for iterating or debugging)
   */
  keys(): string[] {
    return world
      .getDynamicPropertyIds()
      .filter((id) => id.startsWith(`${NAMESPACE}${this.dbName}:`))
      .map((id) => id.replace(`${NAMESPACE}${this.dbName}:`, ""));
  }
}
