import QRCode from 'qrcode';
import { WeddingInvitation, ThemeConfig } from '../types';

/**
 * Generates the live public base URL for an invitation
 */
export const getInvitationBaseUrl = (slug: string): string => {
  const origin = window.location.origin;
  // If slug has no leading slash, add it
  const cleanSlug = slug.replace(/^\/+/, '');
  return `${origin}/${cleanSlug}`;
};

/**
 * Generates the full URL for a specific guest
 */
export const getGuestInvitationUrl = (slug: string, guestName?: string): string => {
  const baseUrl = getInvitationBaseUrl(slug);
  if (!guestName || guestName.trim() === '') {
    return baseUrl;
  }
  return `${baseUrl}?to=${encodeURIComponent(guestName.trim())}`;
};

/**
 * Generate QR code data URL (PNG)
 */
export const generateQRCodeDataUrl = async (text: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(text, {
      width: 400,
      margin: 2,
      color: {
        dark: '#1E293B',
        light: '#FFFFFF'
      }
    });
  } catch (err) {
    console.error('Failed to generate QR Code', err);
    return '';
  }
};

/**
 * Format polite WhatsApp Invitation Text
 */
export const createWhatsAppInvitationMessage = (
  invitation: WeddingInvitation,
  guestName: string
): string => {
  const groomName = invitation.groom.name.split(',')[0];
  const brideName = invitation.bride.name.split(',')[0];
  const targetGuest = guestName.trim() || 'Bapak/Ibu/Saudara/i';
  const link = getGuestInvitationUrl(invitation.slug, targetGuest);

  let formattedDate = 'Hari Bahagia';
  try {
    formattedDate = new Date(invitation.weddingDate).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    // fallback
  }

  const primaryEvent = invitation.events[0];
  const venue = primaryEvent?.locationName || 'Lokasi Acara';

  return `Kepada Yth.
Bapak/Ibu/Saudara/i: *${targetGuest}*

_Assalamu’alaikum Warahmatullahi Wabarakatuh_ / Salam Sejahtera,

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i sekalian untuk menghadiri dan memberikan doa restu pada momen suci pernikahan kami:

💍 *${groomName} & ${brideName}*

🗓️ *Hari/Tgl:* ${formattedDate}
⏰ *Waktu:* ${primaryEvent?.timeStart || '08:00'} - ${primaryEvent?.timeEnd || 'Selesai'} ${primaryEvent?.timezone || 'WIB'}
📍 *Tempat:* ${venue}

Untuk rincian acara, buku tamu digital, peta lokasi, serta reservasi kehadiran, silakan buka tautan undangan resmi berikut:
👉 ${link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu secara langsung.

Mohon maaf atas keterbatasan jarak dan situasi yang mengharuskan undangan ini disampaikan secara digital.

Hormat kami yang berbahagia,
*${groomName} & ${brideName}*
Beserta Keluarga Besar`;
};
