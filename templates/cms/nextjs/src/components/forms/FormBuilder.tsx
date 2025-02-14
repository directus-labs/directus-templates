'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import DynamicForm from './DynamicForm';
import { submitForm } from '@/lib/directus/forms';
import { FormField } from '@/types/directus-schema';
import { cn } from '@/lib/utils';
interface FormBuilderProps {
	className?: string;
	form: {
		id: string;
		on_success?: 'redirect' | 'message' | null;
		sort?: number | null;
		submit_label?: string;
		success_message?: string | null;
		title?: string | null;
		success_redirect_url?: string | null;
		is_active?: boolean | null;
		fields: FormField[];
	};
}

const FormBuilder = ({ form, className }: FormBuilderProps) => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	if (!form.is_active) return null;

	const handleSubmit = async (data: Record<string, any>) => {
		setError(null);
		try {
			const fieldsWithNames = form.fields.map((field) => ({
				id: field.id,
				name: field.name || '',
				type: field.type || '',
			}));

			await submitForm(form.id, fieldsWithNames, data);

			if (form.on_success === 'redirect' && form.success_redirect_url) {
				window.location.href = form.success_redirect_url;
			} else {
				setIsSubmitted(true);
			}
		} catch (err) {
			console.error('Error submitting form:', err);
			setError('Failed to submit the form. Please try again later.');
		}
	};

	if (isSubmitted) {
		return (
			<div className="flex flex-col items-center justify-center space-y-4 p-6 text-center">
				<CheckCircle className="size-12 text-green-500" />
				<p className="text-gray-600">{form.success_message || 'Your form has been submitted successfully.'}</p>
			</div>
		);
	}

	return (
		<div className={cn('space-y-6 border border-input p-8 rounded-lg', className)}>
			{error && (
				<div className="p-4 text-red-500 bg-red-100 rounded-md">
					<strong>Error:</strong> {error}
				</div>
			)}
			<DynamicForm fields={form.fields} onSubmit={handleSubmit} submitLabel={form.submit_label || 'Submit'} />
		</div>
	);
};

export default FormBuilder;
