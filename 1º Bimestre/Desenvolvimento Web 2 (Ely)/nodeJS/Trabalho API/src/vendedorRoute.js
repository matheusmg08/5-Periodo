const vendedorController = require("./vendedorController");

module.exports = (app) => {
    app.post("/vendedor", vendedorController.post);
    app.put("/vendedor/:id", vendedorController.put);
    app.delete("/vendedor/:id", vendedorController.delete);
    app.get("/vendedor", vendedorController.get);
    app.get("/vendedor/:id", vendedorController.getById);
}
