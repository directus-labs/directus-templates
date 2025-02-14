import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/blocks/Button';
import { Form } from '@/components/ui/form';
import Field from './FormField';
import { buildZodSchema } from '@/lib/zodSchemaBuilder';
import type { FormField as FormFieldType } from '@/types/directus-schema';

interface DynamicFormProps {
	fields: FormFieldType[];
	onSubmit: (data: Record<string, any>) => void;
	submitLabel: string;
}

const DynamicForm = ({ fields, onSubmit, submitLabel }: DynamicFormProps) => {
	const sortedFields = [...fields].sort((a, b) => (a.sort || 0) - (b.sort || 0));
	const formSchema = buildZodSchema(fields);

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: fields.reduce<Record<string, any>>((defaults, field) => {
			if (!field.name) return defaults;
			switch (field.type) {
				case 'checkbox':
					defaults[field.name] = false;
					break;
				case 'checkbox_group':
					defaults[field.name] = [];
					break;
				case 'radio':
					defaults[field.name] = '';
					break;
				default:
					defaults[field.name] = '';
					break;
			}

			return defaults;
		}, {}),
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-4">
				{sortedFields.map((field) => (
					<Field key={field.id} field={field} form={form} />
				))}
				<div className="w-full">
					<Button
						type="submit"
						label={submitLabel}
						icon="arrow"
						iconPosition="right"
						id={`submit-${submitLabel.replace(/\s+/g, '-').toLowerCase()}`}
					/>
				</div>
			</form>
		</Form>
	);
};

export default DynamicForm;
