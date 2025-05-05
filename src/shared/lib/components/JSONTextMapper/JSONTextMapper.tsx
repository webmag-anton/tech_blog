import { ReactElement } from 'react'

interface TextTransformerProps {
  text: string
}

export const JSONTextMapper = ({ text }: TextTransformerProps): ReactElement => {
  const renderWithHighlightAndBreak = (text = ''): (string | ReactElement)[] => {
    const parts = text.split(/(\*\*.*?\*\*|\n)/g)
    return parts.map((part, index) => {
      if (part.startsWith('**')) {
        return <span key={index}>{part.replace(/\*\*/g, '')}</span>
      } if (part === '\n') {
        return <br key={index} />
      }
      return part
    })
  }

  return <>{renderWithHighlightAndBreak(text)}</>
}