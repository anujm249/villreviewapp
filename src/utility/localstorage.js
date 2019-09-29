import lscache from 'lscache';

export const setToLocalStorage = (key, data) => {
  if (data) {
    lscache.flushExpired();
    lscache.set(key, btoa(JSON.stringify(data)), 43200); // 30days->43200;
  }
};

export const setToLocalStoragePromise = (key, data) => new Promise((resolve, reject) => {
  debugger
  try {
    setToLocalStorage(key, data);
    resolve(true);
  } catch (e) {
    reject(e);
  }
});


export const getFromLocalStorage = (key) => {
  let data = null;
  if (key) {
    const criteriaStr = lscache.get(key);
    if (criteriaStr) {
      data = JSON.parse(atob(criteriaStr));
    }
  }
  return data;
};

export const getFromLocalStoragePromise = key => new Promise((resolve, reject) => {
  try {
    resolve(getFromLocalStorage(key));
  } catch (e) {
    reject(e);
  }
});

export const deleteKeyFromLocalStorage = (key) => {
  if (key) {
    lscache.remove(key);
  }
};

export const deleteKeyFromLocalStoragePromise = key => new Promise((resolve, reject) => {
  try {
    deleteKeyFromLocalStorage(key);
    resolve(true);
  } catch (e) {
    reject(e);
  }
});
