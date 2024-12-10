import BaseButton from '@/components/Button';

const TestButtons = () => {
	// Block access in production
	if (process.env.NODE_ENV === 'production') {
		return (
			<div className="p-8 text-center">
				<h2 className="text-2xl font-bold">This page is not available in production.</h2>
				<p className="text-lg text-gray-500 mt-2">
					Please use a development environment to access the button test page.
				</p>
			</div>
		);
	}

	const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
	const sizes = ['sm', 'default', 'lg', 'icon'] as const;

	return (
		<div className="p-8 space-y-12">
			{/* Variants */}
			<section>
				<h2 className="text-xl font-bold mb-4">Variants</h2>
				<div className="flex flex-wrap gap-4">
					{variants.map((variant) => (
						<BaseButton key={variant} label={`Variant: ${variant}`} variant={variant} size="default" />
					))}
				</div>
			</section>

			{/* Sizes */}
			<section>
				<h2 className="text-xl font-bold mb-4">Sizes</h2>
				<div className="flex flex-wrap gap-4">
					{sizes.map((size) => (
						<BaseButton
							key={size}
							label={size === 'icon' ? undefined : `Size: ${size}`} // Only show label for non-icon sizes
							variant="default"
							size={size}
							icon={size === 'icon' ? 'arrow' : undefined} // Only show icon for 'icon' size
						/>
					))}
				</div>
			</section>

			{/* Variants with Icons */}
			<section>
				<h2 className="text-xl font-bold mb-4">Variants with Icons</h2>
				<div className="flex flex-wrap gap-4">
					{variants.map((variant) => (
						<BaseButton
							key={`icon-${variant}`}
							label="Button with Icon"
							variant={variant}
							size="default"
							icon="arrow"
							iconPosition="right"
						/>
					))}
				</div>
			</section>
		</div>
	);
};

export default TestButtons;
