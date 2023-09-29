import { CLINIC_ROUTES } from "../modules/clinic/routes/routes";
import { TESTS_ROUTES } from "../modules/tests/routes/routes";

export const ROUTES = [
    ...TESTS_ROUTES,
    ...CLINIC_ROUTES
]