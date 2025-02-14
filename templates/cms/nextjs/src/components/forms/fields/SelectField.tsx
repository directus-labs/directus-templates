import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';

interface SelectFieldProps {
	name: string;
	options: { value: string; text: string }[];
	placeholder?: string | null;
	form: UseFormReturn;
}

const SelectField = ({ name, options, placeholder, form }: SelectFieldProps) => {
	return (
		<Select onValueChange={(value) => form.setValue(name, value)} value={form.getValues(name)}>
			<SelectTrigger>
				<SelectValue placeholder={placeholder || 'Select an option'} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.text}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default SelectField;
