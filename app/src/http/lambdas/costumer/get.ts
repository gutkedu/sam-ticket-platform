import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { makeGetCostumerUseCase } from 'use-cases/factories/make-get-costumer';

export async function getCostumerHandler(
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
    const getCostumerBodySchema = z.object({
        email: z.string().email(),
    });

    const emailQuery = event.queryStringParameters?.email as string;

    try {
        const { email } = getCostumerBodySchema.parse({
            email: emailQuery,
        });

        const getCostumerUseCase = makeGetCostumerUseCase();

        const costumer = await getCostumerUseCase.execute({
            email,
        });

        return {
            statusCode: 200,
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
