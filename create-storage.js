function createStorages(key) {
  const store = JSON.parse(localStorage.getItem(key)) ?? [];
  const saved = () => {
    localStorage.setItem(key, JSON.stringify(store));
  };
  const storages = {
    get() {
      return store;
    },
    set(source) {
      store.push(source);
      saved();
    },
    delete(key) {
      delete store[key];
      saved();
    },
  };
  return storages;
}

export default createStorages;
