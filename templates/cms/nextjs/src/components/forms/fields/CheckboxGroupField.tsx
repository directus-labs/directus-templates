import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';

interface CheckboxGroupFieldProps {
	name: string;
	options: { value: string; text: string }[];
	form: UseFormReturn<any>;
}

const CheckboxGroupField = ({ name, options, form }: CheckboxGroupFieldProps) => {
	const currentValues = form.watch(name) || [];

	const toggleValue = (value: string, checked?: boolean) => {
		const updatedValues = checked ? [...currentValues, value] : currentValues.filter((v: string) => v !== value);
		form.setValue(name, updatedValues);
	};

	return (
		<div>
			{options.map((option) => (
				<div key={option.value} className="flex items-center gap-x-2">
					<Checkbox
						id={`${name}-${option.value}`}
						checked={currentValues.includes(option.value)}
						onCheckedChange={(checked) => toggleValue(option.value, !!checked)}
					/>
					<label htmlFor={`${name}-${option.value}`} className="text-sm">
						{option.text}
					</label>
				</div>
			))}
		</div>
	);
};

export default CheckboxGroupField;
