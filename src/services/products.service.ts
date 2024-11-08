const SERVER_URI = "http://localhost:5000/api";

// Function to retrieve the token from local storage
const getToken = () => localStorage.getItem("token"); // Adjust based on your token storage method

export const getProductsWithCategories = async () => {
    const token = getToken();

    try {
        const response = await fetch(`${SERVER_URI}/get/products`, {
            method: "GET", // Specify the HTTP method
            headers: {
                "Content-Type": "application/json", // Specify the content type
                ...(token ? { jwt_token: token } : {}), // Conditionally add the token if it exists
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const managers = await response.json(); // Parse the JSON response
        return managers; // Return the list of managers
    } catch (error) {
        console.error("Error fetching managers:", error);
        throw error; // Propagate the error for further handling if needed
    }
};

export const getCategories = async () => {
    const token = getToken();
    try {
        const response = await fetch(`${SERVER_URI}/get/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { jwt_token: token } : {}),
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};
export const addProduct = async (formData: FormData) => {
    const token = getToken();
    try {
        const response = await fetch(`${SERVER_URI}/add/product`, {
            method: "POST",
            headers: {
                ...(token ? { jwt_token: token } : {}),
            },
            body: formData, // Sending form data directly
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const productsAdded = await response.json();
        return productsAdded;
    } catch (error) {
        console.error("Error adding products:", error);
        throw error;
    }
};

export const addCategory = async (category_name: string) => {
    const token = getToken();
    try {
        const response = await fetch(`${SERVER_URI}/add/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { jwt_token: token } : {}),
            },
            body: JSON.stringify({ category_name }),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const categoryAdded = await response.json();
        return categoryAdded.category_id;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};

export const updateProduct = async (product: any) => {
    const token = getToken();
    try {
        // Assuming product.product_id exists
        const response = await fetch(
            `${SERVER_URI}/update/product/${product.product_id}`,
            {
                method: "PUT", // Use PUT for updating the product
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { jwt_token: token } : {}), // Include token if available
                },
                body: JSON.stringify({
                    product_name: product.product_name,
                    product_price: product.product_price,
                    category_id: product.category_id,
                    product_image: product.product_image,
                }), // Send the updated product data
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const updatedProduct = await response.json(); // Parse the response
        return updatedProduct; // Return the updated product data
    } catch (error) {
        console.error("Error updating product:", error);
        throw error; // Propagate the error for further handling if needed
    }
};
