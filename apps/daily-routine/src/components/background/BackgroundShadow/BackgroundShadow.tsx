import { ReactNode } from "react"
import "./BackgroundShadow.scoped.scss"

type BackgroundShadowProps = {
  children: ReactNode
}

export default function BackgroundShadow({ children }: BackgroundShadowProps) {
  return <div className="background-shadow">{children}</div>
}
