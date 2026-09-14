
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// 100 products
let products = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: (100 + i * 10),
    category: i % 2 === 0 ? "Electronics" : "Accessories",
    stock: 10 + i
}));

// HOME
app.get("/", (req, res) => {
    res.json({
        message: "Product REST API is running",
        endpoints: [
            "GET /products",
            "GET /products/:id",
            "POST /products",
            "PUT /products/:id",
            "PATCH /products/:id",
            "DELETE /products/:id"
        ]
    });
});

// GET ALL PRODUCTS
app.get("/products", (req, res) => {
    res.json(products);
});

// GET SINGLE PRODUCT
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// CREATE PRODUCT
app.post("/products", (req, res) => {
    const { name, price, category, stock } = req.body;

    if (!name || price === undefined || !category || stock === undefined) {
        return res.status(400).json({
            message: "name, price, category and stock are required"
        });
    }

    const newProduct = {
        id: products.length > 0
            ? Math.max(...products.map(p => p.id)) + 1
            : 1,
        name,
        price,
        category,
        stock
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    });
});

// UPDATE COMPLETE PRODUCT
app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price, category, stock } = req.body;

    if (!name || price === undefined || !category || stock === undefined) {
        return res.status(400).json({
            message: "name, price, category and stock are required"
        });
    }

    products[index] = {
        id,
        name,
        price,
        category,
        stock
    };

    res.json({
        message: "Product updated successfully",
        product: products[index]
    });
});

// PARTIAL UPDATE
app.patch("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    if (req.body.name !== undefined) {
        product.name = req.body.name;
    }

    if (req.body.price !== undefined) {
        product.price = req.body.price;
    }

    if (req.body.category !== undefined) {
        product.category = req.body.category;
    }

    if (req.body.stock !== undefined) {
        product.stock = req.body.stock;
    }

    res.json({
        message: "Product partially updated",
        product
    });
});

// DELETE PRODUCT
app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(index, 1);

    res.json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

 