import { useDirectus } from './directus';

interface SubmissionValue {
	field: string;
	value?: string;
	file?: string;
}

export const submitForm = async (
	formId: string,
	fields: { id: string; name: string; type: string }[],
	data: Record<string, any>,
) => {
	const { directus, uploadFiles, createItem, withToken } = useDirectus();
	const TOKEN = process.env.DIRECTUS_FORM_TOKEN;

	if (!TOKEN) {
		throw new Error('DIRECTUS_FORM_TOKEN is not defined. Check your .env file.');
	}

	try {
		const submissionValues: SubmissionValue[] = [];

		for (const field of fields) {
			const value = data[field.name];

			if (value === undefined || value === null) continue;

			if (field.type === 'file' && value instanceof File) {
				const formData = new FormData();
				formData.append('file', value);

				const uploadedFile = await directus.request(withToken(TOKEN, uploadFiles(formData)));

				if (uploadedFile && 'id' in uploadedFile) {
					submissionValues.push({
						field: field.id,
						file: uploadedFile.id,
					});
				}
			} else {
				submissionValues.push({
					field: field.id,
					value: value.toString(),
				});
			}
		}

		const payload = {
			form: formId,
			values: submissionValues,
		};

		await directus.request(withToken(TOKEN, createItem('form_submissions', payload)));
	} catch (error) {
		console.error('Error submitting form:', error);
		throw new Error('Failed to submit form');
	}
};
