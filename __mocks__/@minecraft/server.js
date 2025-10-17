const properties = new Map();

const world = {
  setDynamicProperty: (key, value) => {
    if (value === undefined) properties.delete(key);
    else properties.set(key, value);
  },
  getDynamicProperty: (key) => properties.get(key),
  getDynamicPropertyIds: () => Array.from(properties.keys()),
  __reset: () => properties.clear(),
};

module.exports = { world };
