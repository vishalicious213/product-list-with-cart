exports.handler = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello from backend using Netlify Functions"
        })
    }
}