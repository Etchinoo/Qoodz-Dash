// export const searchBy = (
//   data: any[],
//   searchQry: string,
//   searchTerms: string[]
// ) =>
//   data.filter(
//     (item) => {
//       //   console.log(item);
//       console.log(
//         searchTerms.map((term) => {
//           //   console.log(term);
//           return term;
//         })
//       );
//     }

//     //   searchTerms.map((term) => {
//     //     console.log(term)
//     //   })
//     //   item.name.toLowerCase().includes(searchQry.toLowerCase()) ||
//     //   item.email.toLowerCase().includes(searchQry.toLowerCase())
//   );

export const searchBy = (
  data,
  searchQry,
  searchTerms
) => {
  const filteredData = data.filter((item) =>
    searchTerms.some((key) =>
      item[key].toLowerCase().includes(searchQry.toLowerCase())
    )
  );
  return filteredData;
}
