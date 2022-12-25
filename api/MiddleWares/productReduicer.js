const Products = require("../Modules/Products");
module.exports = async function reduicer(req, res,payload, next) {
  try {
    let product = await Products.findById(payload);
    product.quantity = product.quantity- 1
    product.save()
  } catch (err) {
    console.log("Error at stock tracker");
    res.status(500).json({msg:"Unknown Error at When Verifying Admin"});
  }
};
