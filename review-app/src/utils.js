export const commentExists = (arr, id) => {
    return arr.some(item => {
        return item.id === id
    });
}

