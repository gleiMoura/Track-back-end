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

		const today = dayjs().startOf('day').toDate() // faz com que as horas e os segundos não importem 

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

	app.get('/day', async (request) => {
		const createDayParam = z.object({
			date: z.coerce.date() //transforma uma string de date em Date
		})

		const { date } = createDayParam.parse(request.body);

		const weekDay = dayjs(date).get('day');

		const possibleHabits = await prisma.habit.findMany({
			where: {
				created_at: {//Para não mostrar hábitos posteriores à data do dia usamos o menor ou igual a "lte" do prisma
					lte: date //Só posso mostrar hábitos que foram criados até a data pedida, nunca as do futuro
				},
				weekDays: {
					some: {
						week_day: weekDay
					}
				} 						
			}
		})

		return(
				possibleHabits
		)
	})
}