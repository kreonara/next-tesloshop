// [1, 2, 3, 4, ..., 7]
// [1, 2, 3, 4, ..., 48, 49, 50]
export function generatePaginationNumbers(currentPage: number, totalPages: number) {
  // si el número total de páginas es 7 o menos,
  // vamos a mostrar todas las páginas sin puntos suspensivos
  if(totalPages <= 7) {
    return Array.from({length: totalPages}, (_, i) => i + 1) // [1, 2, 3, 4, 5, 6, 7]
  }

  // si la página actual esta entre las primera 3 páginas
  // [1, 2, 3, ..., 49, 50]
  if(currentPage <= 3) {
    return [1, 2, 3, '...', totalPages-1, totalPages]
  }

  // si la página actual esta entre las ultimas 3 páginas
  // [1, 2, ..., 48, 49, 50]
  if(currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages-2, totalPages-1, totalPages]
  }

  // si la página se encuentra en un lugar medio
  // [1, ..., 22, 23, 24, ..., 50]
  return [1, '...', currentPage-1, currentPage, currentPage+1, '...', totalPages]
}