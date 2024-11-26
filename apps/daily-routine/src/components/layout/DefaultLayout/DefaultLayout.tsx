import DefaultHeader from "@/components/header/DefaultHeader/DefaultHeader"
import { parseDomSizeValue } from "@/utils/string.utils"
import { ReactNode } from "react"
import "./DefaultLayout.scoped.scss"

type DefaultLayoutProps = {
  children: ReactNode
  sidebarChildren: ReactNode
  maxWidth?: string | number
}
export default function DefaultLayout({
  children,
  sidebarChildren,
  maxWidth = 1000,
}: DefaultLayoutProps) {
  const defaultLayoutInnerStyle = {
    maxWidth: parseDomSizeValue(maxWidth),
  }
  return (
    <div className="default-layout-container">
      <DefaultHeader />
      <div className="default-layout">
        <div className="default-layout-inner" style={defaultLayoutInnerStyle}>
          <div className="sidebar-layout">{sidebarChildren}</div>
          <div className="main-layout">{children}</div>
        </div>
      </div>
    </div>
  )
}
