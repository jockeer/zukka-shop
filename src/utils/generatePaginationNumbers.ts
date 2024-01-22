
export const generatePagination = ( currentPage: number, totalPages: number ) => {
    //Si el numbero total de paginas es 7 o menos vamos a mostrar todas las paginas sin puntos suspensivos
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

    // Si la pagina actual esta entre las primeras 3 paginas 
    // Mostrar las primeras 3, puntos suspensivos, y las ultimas 2

    if (currentPage <= 3) return [1,2,3, '...', totalPages - 1, totalPages];
    
    //Si la pagina actual esta entre las ultimas 3 paginas
    // mostra las primeras 2, puntos suspensivos, las ultimas 3 paginas.
    
    if (currentPage >= totalPages - 2) return [1,2,'...', totalPages - 2, totalPages - 1, totalPages]; 

    //si la pagina actual esta en otro lugar medio
    // mostrar la primera pagina, puntos suspensivos, pagina actual y mas puntos
    return [1,'...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}