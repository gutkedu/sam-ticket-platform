import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { makeCreateCostumerUseCase } from 'use-cases/factories/make-create-costumer';

export async function createCostumerHandler(
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
    const createCostumerBodySchema = z.object({
        email: z.string().email(),
        name: z.string(),
        phone: z.string(),
        photoPath: z.string().nullable(),
    });

    try {
        const { email, name, phone, photoPath } =
            createCostumerBodySchema.parse(JSON.parse(event.body as string));

        const createCostumerUseCase = makeCreateCostumerUseCase();

        const costumer = await createCostumerUseCase.execute({
            email,
            name,
            phone,
            photoPath,
        });

        return {
            statusCode: 201,
            body: JSON.stringify(costumer),
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const validationError = fromZodError(error);
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: validationError.toString(),
                }),
            };
        }
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: (error as Error).message,
            }),
        };
    }
}
