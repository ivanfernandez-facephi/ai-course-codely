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
						Eres un generador de cursos. IMPORTANTE: (sólo genera el nombre). 
							- Te proporcionaré un listado de nombres de cursos separados por una ', '.
							- Has de generar nombres aleatorios de cursos, relacionados con la terminología de los mismos. IMPORTANTE: Solo quiero 3 nombres de cursos.
							- Evidentemente evita un nombre muy similar al de cualquiera de los cursos proporcionados.
							- No repitas ninguna salida.`,
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
