import {db} from "@/db";
import {notFound} from "next/navigation";
import {Snippet} from "@prisma/client";
import Link from "next/link";
import {deleteSnippet} from "@/actions";

interface SnippetParamInterface {
    params: {
        id: string;
    }
}

export default async function SnippetShowPage({params: {id}}: SnippetParamInterface) {
    const snippet: Snippet | null = await db.snippet.findFirst({
        where: {
            id: parseInt(id)
        }
    })

    if (!snippet) return notFound();

    const deleteSnippetActions = deleteSnippet.bind(null, snippet.id)

    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-4">
                    <Link href={`/snippets/${id}/edit`} className="p-2 border rounded">Edit</Link>
                    <form action={deleteSnippetActions}>
                        <button className="p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>
            <pre className="p-3 border rounded bg-gray-200 border-gray-300">
                <code>{snippet.code}</code>
            </pre>
        </div>
    );
}