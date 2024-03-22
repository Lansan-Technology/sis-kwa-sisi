"use client";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function JobDescription({ desc }: { desc: string }) {
	return (
		<ReactQuill
			id='jobDescription'
			value={desc || ""}
			readOnly={true}
			theme='snow'
		/>
	);
}
