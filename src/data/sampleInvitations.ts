import { WeddingInvitation } from '../types';

export const SAMPLE_INVITATIONS: WeddingInvitation[] = [
  {
    id: 'inv-jawa-01',
    slug: 'raden-dan-sekar',
    isPublished: true,
    publishedAt: '2026-08-15T10:00:00Z',
    pricingTier: 'platinum',
    paymentStatus: 'paid',
    invoiceCode: 'INV-2026-8829',
    guestRecipients: [
      { id: 'g-1', name: 'Bapak H. Sukardi & Keluarga', group: 'Keluarga Besar', customSlugParam: 'Bapak+H.+Sukardi+%26+Keluarga', isSent: true },
      { id: 'g-2', name: 'Ibu Dr. Maya Anggraini, Sp.A', group: 'Rekan Kerja', customSlugParam: 'Ibu+Dr.+Maya+Anggraini%2C+Sp.A', isSent: true },
      { id: 'g-3', name: 'Dimas Aditya, S.T. & Partner', group: 'Sahabat Kuliah', customSlugParam: 'Dimas+Aditya%2C+S.T.+%26+Partner', isSent: false },
      { id: 'g-4', name: 'Keluarga Besar Bpk. R. Soeprapto', group: 'Tamu VIP', customSlugParam: 'Keluarga+Besar+Bpk.+R.+Soeprapto', isSent: false }
    ],
    analytics: {
      views: 342,
      rsvpsCount: 48,
      wishesCount: 36,
      lastVisited: '10 menit yang lalu'
    },
    themeId: 'adat-jawa',
    heroTagline: 'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan',
    weddingDate: '2026-10-24T09:00:00',
    groom: {
      name: 'Raden Bagus Arya Pratama, S.T.',
      fullName: 'Raden Bagus Arya Pratama',
      childNumber: 'Putra Pertama dari',
      father: 'Bpk. K.R.T. Bambang Harimurti',
      mother: 'Ibu Hj. Siti Nurjanah',
      instagram: 'aryapratama.id',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'Lahir dan dibesarkan di Surakarta, mengagumi luhurnya seni budaya Jawa dan mencintai kesederhanaan hidup.'
    },
    bride: {
      name: 'Sekar Ayu Prameswari, S.Ked.',
      fullName: 'Sekar Ayu Prameswari',
      childNumber: 'Putri Bungsu dari',
      father: 'Bpk. H. Sri Sultan Haryono',
      mother: 'Ibu Hj. Retno Wulandari',
      instagram: 'sekarayu.p',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Pencinta keindahan tembang macapat dan seni tari klasik, mengabdi dalam dunia kesehatan masyarakat.'
    },
    quoteAyat: {
      verse: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
      source: 'QS. Ar-Rum Ayat 21',
      translation: 'Maha Benar Allah dengan segala firman-Nya.'
    },
    events: [
      {
        id: 'evt-1',
        title: 'Akad Nikah & Panggih Adat Jawa Solo',
        type: 'akad',
        date: '2026-10-24',
        timeStart: '08:00',
        timeEnd: '10:30',
        timezone: 'WIB',
        locationName: 'Ndalem Ngabean Heritage Solo',
        address: 'Jl. Alun-Alun Selatan No. 8, Pasar Kliwon, Kota Surakarta, Jawa Tengah 57118',
        mapsUrl: 'https://maps.google.com/?q=Ndalem+Ngabean+Solo',
        mapsEmbedQuery: 'Ndalem Ngabean Solo',
        dresscode: {
          title: 'Adat / Formal Beskap & Kebaya',
          colors: ['#D97706', '#78350F', '#FEF3C7', '#1F2937'],
          note: 'Tamu dimohon mengenakan busana bernuansa Batik Klasik atau Warna Earth Tone.'
        }
      },
      {
        id: 'evt-2',
        title: 'Resepsi Pernikahan (Pahargyan Ageng)',
        type: 'resepsi',
        date: '2026-10-24',
        timeStart: '11:30',
        timeEnd: '14:30',
        timezone: 'WIB',
        locationName: 'Ballroom Hotel Royal Surakarta Heritage',
        address: 'Jl. Slamet Riyadi No. 6, Kauman, Ps. Kliwon, Kota Surakarta, Jawa Tengah 57111',
        mapsUrl: 'https://maps.google.com/?q=The+Royal+Surakarta+Heritage',
        mapsEmbedQuery: 'The Royal Surakarta Heritage',
        streamingUrl: 'https://youtube.com/live/radensekar-wedding',
        dresscode: {
          title: 'Batik Nasional / Formal Suit',
          colors: ['#78350F', '#B45309', '#FDE68A', '#000000'],
          note: 'Diharapkan hadir 15 menit sebelum acara dimulai.'
        }
      }
    ],
    stories: [
      {
        id: 'st-1',
        year: '2021',
        title: 'Pertemuan Pertama di Pelataran Keraton',
        description: 'Pertemuan yang tak disengaja di pelataran Keraton Kasunanan Surakarta saat pagelaran tari bedhaya.',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'st-2',
        year: '2024',
        title: 'Ikrar Komitmen & Lamaran Adat Nontoni',
        description: 'Dengan restu kedua keluarga besar, Raden mengutarakan niat suci melamar Sekar dalam upacara lamaran penuh kehangatan.',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'st-3',
        year: '2026',
        title: 'Menuju Pelaminan Suci',
        description: 'Menyatukan dua hati, dua keluarga, dan dua takdir dalam naungan berkah pernikahan yang suci selamanya.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
      }
    ],
    gallery: [
      {
        id: 'gal-1',
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
        caption: 'Momen Prewedding dengan Kebaya Bludru Solo Putri',
        type: 'image',
        ratio: 'portrait'
      },
      {
        id: 'gal-2',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
        caption: 'Kehangatan senyum di Ndalem Heritage',
        type: 'image',
        ratio: 'landscape'
      },
      {
        id: 'gal-3',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
        caption: 'Genggaman tangan menuju masa depan',
        type: 'image',
        ratio: 'square'
      },
      {
        id: 'gal-4',
        url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80',
        caption: 'Romantisme siluet sore hari di Candi Plaosan',
        type: 'image',
        ratio: 'portrait'
      },
      {
        id: 'gal-5',
        url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80',
        caption: 'Kisah kasih dalam bingkai tradisi Nusantara',
        type: 'image',
        ratio: 'landscape'
      }
    ],
    bankAccounts: [
      {
        id: 'acc-1',
        bankName: 'BCA (Bank Central Asia)',
        accountNumber: '8820492811',
        accountHolder: 'Raden Bagus Arya Pratama',
        logo: 'BCA'
      },
      {
        id: 'acc-2',
        bankName: 'Bank Mandiri',
        accountNumber: '1370019284920',
        accountHolder: 'Sekar Ayu Prameswari',
        logo: 'Mandiri'
      },
      {
        id: 'acc-3',
        bankName: 'QRIS Donasi Pernikahan',
        accountNumber: 'NMID: ID1029384729102',
        accountHolder: 'Raden & Sekar Wedding',
        qrisUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=RadenSekarWeddingGift'
      }
    ],
    physicalGiftAddress: {
      recipient: 'Kediaman Mempelai (Raden & Sekar)',
      phone: '0812-3456-7890',
      address: 'Jl. Melati No. 24, Kauman, Pasar Kliwon, Kota Surakarta, Jawa Tengah 57112'
    },
    audioTrack: {
      title: 'Ladrang Wilujeng Solo (Gamelan Ambient)',
      artist: 'Karawitan Keraton Surakarta',
      soundType: 'synth-gamelan'
    },
    isLiveFeedActive: true, // Activated for live demo
    standingBannerConfig: {
      title: 'Selamat Datang di Resepsi Pernikahan',
      subtitle: 'Silakan scan QR Code di bawah untuk konfirmasi kehadiran & unggah foto ke Live Feed Hari-H',
      showPhoto: true,
      showOrnaments: true,
      customNotice: 'Mohon tunjukkan layar konfirmasi check-in kepada penerima tamu untuk penukaran suvenir.',
      hallName: 'Ndalem Ngabean Heritage Solo',
      bannerFormat: 'rollup_60x160'
    },
    attendanceConfig: {
      isEnabled: true,
      checkInCode: 'WED-RADEN-SEKAR-2026',
      welcomeTitle: 'Kehadiran Anda Telah Terverifikasi!',
      welcomeMessage: 'Terima kasih telah hadir dan memberikan doa restu secara langsung pada hari bahagia kami.',
      tableGuideNote: 'Silakan menuju Meja Penerima Tamu / Meja VIP untuk menikmati jamuan dan mengambil suvenir.',
      enableSouvenirRedemption: true
    },
    dockConfig: {
      showAddPhotoLeft: true,
      showQrisRight: true,
      showCheckInCenter: true
    },
    liveFeedPhotos: [
      {
        id: 'lf-1',
        uploaderName: 'Dimas & Rina (Sahabat Kuliah)',
        photoUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
        caption: 'Selamat Mas Arya & Mbak Sekar! Samawa selalu ya, manglingi banget mantennya! ❤️✨',
        timestamp: '10 menit yang lalu',
        likes: 24,
        tableNumber: 'Meja VIP 3',
        filterUsed: 'warm'
      },
      {
        id: 'lf-2',
        uploaderName: 'Om Joko & Tante Sri',
        photoUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
        caption: 'Foto bareng keluarga besar Solo. Acaranya agung dan khidmat sekali.',
        timestamp: '25 menit yang lalu',
        likes: 18,
        tableNumber: 'Meja Keluarga Besar',
        filterUsed: 'normal'
      },
      {
        id: 'lf-3',
        uploaderName: 'Sarah Amanda',
        photoUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
        caption: 'Dekorasi Ndalem heritage-nya cantik polll! Happy Wedding Raden & Sekar! 🌸🥂',
        timestamp: '40 menit yang lalu',
        likes: 31,
        tableNumber: 'Meja 7',
        filterUsed: 'golden'
      }
    ],
    rsvps: [
      {
        id: 'rsvp-1',
        name: 'Bpk. Ir. H. Bambang Sudarsono & Keluarga',
        attendance: 'hadir',
        guestCount: 2,
        relation: 'Keluarga Besar',
        message: 'Nderek mangayubagyo awit palakraminipun Mas Arya kalian Mbak Sekar. Mugi tansah pinaringan berkah, ayem tentrem, lan langgeng dumugi kaken-kaken ninen-ninen.',
        timestamp: '2 jam yang lalu',
        likes: 12
      },
      {
        id: 'rsvp-2',
        name: 'Anisa & Farhan',
        attendance: 'hadir',
        guestCount: 2,
        relation: 'Sahabat Sekar',
        message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khair! Can\'t wait to see you on your special day Sekar sayang! 💕',
        timestamp: '5 jam yang lalu',
        likes: 9
      },
      {
        id: 'rsvp-3',
        name: 'Dr. Hendra Gunawan, Sp.A',
        attendance: 'hadir',
        guestCount: 1,
        relation: 'Rekan Kerja RS',
        message: 'Selamat menempuh babak baru dokter Sekar dan Mas Arya. Semoga selalu diliputi kebahagiaan dan menjadi keluarga sakinah mawaddah warahmah.',
        timestamp: '1 hari yang lalu',
        likes: 6
      }
    ],
    protocolNotes: [
      'Tamu undangan dimohon memindai QR Code di meja penerima tamu untuk pencatatan kehadiran.',
      'Disediakan spot Live Photo Booth dan tamu dapat langsung mengunggah foto ke Live Feed Undangan.',
      'Mohon mendoakan kedua mempelai dengan tulus ikhlas.'
    ]
  },
  {
    id: 'inv-sunda-02',
    slug: 'bagas-dan-tiara',
    isPublished: true,
    publishedAt: '2026-08-10T14:00:00Z',
    pricingTier: 'gold',
    paymentStatus: 'paid',
    invoiceCode: 'INV-2026-7731',
    guestRecipients: [
      { id: 'g-s1', name: 'Kang Dadan & Teh Nia', group: 'Keluarga Bandung', customSlugParam: 'Kang+Dadan+%26+Teh+Nia', isSent: true },
      { id: 'g-s2', name: 'Bapak Ir. Agus & Rekan PT Telkom', group: 'Rekan Kerja', customSlugParam: 'Bapak+Ir.+Agus+%26+Rekan', isSent: true }
    ],
    analytics: {
      views: 189,
      rsvpsCount: 29,
      wishesCount: 22,
      lastVisited: '1 jam yang lalu'
    },
    themeId: 'adat-sunda',
    heroTagline: 'Mugia Ginulur Rahayu Sepuh & Diberkahan ku Gusti Nu Maha Suci',
    weddingDate: '2026-11-15T08:30:00',
    groom: {
      name: 'Bagas Pratama Sanjaya, M.B.A.',
      fullName: 'Bagas Pratama Sanjaya',
      childNumber: 'Putra Sulung dari',
      father: 'Bpk. H. Dadang Sanjaya',
      mother: 'Ibu Hj. Eni Rohaeni',
      instagram: 'bagaspratama',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      bio: 'Pencinta alam tanah Pasundan dan pengusaha muda yang berjiwa santun.'
    },
    bride: {
      name: 'Tiara Anindita Putri, S.I.Kom.',
      fullName: 'Tiara Anindita Putri',
      childNumber: 'Putri Kedua dari',
      father: 'Bpk. Ir. H. Asep Suryana',
      mother: 'Ibu Hj. Nining Yuningsih',
      instagram: 'tiaraanindita.p',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
      bio: 'Gadis Priangan berhati lembut yang aktif dalam dunia komunikasi kreatif.'
    },
    quoteAyat: {
      verse: 'Silih asih, silih asah, silih asuh dina ngarawat cinta dugi ka surga.',
      source: 'Kearifan Tanah Parahyangan',
      translation: 'Saling menyayangi, saling membimbing, dan saling mengasihi.'
    },
    events: [
      {
        id: 'evt-sunda-1',
        title: 'Akad Nikah & Sawer Panganten Adat Sunda',
        type: 'akad',
        date: '2026-11-15',
        timeStart: '08:00',
        timeEnd: '10:30',
        timezone: 'WIB',
        locationName: 'Gedong Putih Villa & Hall Bandung',
        address: 'Jl. Villa Triniti KM 4.7 No. 88, Lembang, Kabupaten Bandung Barat, Jawa Barat',
        mapsUrl: 'https://maps.google.com/?q=Gedong+Putih+Lembang',
        mapsEmbedQuery: 'Gedong Putih Lembang',
        dresscode: {
          title: 'Pastel Mint / Soft Sage Adat Sunda',
          colors: ['#059669', '#064E3B', '#ECFDF5', '#FFFFFF'],
          note: 'Suasana outdoor asri bernuansa hijau sage lembut.'
        }
      },
      {
        id: 'evt-sunda-2',
        title: 'Resepsi Kebun & Jamuan Kasih',
        type: 'resepsi',
        date: '2026-11-15',
        timeStart: '11:30',
        timeEnd: '15:00',
        timezone: 'WIB',
        locationName: 'Pine Forest Lawn Gedong Putih',
        address: 'Jl. Villa Triniti KM 4.7 No. 88, Lembang, Jawa Barat',
        mapsUrl: 'https://maps.google.com/?q=Gedong+Putih+Lembang',
        mapsEmbedQuery: 'Gedong Putih Lembang',
        streamingUrl: 'https://youtube.com/live/bagastiara-wedding'
      }
    ],
    stories: [
      {
        id: 'st-s1',
        year: '2022',
        title: 'Kopi Pertama di Dago Atas Bandung',
        description: 'Pertemuan hangat di tengah sejuknya udara Dago Pakar Bandung.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'st-s2',
        year: '2025',
        title: 'Lamaran di Kebun Teh Rancabali',
        description: 'Melamar sang pujaan hati di antara hamparan hijau kebun teh Ciwidey.',
        image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=600&q=80'
      }
    ],
    gallery: [
      {
        id: 'gal-s1',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
        caption: 'Tiara & Bagas dalam balutan Siger Sunda Priangan',
        type: 'image',
        ratio: 'portrait'
      },
      {
        id: 'gal-s2',
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
        caption: 'Suasana asri taman pinus Lembang',
        type: 'image',
        ratio: 'landscape'
      }
    ],
    bankAccounts: [
      {
        id: 'acc-s1',
        bankName: 'BCA (Bank Central Asia)',
        accountNumber: '7729104822',
        accountHolder: 'Bagas Pratama Sanjaya',
        logo: 'BCA'
      },
      {
        id: 'acc-s2',
        bankName: 'Bank BJB',
        accountNumber: '0089123849102',
        accountHolder: 'Tiara Anindita Putri',
        logo: 'BJB'
      }
    ],
    audioTrack: {
      title: 'Kecapi Suling Ayun Ambing - Sunda Romantis',
      artist: 'Parahyangan Ensemble',
      soundType: 'synth-saluang'
    },
    isLiveFeedActive: true,
    standingBannerConfig: {
      title: 'Selamat Datang di Resepsi Pernikahan',
      subtitle: 'Silakan scan QR Code di bawah untuk konfirmasi kehadiran & unggah foto ke Live Feed Hari-H',
      showPhoto: true,
      showOrnaments: true,
      customNotice: 'Mohon tunjukkan layar konfirmasi check-in kepada penerima tamu untuk penukaran suvenir.',
      hallName: 'Grand Ballroom Ndalem Ngabean Heritage Solo',
      bannerFormat: 'rollup_60x160'
    },
    attendanceConfig: {
      isEnabled: true,
      checkInCode: 'WED-RADEN-SEKAR-2026',
      welcomeTitle: 'Kehadiran Anda Telah Terverifikasi!',
      welcomeMessage: 'Terima kasih telah hadir dan memberikan doa restu secara langsung pada hari bahagia kami.',
      tableGuideNote: 'Silakan menuju Meja Penerima Tamu / Meja VIP untuk menikmati jamuan dan mengambil suvenir.',
      enableSouvenirRedemption: true
    },
    dockConfig: {
      showAddPhotoLeft: true,
      showQrisRight: true,
      showCheckInCenter: true
    },
    liveFeedPhotos: [
      {
        id: 'lf-s1',
        uploaderName: 'Geng Alumni Unpad',
        photoUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
        caption: 'Wilujeng Bagas & Tiara! Langgeng dugi ka pakena kaken ninen! 💐🎉',
        timestamp: '15 menit yang lalu',
        likes: 15,
        tableNumber: 'Meja Kawan Lama'
      }
    ],
    rsvps: [
      {
        id: 'rsvp-s1',
        name: 'Kang Emil & Teh Atalia',
        attendance: 'hadir',
        guestCount: 2,
        relation: 'Kerabat',
        message: 'Wilujeng ngambah sagara rumah tangga kanggo Bagas & Tiara. Mugia sakinah mawaddah warahmah.',
        timestamp: '3 jam yang lalu',
        likes: 28
      }
    ],
    protocolNotes: ['Dimohon mengenakan alas kaki yang nyaman untuk area rumput / taman.']
  },
  {
    id: 'inv-modern-03',
    slug: 'daniel-dan-claudia',
    isPublished: true,
    publishedAt: '2026-08-01T09:00:00Z',
    pricingTier: 'basic',
    paymentStatus: 'paid',
    invoiceCode: 'INV-2026-6612',
    guestRecipients: [
      { id: 'g-m1', name: 'Jonathan & Amanda', group: 'Design Team', customSlugParam: 'Jonathan+%26+Amanda', isSent: true }
    ],
    analytics: {
      views: 94,
      rsvpsCount: 14,
      wishesCount: 11,
      lastVisited: 'Kemarin'
    },
    themeId: 'modern-minimalist',
    heroTagline: 'Together is our favorite place to be',
    weddingDate: '2026-12-05T16:00:00',
    groom: {
      name: 'Daniel Christian Wijaya, B.Sc.',
      fullName: 'Daniel Christian Wijaya',
      childNumber: 'First Son of',
      father: 'Mr. Hendarto Wijaya',
      mother: 'Mrs. Linda Tanuwidjaja',
      instagram: 'dan.wijaya',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      bio: 'Software engineer and coffee enthusiast based in Jakarta.'
    },
    bride: {
      name: 'Claudia Jessica Sutedja, B.Des.',
      fullName: 'Claudia Jessica Sutedja',
      childNumber: 'Second Daughter of',
      father: 'Mr. Rudy Sutedja',
      mother: 'Mrs. Christine Halim',
      instagram: 'claudia.jess',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      bio: 'Product designer who finds joy in minimalist aesthetics and photography.'
    },
    quoteAyat: {
      verse: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It always protects, always trusts, always hopes, always perseveres.',
      source: '1 Corinthians 13:4-7',
      translation: 'Cinta kasih itu sabar dan murah hati.'
    },
    events: [
      {
        id: 'evt-mod-1',
        title: 'Holy Matrimony / Pemberkatan Kudus',
        type: 'pemberkatan',
        date: '2026-12-05',
        timeStart: '15:30',
        timeEnd: '17:30',
        timezone: 'WIB',
        locationName: 'Gereja Katedral St. Maria Diangkat ke Surga Jakarta',
        address: 'Jl. Katedral No. 7B, Pasar Baru, Sawah Besar, Jakarta Pusat 10710',
        mapsUrl: 'https://maps.google.com/?q=Katedral+Jakarta',
        mapsEmbedQuery: 'Katedral Jakarta'
      },
      {
        id: 'evt-mod-2',
        title: 'Wedding Dinner & Celebration',
        type: 'resepsi',
        date: '2026-12-05',
        timeStart: '18:30',
        timeEnd: '21:30',
        timezone: 'WIB',
        locationName: 'The Glass House - Plataran Dharmawangsa',
        address: 'Jl. Dharmawangsa Raya No. 6, Kebayoran Baru, Jakarta Selatan',
        mapsUrl: 'https://maps.google.com/?q=Plataran+Dharmawangsa',
        mapsEmbedQuery: 'Plataran Dharmawangsa'
      }
    ],
    stories: [
      {
        id: 'st-m1',
        year: '2020',
        title: 'Met at Design & Tech Workshop',
        description: 'Where our conversations about life and dreams first began.',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80'
      }
    ],
    gallery: [
      {
        id: 'gal-m1',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
        caption: 'Minimalist Tokyo Prewedding',
        type: 'image',
        ratio: 'landscape'
      }
    ],
    bankAccounts: [
      {
        id: 'acc-m1',
        bankName: 'BCA (Bank Central Asia)',
        accountNumber: '5271829103',
        accountHolder: 'Daniel Christian Wijaya',
        logo: 'BCA'
      }
    ],
    audioTrack: {
      title: 'Teman Hidup',
      artist: 'Tulus',
      sourceType: 'spotify',
      spotifyUrl: 'https://open.spotify.com/track/59iQz3E8m03Jv8aZ8dG3rD',
      soundType: 'synth-piano'
    },
    isLiveFeedActive: true,
    liveFeedPhotos: [],
    rsvps: [],
    protocolNotes: ['Strict RSVP is requested due to limited seating at the venue.']
  }
];

export const getInvitationBySlug = (slug: string): WeddingInvitation => {
  return SAMPLE_INVITATIONS.find(i => i.slug === slug) || SAMPLE_INVITATIONS[0];
};

export const sampleInvitation = SAMPLE_INVITATIONS[0];
