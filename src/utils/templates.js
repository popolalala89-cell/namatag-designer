const templates = [
  {
    id: 'indomaret-standar',
    name: 'Indomaret Standar',
    width: 400,
    height: 250,
    desc: 'Template putih bersih khas Indomaret',
    defaultTexts: [
      { key: 'nama', label: 'Nama', value: 'NAMA KARYAWAN', x: 200, y: 100, fontSize: 26, fontWeight: 'bold', fill: '#1a365d', fontFamily: 'Arial', textAlign: 'center' },
      { key: 'jabatan', label: 'Jabatan', value: 'KASIR', x: 200, y: 140, fontSize: 16, fontWeight: 'normal', fill: '#2d3748', fontFamily: 'Arial', textAlign: 'center' },
      { key: 'kode_toko', label: 'Kode Toko', value: 'IDM-XXXX', x: 200, y: 170, fontSize: 12, fontWeight: 'normal', fill: '#718096', fontFamily: 'Arial', textAlign: 'center' },
    ],
    defaultBg: '#ffffff',
    defaultBorder: '#1a365d',
  },
  {
    id: 'indomaret-premium',
    name: 'Indomaret Premium',
    width: 400,
    height: 250,
    desc: 'Biru elegan dengan teks putih',
    defaultTexts: [
      { key: 'nama', label: 'Nama', value: 'NAMA KARYAWAN', x: 200, y: 95, fontSize: 28, fontWeight: 'bold', fill: '#ffffff', fontFamily: 'Arial', textAlign: 'center' },
      { key: 'jabatan', label: 'Jabatan', value: 'KASIR', x: 200, y: 140, fontSize: 16, fontWeight: 'normal', fill: '#e2e8f0', fontFamily: 'Arial', textAlign: 'center' },
      { key: 'kode_toko', label: 'Kode Toko', value: 'IDM-XXXX', x: 200, y: 170, fontSize: 12, fontWeight: 'normal', fill: '#a0aec0', fontFamily: 'Arial', textAlign: 'center' },
    ],
    defaultBg: '#1a365d',
    defaultBorder: '#2d5280',
  },
  {
    id: 'kotak-modern',
    name: 'Modern Kotak',
    width: 350,
    height: 200,
    desc: 'Minimalis dengan border tipis',
    defaultTexts: [
      { key: 'nama', label: 'Nama', value: 'NAMA', x: 175, y: 85, fontSize: 24, fontWeight: 'bold', fill: '#2d3748', fontFamily: 'Arial', textAlign: 'center' },
      { key: 'jabatan', label: 'Jabatan', value: 'JABATAN', x: 175, y: 125, fontSize: 14, fontWeight: 'normal', fill: '#4a5568', fontFamily: 'Arial', textAlign: 'center' },
    ],
    defaultBg: '#f7fafc',
    defaultBorder: '#2d3748',
  },
  {
    id: 'elegan-hitam',
    name: 'Elegan Hitam Emas',
    width: 400,
    height: 250,
    desc: 'Mewah dengan kombinasi hitam & emas',
    defaultTexts: [
      { key: 'nama', label: 'Nama', value: 'NAMA', x: 200, y: 100, fontSize: 28, fontWeight: 'bold', fill: '#d4af37', fontFamily: 'Arial', textAlign: 'center' },
      { key: 'jabatan', label: 'Jabatan', value: 'JABATAN', x: 200, y: 140, fontSize: 16, fontWeight: 'normal', fill: '#e2e8f0', fontFamily: 'Arial', textAlign: 'center' },
    ],
    defaultBg: '#0f0f0f',
    defaultBorder: '#d4af37',
  },
  {
    id: 'putih-biru',
    name: 'Putih Biru Corporate',
    width: 400,
    height: 250,
    desc: 'Clean corporate look',
    defaultTexts: [
      { key: 'nama', label: 'Nama', value: 'NAMA', x: 200, y: 100, fontSize: 26, fontWeight: 'bold', fill: '#1e40af', fontFamily: 'Arial', textAlign: 'center' },
      { key: 'jabatan', label: 'Jabatan', value: 'JABATAN', x: 200, y: 140, fontSize: 15, fontWeight: 'normal', fill: '#475569', fontFamily: 'Arial', textAlign: 'center' },
    ],
    defaultBg: '#ffffff',
    defaultBorder: '#1e40af',
  },
]

export default templates
