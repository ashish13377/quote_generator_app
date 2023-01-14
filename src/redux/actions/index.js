export const addBookmarks = (data) =>{
    return{
        type: "ADD_BOOKMARKS",
        payload: {
            id: new Date().getTime().toString(),
            data:data
        }
    }
}

export const deleteBookmarks = (id) =>{
    return{
        type: "DELETE_BOOKMARKS",
        id

    }
}

