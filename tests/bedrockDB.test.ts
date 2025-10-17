import { BedrockDB } from "../src/bedrockDB";
import { world } from "@minecraft/server";

describe("BedrockDB", () => {
  let db: BedrockDB<any>;

  beforeEach(() => {
    // Reset the mock "world" state before each test
    (world as any).__reset?.() ?? Object.keys(world).forEach((key) => {
      if (typeof (world as any)[key] === "function" && key.includes("DynamicProperty")) {
        // manually clear 
      }
    });
    db = new BedrockDB("testDB");
  });

  test("stores and retrieves data", () => {
    db.set("foo", { bar: 42 });
    const result = db.get("foo");
    expect(result).toEqual({ bar: 42 });
  });

  test("returns null if key missing", () => {
    expect(db.get("missing")).toBeNull();
  });

  test("has() detects existing keys", () => {
    db.set("exists", "value");
    expect(db.has("exists")).toBe(true);
    expect(db.has("nope")).toBe(false);
  });

  test("delete() removes a key", () => {
    db.set("temp", 123);
    db.delete("temp");
    expect(db.has("temp")).toBe(false);
  });

  test("keys() lists stored keys", () => {
    db.set("a", 1);
    db.set("b", 2);
    expect(db.keys().sort()).toEqual(["a", "b"]);
  });

  test("clear() removes all keys", () => {
    db.set("x", 1);
    db.set("y", 2);
    db.clear();
    expect(db.keys()).toEqual([]);
  });
});
