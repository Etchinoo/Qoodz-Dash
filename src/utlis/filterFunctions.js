export const filterList = (items, filters) => {
  return items.filter((item) => {
    return filters.every((filter) => {
      return item[filter.key] === filter.value;
    });
  });
};
