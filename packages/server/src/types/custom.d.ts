import { User } from "../validation/users.validation"

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}