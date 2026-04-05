import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const figmaAssetMap: Record<string, string> = {
  // Intervue logo (Header.tsx)
  'b2c9e0cc6e570a4eef3f72abb44e3b9aa3b91360': `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" fill="none"><text x="0" y="44" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="44" fill="white" letter-spacing="-2">int<tspan text-decoration="underline" text-decoration-thickness="4px" text-underline-offset="6px">e</tspan>rvu<tspan text-decoration="underline" text-decoration-thickness="4px" text-underline-offset="6px">e</tspan></text></svg>')}`,
  // Avatar: Zoya Khan / generic female 1
  '08a3b47613f2d0f6aced2c3c467602e3aa1638f1': 'https://randomuser.me/api/portraits/women/68.jpg',
  // Avatar: Layla Munoz
  '20b88955d6e91b0f9cbf6e8b1d6959045013c348': '/layla_avatar.svg',
  // Avatar: Aryan / generic male
  'da483b78e3e3bfd30953876637bcdaf2fe97ef89': 'https://randomuser.me/api/portraits/men/32.jpg',
  // Avatar: Sakshi
  '527282946faef1b7c4efbd61fb4be58f0f84fc73': 'https://randomuser.me/api/portraits/women/22.jpg',
  // Avatar 5
  'bd95fda4637e37c983d108f9de761c50b4cd2462': 'https://randomuser.me/api/portraits/men/46.jpg',
  // Natalie avatar
  'cdac98998c90f96526373b774ef80741763f4a50': '/natalie_avatar.svg',
  // Step images (SlideEleven)
  'f12a3bc793460ab509f0f68039d5ba4a7fc529c5': 'https://placehold.co/400x300/f4f0ff/6D42D0?text=Step+1',
  '0ea01ea223148c42f959fb52d34a91cb8edd5e8d': 'https://placehold.co/400x300/f4f0ff/6D42D0?text=Step+2',
  '29d606f0685a30e727bcc00c56ae2148779c5c0f': 'https://placehold.co/400x300/f4f0ff/6D42D0?text=Step+3',
  'dbbad1188c6e72a1205f6268a012fe4977b81c44': 'https://placehold.co/400x300/f4f0ff/6D42D0?text=Step+4',
  // Logo: Greenhouse (SlideEighteen)
  '3af4d66829b81f2e76794aba53884549e65346cc': 'https://placehold.co/200x60/ffffff/333333?text=Greenhouse',
  // Logo: Workday (SlideEighteen)
  '72737892a1e83fd684f4f3903bcd51d252fa0117': 'https://placehold.co/200x60/ffffff/333333?text=Workday',
  // Additional avatars from imports
  '1af2086220affecd5f498aeca93f64918a91bf86': 'https://randomuser.me/api/portraits/women/33.jpg',
  '193c563de04664e6d46e7f1b0ea1a16fb615272e': 'https://placehold.co/400x300/f4f0ff/6D42D0?text=Rectangle',
  'f411169b0890cb85aaf2ca68bc27e793bfc47b0c': 'https://placehold.co/400x300/f4f0ff/6D42D0?text=Kanban',
  'a27a74ce3b0582a4e7378688a16ef3b69d078c80': 'https://placehold.co/100x100/ffffff/6D42D0?text=Logo',
}

const figmaAssetPlugin = () => {
  return {
    name: 'figma-asset-plugin',
    enforce: 'pre' as const,
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        return '\\0' + id;
      }
    },
    load(id: string) {
      if (id.startsWith('\\0figma:asset/')) {
        const hash = id.replace('\\0figma:asset/', '').replace('.png', '');
        const url = figmaAssetMap[hash] || 'https://placehold.co/150x150/eeeeee/999999?text=?';
        return `export default ${JSON.stringify(url)};`;
      }
    }
  }
}

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    figmaAssetPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
