export const camelCaseKeys = (object: any): Object => {
  for (let key in object) {
    const value = object[key];
    delete object[key];
    const words = key.split("_");
    words.forEach((_, index) => {
      if (index > 0) words[index] = words[index].charAt(0).toUpperCase() + words[index].slice(1)
    });

    object[words.join("")] = value;
  }

  return object;
}

export const capitalize = (value: string): string => {
  return value.replace(/^\w/, (c) => c.toUpperCase())
}