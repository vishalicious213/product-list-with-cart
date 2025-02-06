exports.handler = async () => {
    const client_id = process.env.CLIENT_ID
    const client_secret = process.env.CLIENT_SECRET

    console.log(client_id)
    return {
        statusCode: 200,
        body: JSON.stringify({
            client_id: `${client_id}`,
            client_secret: `${client_secret}`
        })
    }
}