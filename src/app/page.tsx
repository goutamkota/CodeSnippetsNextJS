import {db} from "@/db";
import {Snippet} from "@prisma/client";
import Link from "next/link";

export default async function Home() {
    const snippets: Snippet[] = await db.snippet.findMany();
    const renderedSnippets = snippets.map(
        (snippet) => {
            return (
                <Link
                    href={`snippets/${snippet.id}`}
                    key={snippet.id}
                    className="flex justify-between items-center p-2 border rounded">
                    <div>{snippet.title}</div>
                    <div>View</div>
                </Link>
            )
        }
    )
    return (
        <>
            <div className="flex justify-between items-center mb-2 mt-5">
                <h1 className="text-xl font-bold">Snippets</h1>
                <Link href="/snippets/new" className="border p-2 rounded"> New </Link>
            </div>
            <div className="flex flex-col gap-2">
                {renderedSnippets}
            </div>
        </>
    );
}
