'use client';

import {Snippet} from "@prisma/client";
import {Editor} from "@monaco-editor/react";
import {useState} from "react";
import {editSnippet} from "@/actions";

interface SnippetEditFormProps {
    snippet: Snippet

}
export default function SnippetForm({snippet}: SnippetEditFormProps) {
    const [code, setCode] = useState<string>(snippet.code)
    const handleEditorChange = (value: string = "") => setCode(value)

    const editSnippetActions = editSnippet.bind(null, snippet.id, code)

    return (
        <>
            <Editor
                height="40vh"
                theme="vs-dark"
                language="javascript"
                defaultValue={code}
                options={{minimap: {enabled: false}}}
                onChange={handleEditorChange}
            />
            <form action={editSnippetActions}>
                <button className="p-2 border rounded" type="submit">Save</button>
            </form>
        </>
    )
}