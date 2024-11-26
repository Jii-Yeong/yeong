import "./DefaultInformation.scoped.scss"

type DefaultInformationProps = {
  text: string
}

export default function DefaultInformation({ text }: DefaultInformationProps) {
  return (
    <div className="default-information">
      <p className="text">{text}</p>
    </div>
  )
}
