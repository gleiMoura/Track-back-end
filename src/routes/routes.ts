import dayjs from "dayjs";
import prisma from "../config/database";
import { FastifyInstance } from "fastify";
import { z } from "zod";


export async function appRoutes(app: FastifyInstance) {
	app.post('/habits', async (request) => {
		const habit = request.body;

		//criação de um schema para o middleware
		const createHabitBody = z.object({
			title: z.string(),
			weekDays: z.array(
				z.number().min(0).max(6)
			)
		});

		const { title, weekDays } = createHabitBody.parse(habit);

		const today = dayjs().startOf('day').toDate()

		await prisma.habit.create({
			data: {
				title,
				created_at: today,
				weekDays: { 
					create: weekDays.map(weekDay => {  //iSSO DAQUI É MUITO LOKOOOOOOO
						return {
							week_day: weekDay
						}
					})
				}
			}
		})
	})


}