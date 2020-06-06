import { App } from "./app";
import { ShowsRoute } from "./Routes/ShowsRoute";

const PORT = process.env.mobilebillback_port || 3000;
const HOST = process.env.mobilebillback_host || "localhost";

let apiRoutes = [
    new ShowsRoute()
]
new App(apiRoutes).listen(PORT , HOST)