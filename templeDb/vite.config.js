import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
const manifestForPlugIn = {
  registerType:'prompt',
  includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest:{
    name:"React-vite-app",
    short_name:"react-vite-app",
    description:"I am a simple vite app",
    icons:[{
      src: 'https://cdn-icons-png.flaticon.com/512/6026/6026379.png',
      sizes:'192x192',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src:'https://cdn-icons-png.flaticon.com/512/6026/6026379.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/512/6026/6026379.png',
      sizes:'180x180',
      type:'image/png',
      purpose:'apple touch icon',
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/512/6026/6026379.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'any maskable',
    }
  ],
  theme_color:'#171717',
  background_color:'#f0e7db',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  }
}
export default defineConfig({
  plugins: [react(),VitePWA(manifestForPlugIn)],
})
