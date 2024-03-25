import { NextRequest, NextResponse } from "next/server";
import * as dateFn from "date-fns";
import { join } from "path";
import { writeFile } from "fs";

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const file = formData.get("file") as Blob;

	if (!file) {
		return NextResponse.json({
			error: "No file was recieved",
			status: 400,
		});
	}
	const buffer = Buffer.from(await file.arrayBuffer());
	const fileName = `${dateFn.format(Date.now(), "yyyy-MM-dd_HH:mm:ss")}-${
		(file as File).name
	}`;

	try {
		await writeFile(
			join(process.cwd(), "/public/resume/", fileName),
			buffer,
			err => {
				return NextResponse.json({
					error: "failed",
					message: err,
					status: 500,
				});
			}
		);
		return NextResponse.json({
			message: "success",
			url: `/public/resume/${fileName}`,
			status: 201,
		});
	} catch (error) {
		return NextResponse.json({
			error: "failed",
			message: error,
			status: 500,
		});
	}
}
