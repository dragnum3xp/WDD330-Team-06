import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// get product id from URL
function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();