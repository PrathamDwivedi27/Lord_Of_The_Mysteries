import { Router } from "express";
import chaperRoutes from "./v1/chapter-routes.js";


const router= Router();
router.use("/v1", chaperRoutes);


export default router;