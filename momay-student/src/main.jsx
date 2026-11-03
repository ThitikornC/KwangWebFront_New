import React from 'react'
import ReactDOM from 'react-dom/client'
import BuuStudent8bitV2 from './pages/BuuStudent8bitV2.jsx'
import { installMockGateway } from './mockGateway.js'
import AutoPowerPanel from './components/AutoPowerPanel.jsx'
import './index.css'

// ต้องติดตั้งก่อน render — หน้าเรียก /api/config ตั้งแต่ effect แรก
installMockGateway()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BuuStudent8bitV2 />
    <AutoPowerPanel />
  </React.StrictMode>,
)
