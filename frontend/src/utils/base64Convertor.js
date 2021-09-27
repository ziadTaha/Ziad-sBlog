export const convertToBase64 = (file) => {
    return new Promise ((resolve, reject) => {
        const fileReader =new FileReader(file)
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

