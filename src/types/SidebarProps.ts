import { DownloadProgress } from './DownloadProgress'

export type SidebarProps = {
  setShowPopup: (v: boolean) => void
  setPopupMode: (v: null | number) => void
  setFadeOut: (v: boolean) => void
  downloadProgress: DownloadProgress[]
}
