import { PricingPlan } from '../types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'standard',
    name: 'Paket Standar',
    price: 75000,
    originalPrice: 125000,
    badge: 'PILIHAN HEMAT',
    description: 'Pilihan elegan untuk seluruh template Standar dengan fitur undangan lengkap.',
    durationText: 'Aktif 1 Tahun',
    features: [
      'Akses Seluruh Template Standar (Rp 75k)',
      'Tampilan Immersive Tanpa Header & Footer',
      'Integrasi Google Maps & Navigasi Lokasi',
      'Hitung Mundur & Tambah ke Google Kalender',
      'Amplop Digital & Nomor Rekening Bank',
      'Buku Tamu & RSVP Interaktif Realtime',
      'Audio Musik Latar Suasana Tradisional & Modern',
      'Sinkronisasi Backup Momen ke Google Drive'
    ]
  },
  {
    id: 'premium',
    name: 'Paket Premium Budaya & Hari-H',
    price: 150000,
    originalPrice: 250000,
    badge: 'PREMIUM ⭐',
    isPopular: true,
    description: 'Akses penuh template Premium dengan animasi ukiran budaya otentik & Live Feed Hari-H.',
    durationText: 'Aktif Selamanya',
    features: [
      'Akses Seluruh Template Premium ⭐ (Rp 150k)',
      'Animasi Eksklusif Ukiran Budaya (Gunungan, Suntiang, Padma, Gorga, dll.)',
      'Google Drive Cloud Vault Penyimpanan Momen Tanpa Batas',
      'Live Feed Album Bersama Hari-H (Tamu upload foto langsung)',
      'Link Publik Kustom Bebas Tambahan (/nama-pasangan)',
      'WhatsApp Bulk Guest Generator (1-Klik Kirim Ratusan Tamu)',
      'Amplop Digital + QRIS Scan Instant',
      'Love Story Timeline & Galeri HD Sinematik',
      'Prioritas Server Cepat & Dukungan Prioritas VIP'
    ]
  }
];

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
