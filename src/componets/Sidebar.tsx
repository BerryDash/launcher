import './Sidebar.css'
import Icon from '../Icon.png'
import { openUrl } from '@tauri-apps/plugin-opener'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog,
  faDownload,
  faRankingStar,
  faServer
} from '@fortawesome/free-solid-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
import { platform } from '@tauri-apps/plugin-os'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { SidebarProps } from '../types/SidebarProps'

export default function Sidebar ({
  setShowPopup,
  setPopupMode,
  setFadeOut,
  downloadProgress
}: SidebarProps) {
  const [rot, setRot] = useState(0)
  const [dir, setDir] = useState(1)

  return (
    <aside className='sidebar'>
      <div
        className='dragarea'
        style={{
          height: '30px',
          width: 'calc(var(--spacing) * 60)',
          top: 0,
          left: 0,
          marginBottom: '-15px',
          position: 'absolute',
          zIndex: 9999,
          display: platform() == 'macos' ? 'block' : 'none',
          pointerEvents: 'auto'
        }}
        onMouseDown={() => {
          getCurrentWindow().startDragging()
        }}
      ></div>
      <div className='logo'>
        <img
          draggable={false}
          src={Icon}
          width={48}
          height={48}
          style={{
            transform: `rotate(${rot}deg)`,
            transition: 'transform 0.3s ease',
            marginTop: ['windows', 'macos'].includes(platform())
              ? '20px'
              : '0px'
          }}
          onClick={() =>
            setRot(r => {
              let next = r + dir * 90
              if (next >= 360) {
                next = 360
                setDir(-1)
              } else if (next <= 0) {
                next = 0
                setDir(1)
              }
              return next
            })
          }
          onContextMenu={() =>
            setRot(r => {
              let next = r - dir * 90
              if (next >= 360) {
                next = 360
                setDir(-1)
              } else if (next <= 0) {
                next = 0
                setDir(1)
              }
              return next
            })
          }
        />
      </div>
      <nav className='nav-links'>
        <a
          draggable={false}
          href='#installs'
          className={`link ${
            (window.location.hash || '#installs') === '#installs'
              ? 'active'
              : ''
          }`}
        >
          <FontAwesomeIcon icon={faServer} className='mr-1' /> Installs
        </a>
        <a
          draggable={false}
          href='#settings'
          className={`link ${
            (window.location.hash || '#installs') === '#settings'
              ? 'active'
              : ''
          }`}
        >
          <FontAwesomeIcon icon={faCog} className='mr-1' /> Settings
        </a>
        <a
          draggable={false}
          href='#leaderboards'
          className={`link ${
            (window.location.hash || '#installs') === '#leaderboards'
              ? 'active'
              : ''
          }`}
        >
          <FontAwesomeIcon icon={faRankingStar} className='mr-1' /> Leaderboards
        </a>
        <a
          draggable={false}
          onClick={() => openUrl('https://berrydash.lncvrt.xyz/discord')}
          className='link'
        >
          <FontAwesomeIcon icon={faDiscord} className='mr-1' /> Community
        </a>
      </nav>
      <div
        className='sidebar-downloads'
        style={{ display: downloadProgress.length != 0 ? 'block' : 'none' }}
        onClick={() => {
          setPopupMode(1)
          setShowPopup(true)
          setFadeOut(false)
        }}
      >
        <p>
          <FontAwesomeIcon icon={faDownload} /> Downloads
        </p>
      </div>
    </aside>
  )
}
