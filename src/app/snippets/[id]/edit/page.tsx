import {Snippet} from "@prisma/client";
import {db} from "@/db";
import {notFound} from "next/navigation";
import SnippetForm from "@/components/snippet-edit-form";

interface SnippetEditProps {
    params: {
        id: string
    }
}

export default async function SnippetEditPage(props: SnippetEditProps) {
    const id: number = parseInt(props.params.id)
    const snippet: Snippet | null = await db.snippet.findFirst({where: { id }})
    if(!snippet) return notFound()
    return (
       <SnippetForm snippet={snippet} />
    )
}