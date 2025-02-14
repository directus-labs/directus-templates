import { FormField as ShadcnFormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import CheckboxField from './fields/CheckboxField';
import CheckboxGroupField from './fields/CheckboxGroupField';
import RadioGroupField from './fields/RadioGroupField';
import SelectField from './fields/SelectField';
import FileUploadField from './fields/FileUploadField';
import type { FormField as FormFieldType } from '@/types/directus-schema';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface FieldProps {
	field: FormFieldType;
	form: UseFormReturn;
}

const Field = ({ field, form }: FieldProps) => {
	if (field.type === 'hidden') return null;

	const getFieldElement = () => {
		switch (field.type) {
			case 'text':
				return <Input placeholder={field.placeholder || ''} {...form.register(field.name!)} />;
			case 'textarea':
				return <Textarea placeholder={field.placeholder || ''} {...form.register(field.name!)} />;
			case 'checkbox':
				return <CheckboxField name={field.name!} label={field.label!} form={form} />;
			case 'checkbox_group':
				return <CheckboxGroupField name={field.name!} options={field.choices || []} form={form} />;
			case 'radio':
				return <RadioGroupField name={field.name!} options={field.choices || []} form={form} />;
			case 'select':
				return (
					<SelectField name={field.name!} placeholder={field.placeholder} options={field.choices || []} form={form} />
				);
			case 'file':
				return <FileUploadField name={field.name!} form={form} />;
			default:
				return null;
		}
	};

	const fieldElement = getFieldElement();
	if (!fieldElement) return null;

	const widthClass = field.width
		? {
				100: 'flex-[100%]',
				50: 'flex-[calc(50%-1rem)]',
				67: 'flex-[calc(67%-1rem)]',
				33: 'flex-[calc(33%-1rem)]',
			}[field.width] || 'flex-[100%]'
		: 'flex-[100%]';

	return (
		<div className={`flex-shrink-0 ${widthClass}`}>
			<ShadcnFormField
				control={form.control}
				name={field.name!}
				render={({ field: formField }) => (
					<FormItem>
						<FormLabel
							htmlFor={field.name!}
							className={cn(
								'text-sm font-medium flex items-center justify-between',
								field.type === 'checkbox' || field.type === 'radio' ? 'space-x-2' : '',
							)}
						>
							<div className="flex items-center space-x-1">
								{field.type !== 'checkbox' && <span>{field.label}</span>}

								{field.help && (
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Info className="size-4 text-gray-500 cursor-pointer" />
											</TooltipTrigger>
											<TooltipContent>{field.help}</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								)}
							</div>
							{field.required && <span className="text-sm text-gray-400">*Required</span>}
						</FormLabel>
						<FormControl>{fieldElement}</FormControl>
						<FormMessage className="text-red-500 italic text-sm" />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default Field;
