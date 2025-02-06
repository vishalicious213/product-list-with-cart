exports.handler = async () => {
    const port = process.env.PORT || 3000
    const environment = process.env.ENVIRONMENT || "sandbox"
    const client_id = process.env.CLIENT_ID
    const client_secret = process.env.CLIENT_SECRET
    const endpoint_url = environment === "sandbox" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com"

    return {
        statusCode: 200,
        body: JSON.stringify({
            port: `${port}`,
            environment: `${environment}`,
            client_id: `${client_id}`,
            client_secret: `${client_secret}`
        })
    }
}