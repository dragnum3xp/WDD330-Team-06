import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

loadHeaderFooter();

// Initialize and display alerts
const alert = new Alert();
alert.init();
