export const handleError = (errorData) => {
    return {
        status: "error",
        data: errorData
    }
}

export const handleSuccess = (successData) => {
    return {
        stats: "success",
        data: successData
    }
}