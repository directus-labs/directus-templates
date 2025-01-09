import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';

interface RadioGroupFieldProps {
	name: string;
	options: { value: string; text: string }[];
	form: UseFormReturn;
}

const RadioGroupField = ({ name, options, form }: RadioGroupFieldProps) => (
	<RadioGroup value={form.watch(name)} onValueChange={(value) => form.setValue(name, value)} className="">
		{options.map((option) => (
			<div key={option.value} className="flex items-center gap-x-2">
				<RadioGroupItem id={`${name}-${option.value}`} value={option.value} />
				<label htmlFor={`${name}-${option.value}`} className="text-sm">
					{option.text}
				</label>
			</div>
		))}
	</RadioGroup>
);

export default RadioGroupField;
