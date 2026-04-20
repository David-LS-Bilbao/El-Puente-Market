import CartModel from "./cart.Model.js";
import CategoryModel from "./category.Model.js";
import ProductModel from "./product.Model.js";
import UserModel from "./user.Model.js";

CategoryModel.hasMany(ProductModel, { foreignKey: "id_category" });
ProductModel.belongsTo(CategoryModel, { foreignKey: "id_category" });

UserModel.belongsToMany(ProductModel, {
  through: CartModel,
  foreignKey: "user_dni",
  otherKey: "product_id",
});

ProductModel.belongsToMany(UserModel, {
  through: CartModel,
  foreignKey: "product_id",
  otherKey: "user_dni",
});

CartModel.belongsTo(UserModel, { foreignKey: "user_dni" });
CartModel.belongsTo(ProductModel, { foreignKey: "product_id" });
UserModel.hasMany(CartModel, { foreignKey: "user_dni" });
ProductModel.hasMany(CartModel, { foreignKey: "product_id" });

export { CartModel, CategoryModel, ProductModel, UserModel };
