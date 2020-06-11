import { App } from "./app";
import { ContactsRoute } from "./Routes/ContactsRoute";
import { LoginRoute } from "./Routes/LoginRoute";

const PORT = process.env.mobilebillback_port || 3000;
const HOST = process.env.mobilebillback_host || "localhost";

let apiRoutes = [
    new LoginRoute(),
    new ContactsRoute()
]
new App(apiRoutes).listen(PORT , HOST)