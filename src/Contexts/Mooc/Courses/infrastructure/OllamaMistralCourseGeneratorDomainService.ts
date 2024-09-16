import { generateObject, jsonObjectPrompt, ollama, zodSchema } from 'modelfusion';
import { z } from 'zod';

import { UuidValueObject } from '../../../Shared/domain/UuidValueObject';
import { CoursePrimitives } from '../domain/Course';
import { CourseGeneratorDomainService } from '../domain/CourseGeneratorDomainService';

export class OllamaMistralCourseGeneratorDomainService extends CourseGeneratorDomainService {
	async generate(baseCourses: string[]): Promise<CoursePrimitives[]> {
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
					Eres un generador de cursos. IMPORTANTE: solo genera el nombre de los cursos.
						- Te proporcionaré un listado de nombres de cursos separados por una ', '.
						- Debes generar nombres aleatorios de cursos, relacionados con los cursos proporcionados, pero deben ser únicos y diferentes.
						- Evita nombres muy similares a los cursos proporcionados.
						- La respuesta DEBE ser solo un objeto JSON que contenga exclusivamente un array de strings. 
						- El formato exacto de la respuesta debe ser: { "items": ["Nombre del curso 1", "Nombre del curso 2", "Nombre del curso 3"] }
						- No incluyas comentarios, explicaciones, ni texto adicional fuera del JSON. Solo devuelve el objeto JSON con los nombres de los cursos.
						- Deben ser exactamente 3 cursos, sin repeticiones.

					**Solo responde con el JSON que cumpla con el esquema proporcionado a continuación. No incluyas texto adicional, comentarios, notas, ni explicaciones.**`,
				instruction: baseCourses.join(', ')
			}
		});

		return courseNamesResponse.items.map(courseName => {
			return {
				id: UuidValueObject.random().value,
				name: courseName,
				duration: '1 week'
			};
		});
	}
}
