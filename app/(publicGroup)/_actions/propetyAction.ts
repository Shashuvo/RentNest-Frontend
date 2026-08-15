"use server"

const API = process.env.BACKEND_API_URL;

export const getAllProperties = async () => {
    const res = await fetch(`${API}/api/properties`, {
        next: {
            revalidate: 300,
            tags: ["properties"],
        }
    })

    return res.json();
}