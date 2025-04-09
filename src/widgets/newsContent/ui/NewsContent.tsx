import { parseHtmlToReact } from '@/shared/lib/parse-html'

type Props = {
    html: string
}

export const NewsContent = ({ html }: Props) => {
    return (
        <article className="prose max-w-none">{parseHtmlToReact(html)}</article>
    )
}
