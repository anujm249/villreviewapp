export const checkIfObject = value => (value.constructor === {}.constructor);

export const promiseWrapper = (funcDef, argumentsObj, context) => new Promise((resolve, reject) => {
  if (typeof funcDef === 'function') {
    const argumentsObjPromise = checkIfObject(argumentsObj) ? { ...argumentsObj, promise: { resolve, reject } } : { promise: { resolve, reject } };
    funcDef.call(context, argumentsObjPromise);
  }
});
