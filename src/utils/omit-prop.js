function omitProp(obj, prop) {
  const newObj = Object.fromEntries(
    Object.entries(obj).filter((entry) => entry[0] !== prop)
  );
  return newObj;
}

module.exports = omitProp;
