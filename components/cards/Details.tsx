import { Typography } from "@mui/material";

export function Details({
	title,
	description,
	className,
}: {
	className?: string;
	title: string;
	description: string;
}) {
	return (
		<div
			className={`flex flex-wrap items-center text-gray-600 rounded-md px-2 w-fit ${className}`}>
			<Typography variant='body2'>{title}</Typography>
			<p className='mx-2'>:</p>
			<Typography variant='body2'>{description}</Typography>
		</div>
	);
}
