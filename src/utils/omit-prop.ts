function omitProp(obj: Object, prop: string): Object {
  const newObj = Object.fromEntries(Object.entries(obj).filter(entry => entry[0] !== prop));
  return newObj;
}

export default omitProp;
// module.exports = omitProp;
