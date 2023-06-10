// 👇️ sort by Numeric property ASCENDING (1 - 100)
export const numAscending = (data, key) => data.sort((a, b) => a.id - b.id);
// ------------------------------------------------

// 👇️ sort by Numeric property DESCENDING (100 - 1)
export const numDescending = (data, key) => data.sort((a, b) => b.id - a.id);

// ------------------------------------------------

// 👇️ sort by String property ASCENDING (A - Z)
export const strAscending = (data, key) =>
  data.sort((a, b) => (a.name > b.name ? 1 : -1));

// ------------------------------------------------

// 👇️ sort by String property DESCENDING (Z - A)
export const strDescending = (data, key) =>
  data.sort((a, b) => (a.name > b.name ? -1 : 1));

export const dateAscending = (data, key) =>
  data.sort(
    (a, b) =>
      new Date(a.date).setHours(0, 0, 0, 0) -
      new Date(b.date).setHours(0, 0, 0, 0)
  );

export const dateDescending = (data, key) =>
  data.sort(
    (a, b) =>
      new Date(b.date).setHours(0, 0, 0, 0) -
      new Date(a.date).setHours(0, 0, 0, 0)
  );
