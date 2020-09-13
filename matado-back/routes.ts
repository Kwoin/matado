import { getMeals, getMeal, addMeal, updateMeal, deleteMeal } from './meal-controller.ts'
import { Router } from "./deps.ts";
import { addIngredient, deleteIngredient, getIngredient, getIngredients, updateIngredient } from "./ingredients-controller.ts";
import { login } from "./login-controller.ts";

const router = new Router()
router.get('/meals', getMeals)
    .get('/meals/:id', getMeal)
    .post('/meals', addMeal)
    .put('/meals/:id', updateMeal)
    .delete('/meals/:id', deleteMeal)
    .get('/ingredients', getIngredients)
    .get('/ingredients/:id', getIngredient)
    .post('/ingredients', addIngredient)
    .put('/ingredients/:id', updateIngredient)
    .delete('/ingredients/:id', deleteIngredient)
    .post('/login', login)

export default router
