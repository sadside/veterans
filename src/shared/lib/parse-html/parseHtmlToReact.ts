import parse from 'html-react-parser'

export const parseHtmlToReact = (html: string) => {
    return parse(html)
}
