import { generateObject, jsonObjectPrompt, ollama, zodSchema } from 'modelfusion';
import { z } from 'zod';

import { UserSuggestedCourseGeneratorDomainService } from '../domain/UserSuggestedCourseGeneratorDomainService';

export class OllamaMistralUserSuggestedCourseGeneratorDomainService
	implements UserSuggestedCourseGeneratorDomainService
{
	async run(finishedCourses: string[]): Promise<string[]> {
		const courseNamesResponse = await generateObject({
			model: ollama
				.ChatTextGenerator({
					model: 'mistral:7b',
					temperature: 0
				})
				.asObjectGenerationModel(jsonObjectPrompt.instruction()),
			schema: zodSchema(
				z.object({
					items: z.array(z.string({ description: 'Nombre del curso sugerido' }))
				})
			),
			prompt: {
				system: `
					Eres un generador de cursos. IMPORTANTE: (sólo genera el nombre). 
						- Te proporcionaré un listado de nombres de cursos realizados separados por una ','.
						- Has de generar nombres aleatorios de cursos, relacionados con la terminología de los mismos. IMPORTANTE: Solo 3.
						- Evidentemente evita un nombre muy similar al de cualquiera de los cursos proporcionados.
						- No repitas ninguna salida.`,
				instruction: finishedCourses.join(', ')
			}
		});

		return courseNamesResponse.items;
	}
}
