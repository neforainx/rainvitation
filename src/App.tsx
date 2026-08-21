import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  Share2,
  Tv,
  Camera,
  Heart,
  Calendar,
  Sparkles,
  Smartphone,
  Monitor,
  Menu,
  X,
  Gift,
  CheckCircle,
  HelpCircle,
  Globe,
  Sliders,
  CreditCard,
  Layers,
  Eye,
  ExternalLink,
  HardDrive,
  ArrowLeft,
  FolderHeart,
  Check
} from 'lucide-react';

import {
  WeddingInvitation,
  ThemeConfig,
  RSVPItem,
  LiveFeedPhoto,
  PricingPlan,
  GuestRecipient
} from './types';
import { WEDDING_THEMES, getThemeById } from './data/themes';
import { SAMPLE_INVITATIONS, sampleInvitation } from './data/sampleInvitations';
import { PRICING_PLANS } from './data/pricingPlans';

import { CoverOpening } from './components/CoverOpening';
import { AudioPlayerFloating } from './components/AudioPlayerFloating';
import { CountdownTimer } from './components/CountdownTimer';
import { CoupleSection } from './components/CoupleSection';
import { EventsAndMapsSection } from './components/EventsAndMapsSection';
import { GallerySection } from './components/GallerySection';
import { LoveStorySection } from './components/LoveStorySection';
import { DigitalEnvelopeModal } from './components/DigitalEnvelopeModal';
import { RSVPSection } from './components/RSVPSection';
import { LiveFeedHariH } from './components/LiveFeedHariH';
import { WeddingOrnament, DividerOrnament } from './components/Ornaments';
import { TemplateHeroRenderer, TemplateCoupleRenderer } from './components/TemplateLayoutRenderer';
import { PricingModal } from './components/PricingModal';
import { CheckoutModal } from './components/CheckoutModal';
import { PublishModal } from './components/PublishModal';
import { TemplateCatalogModal } from './components/TemplateCatalogModal';
import { GeneratorDashboard } from './components/GeneratorDashboard';
import { LandingPage } from './components/LandingPage';
import { GoogleOAuthModal } from './components/GoogleOAuthModal';
import { TemplateLibraryScreen } from './components/TemplateLibraryScreen';
import { GoogleDriveMomentsModal } from './components/GoogleDriveMomentsModal';
import { MobileActionDock } from './components/MobileActionDock';
import { AttendanceScannerModal } from './components/AttendanceScannerModal';
import { AttendanceConfirmationScreen } from './components/AttendanceConfirmationScreen';
import { QrisScanModal } from './components/QrisScanModal';
import { getInvitationBaseUrl } from './utils/urlHelper';
import {
  GoogleUser,
  getCurrentUser,
  getOAuthToken,
  subscribeToAuth,
  signOutGoogleOAuth,
  quickConnectGoogle
} from './utils/googleOAuth';

type AppScreen = 'landing' | 'library' | 'invitation_view' | 'studio_generator';

export default function App() {
  // Authentication State (Google OAuth Non-Firebase)
  const [currentUser, setCurrentUser] = useState<GoogleUser | null>(() => getCurrentUser());
  const [accessToken, setAccessToken] = useState<string | null>(() => getOAuthToken());
  const [isOAuthModalOpen, setIsOAuthModalOpen] = useState(false);

  // App Navigation Screen State with History Stack
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [screenHistory, setScreenHistory] = useState<AppScreen[]>(['landing']);
  const [justGenerated, setJustGenerated] = useState(false);

  const navigateToScreen = (nextScreen: AppScreen) => {
    setScreenHistory((prev) => [...prev, nextScreen]);
    setCurrentScreen(nextScreen);
  };

  const handleGoBack = () => {
    setScreenHistory((prev) => {
      if (prev.length > 1) {
        const nextHistory = prev.slice(0, -1);
        const prevScreen = nextHistory[nextHistory.length - 1];
        setCurrentScreen(prevScreen);
        return nextHistory;
      }
      setCurrentScreen('landing');
      return ['landing'];
    });
  };

  // Invitations State
  const [invitationsList, setInvitationsList] = useState<WeddingInvitation[]>(() => {
    try {
      const saved = localStorage.getItem('maha_invitations_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SAMPLE_INVITATIONS;
  });

  const [currentInvitation, setCurrentInvitation] = useState<WeddingInvitation>(
    () => invitationsList[0] || sampleInvitation
  );

  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(() => {
    return (
      getThemeById(invitationsList[0]?.themeId || sampleInvitation.themeId) ||
      WEDDING_THEMES[0]
    );
  });

  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState('Bapak/Ibu/Saudara/i');
  const [isGuestCheckedIn, setIsGuestCheckedIn] = useState(false);

  // Modals & Camera Check-in States (Only active on generated invitation page)
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedPlanToCheckout, setSelectedPlanToCheckout] = useState<PricingPlan>(PRICING_PLANS[0]);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isTemplateCatalogOpen, setIsTemplateCatalogOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isAttendanceScannerOpen, setIsAttendanceScannerOpen] = useState(false);
  const [isQrisScanModalOpen, setIsQrisScanModalOpen] = useState(false);
  const [isLiveFeedUploadOpen, setIsLiveFeedUploadOpen] = useState(false);
  const [showAttendanceConfirmedScreen, setShowAttendanceConfirmedScreen] = useState(false);
  const [checkInResultData, setCheckInResultData] = useState<{
    guestName: string;
    checkInTime: string;
    souvenirToken: string;
  } | null>(null);

  // Sync auth state listener
  useEffect(() => {
    const unsub = subscribeToAuth((user, token) => {
      setCurrentUser(user);
      setAccessToken(token);
    });
    return () => unsub();
  }, []);

  // Sync to local storage when invitations change
  useEffect(() => {
    try {
      localStorage.setItem('maha_invitations_v2', JSON.stringify(invitationsList));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [invitationsList]);

  // Read URL query params on load (supports /slug or ?inv=... or direct guest links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    if (toParam) {
      setGuestName(decodeURIComponent(toParam));
    }

    const modeParam = params.get('mode');
    const slugParam = params.get('inv') || params.get('slug');

    if (slugParam) {
      const matched = invitationsList.find(
        (i) => i.slug.toLowerCase() === slugParam.toLowerCase()
      );
      if (matched) {
        setCurrentInvitation(matched);
        const t = getThemeById(matched.themeId);
        if (t) setCurrentTheme(t);
      }
      // If direct slug or invitation link, open invitation view
      setCurrentScreen('invitation_view');
    } else if (modeParam === 'studio') {
      setCurrentScreen('studio_generator');
    } else if (modeParam === 'library') {
      setCurrentScreen('library');
    }

    const themeParam = params.get('theme');
    if (themeParam) {
      const matchedTheme = getThemeById(themeParam);
      if (matchedTheme) setCurrentTheme(matchedTheme);
    }
  }, [invitationsList]);

  // Authentication Handlers
  const handleLoginSuccess = (user: GoogleUser, token: string) => {
    setCurrentUser(user);
    setAccessToken(token);
    setIsOAuthModalOpen(false);
  };

  const handleSignOut = () => {
    signOutGoogleOAuth();
    setCurrentUser(null);
    setAccessToken(null);
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  const handleSelectTheme = (theme: ThemeConfig) => {
    setCurrentTheme(theme);
    handleUpdateInvitation({ themeId: theme.id });
  };

  const handleUpdateInvitation = (updatedFields: Partial<WeddingInvitation>) => {
    const updated = { ...currentInvitation, ...updatedFields };
    setCurrentInvitation(updated);
    setInvitationsList((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleCreateNewInvitation = () => {
    const newId = `inv-${Date.now()}`;
    const newSlug = `pasangan-${Date.now().toString().slice(-4)}`;
    const newInv: WeddingInvitation = {
      ...sampleInvitation,
      id: newId,
      slug: newSlug,
      groom: {
        ...sampleInvitation.groom,
        name: 'Mempelai Pria',
        fullName: 'Nama Lengkap Pria, S.T.'
      },
      bride: {
        ...sampleInvitation.bride,
        name: 'Mempelai Wanita',
        fullName: 'Nama Lengkap Wanita, S.E.'
      },
      pricingTier: 'standard',
      paymentStatus: 'paid',
      isPublished: true,
      guestRecipients: []
    };
    setInvitationsList((prev) => [newInv, ...prev]);
    setCurrentInvitation(newInv);
    const themeObj = getThemeById(newInv.themeId) || WEDDING_THEMES[0];
    setCurrentTheme(themeObj);
  };

  const handleSelectInvitation = (inv: WeddingInvitation) => {
    setCurrentInvitation(inv);
    const themeObj = getThemeById(inv.themeId) || WEDDING_THEMES[0];
    setCurrentTheme(themeObj);
  };

  const handleSelectPricingPlan = (plan: PricingPlan) => {
    setSelectedPlanToCheckout(plan);
    setIsPricingModalOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleBuyAndCustomize = (theme: ThemeConfig) => {
    handleSelectTheme(theme);
    const plan = theme.isPremium ? PRICING_PLANS[1] : PRICING_PLANS[0];
    setSelectedPlanToCheckout(plan);
    setIsCheckoutModalOpen(true);
  };

  // Preview theme fullscreen
  const handlePreviewThemeFullscreen = (theme: ThemeConfig) => {
    handleSelectTheme(theme);
    setIsOpened(false); // Reset cover opening
    setJustGenerated(false);
    navigateToScreen('invitation_view');
  };

  // Customize from Landing Page
  const handleCustomizeFromLanding = (theme: ThemeConfig) => {
    handleSelectTheme(theme);
    navigateToScreen('studio_generator');
  };

  // Switch to Guest View after generating in Studio
  const handleViewGeneratedInvitation = () => {
    setJustGenerated(true);
    setIsOpened(true); // Open directly to content
    navigateToScreen('invitation_view');
  };

  const handleSuccessPayment = (plan: PricingPlan) => {
    handleUpdateInvitation({
      pricingTier: plan.id,
      paymentStatus: 'paid',
      isPublished: true,
      invoiceCode: `INV-${Date.now().toString().slice(-6)}`
    });
    // Open studio after payment
    navigateToScreen('studio_generator');
  };

  const handleAddRSVP = (newItem: Omit<RSVPItem, 'id' | 'timestamp' | 'likes'>) => {
    const rsvp: RSVPItem = {
      ...newItem,
      id: `rsvp-${Date.now()}`,
      timestamp: 'Baru saja',
      likes: 0
    };
    handleUpdateInvitation({
      rsvps: [rsvp, ...currentInvitation.rsvps]
    });
  };

  const handleLikeRSVP = (id: string) => {
    handleUpdateInvitation({
      rsvps: currentInvitation.rsvps.map((r) =>
        r.id === id ? { ...r, likes: r.likes + 1 } : r
      )
    });
  };

  const handleUploadPhoto = (newPhoto: Omit<LiveFeedPhoto, 'id' | 'timestamp' | 'likes'>) => {
    const photo: LiveFeedPhoto = {
      ...newPhoto,
      id: `photo-${Date.now()}`,
      timestamp: 'Baru saja',
      likes: 0
    };
    handleUpdateInvitation({
      liveFeedPhotos: [photo, ...currentInvitation.liveFeedPhotos]
    });
  };

  const handleLikePhoto = (id: string) => {
    handleUpdateInvitation({
      liveFeedPhotos: currentInvitation.liveFeedPhotos.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    });
  };

  // Pure Wedding Invitation View (CRITICAL: STRICTLY NO HEADER AND NO FOOTER)
  const renderInvitationMain = () => (
    <div className={`min-h-screen relative font-sans text-slate-800 transition-colors duration-700 select-text bg-gradient-to-b ${currentTheme.bgGradient} overflow-x-hidden`}>
      {/* Cover Screen Overlay */}
      <AnimatePresence>
        {!isOpened && (
          <CoverOpening
            invitation={currentInvitation}
            theme={currentTheme}
            guestName={guestName}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* Floating Audio Controller */}
      {isOpened && (
        <AudioPlayerFloating
          theme={currentTheme}
          audioTrack={currentInvitation.audioTrack}
          autoPlayStarted={isOpened}
        />
      )}

      {/* Main Wedding Invitation Content (No Header, No Footer) */}
      <main className="space-y-6 pb-16">
        {/* Dynamic Archetype-specific Hero Section */}
        <TemplateHeroRenderer
          invitation={currentInvitation}
          theme={currentTheme}
          guestName={guestName}
        />

        {/* Dynamic Archetype-specific Couple Section */}
        <TemplateCoupleRenderer
          groom={currentInvitation.groom}
          bride={currentInvitation.bride}
          quoteAyat={currentInvitation.quoteAyat}
          theme={currentTheme}
        />

        {/* Events and Interactive Google Maps */}
        <EventsAndMapsSection
          events={currentInvitation.events}
          theme={currentTheme}
        />

        {/* Love Story Timeline */}
        <LoveStorySection
          stories={currentInvitation.stories || []}
          theme={currentTheme}
        />

        {/* Gallery Section */}
        <GallerySection
          gallery={currentInvitation.gallery}
          theme={currentTheme}
        />

        {/* Digital Envelope & Gift Transfer */}
        <DigitalEnvelopeModal
          bankAccounts={currentInvitation.bankAccounts}
          physicalGiftAddress={currentInvitation.physicalGiftAddress}
          theme={currentTheme}
        />

        {/* RSVP & Wishes Feed */}
        <RSVPSection
          rsvps={currentInvitation.rsvps}
          onAddRSVP={handleAddRSVP}
          onLikeRSVP={handleLikeRSVP}
          theme={currentTheme}
          defaultGuestName={guestName !== 'Bapak/Ibu/Saudara/i' ? guestName : ''}
        />

        {/* Live Feed Momen Bersama for Premium Themes */}
        {currentTheme.isPremium && (
          <section className="px-4 max-w-xl mx-auto">
            <LiveFeedHariH
              photos={currentInvitation.liveFeedPhotos}
              onUploadPhoto={handleUploadPhoto}
              onLikePhoto={handleLikePhoto}
              theme={currentTheme}
              weddingTitle={`${currentInvitation.groom.name.split(',')[0]} & ${currentInvitation.bride.name.split(',')[0]}`}
              isExternalUploadOpen={isLiveFeedUploadOpen}
              onCloseExternalUpload={() => setIsLiveFeedUploadOpen(false)}
              isGuestCheckedIn={isGuestCheckedIn}
              onOpenCheckInScanner={() => setIsAttendanceScannerOpen(true)}
              defaultGuestName={guestName !== 'Bapak/Ibu/Saudara/i' ? guestName : ''}
              isOwner={!!currentUser}
            />
          </section>
        )}

        {/* Closing Greeting Message */}
        <div className="pt-8 pb-24 px-4 text-center max-w-xl mx-auto">
          <WeddingOrnament
            type={currentTheme.ornamentStyle}
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 drop-shadow-xl"
            color={currentTheme.accentColor}
            isAnimated={true}
          />
          <p className="text-xs sm:text-sm text-slate-700 italic font-serif leading-relaxed mb-4">
            "Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i sekalian, kami mengucapkan terima kasih yang setulus-tulusnya."
          </p>
          <h4
            className="font-serif font-bold text-lg text-slate-900 mb-1"
            style={{ color: currentTheme.primaryColor }}
          >
            {currentInvitation.groom.name.split(',')[0]} & {currentInvitation.bride.name.split(',')[0]}
          </h4>
          <p className="text-[11px] text-slate-500">
            Beserta Keluarga Besar Kedua Mempelai
          </p>
        </div>
      </main>

      {/* MOBILE ACTION DOCK (Android/iOS Style: Left=Add Photo (after checkin), Center=Scan Check-in, Right=QRIS Scan) */}
      {isOpened && currentInvitation.dockConfig?.enabled !== false && (
        <MobileActionDock
          theme={currentTheme}
          dockConfig={currentInvitation.dockConfig}
          isCheckedIn={isGuestCheckedIn}
          onOpenAddPhoto={() => setIsLiveFeedUploadOpen(true)}
          onOpenAttendanceCheckIn={() => setIsAttendanceScannerOpen(true)}
          onOpenQrisScan={() => setIsQrisScanModalOpen(true)}
        />
      )}

      {/* CAMERA ATTENDANCE SCANNER MODAL (Only active on generated invitation) */}
      <AttendanceScannerModal
        isOpen={isAttendanceScannerOpen}
        onClose={() => setIsAttendanceScannerOpen(false)}
        expectedCode={
          currentInvitation.attendanceConfig?.checkInCode ||
          `INV-${currentInvitation.slug.toUpperCase()}-VIP`
        }
        theme={currentTheme}
        guestName={guestName !== 'Bapak/Ibu/Saudara/i' ? guestName : 'Tamu Undangan Terhormat'}
        onSuccessCheckIn={(code) => {
          setIsAttendanceScannerOpen(false);
          setIsGuestCheckedIn(true);
          const newTotal = (currentInvitation.attendanceConfig?.totalCheckedIn || 0) + 1;
          handleUpdateInvitation({
            attendanceConfig: {
              ...(currentInvitation.attendanceConfig || {
                enabled: true,
                checkInCode: code,
                welcomeTitle: 'Selamat Datang di Resepsi Kami!',
                welcomeMessage: 'Terima kasih atas kehadiran dan doa restu Anda.',
                showSouvenirCounter: true,
                allowCameraScanner: true,
                totalCheckedIn: 0
              }),
              totalCheckedIn: newTotal
            }
          });
          const nowStr = new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
          });
          const token = `SVN-${Math.floor(1000 + Math.random() * 9000)}`;
          setCheckInResultData({
            guestName: guestName !== 'Bapak/Ibu/Saudara/i' ? guestName : 'Tamu Undangan Terhormat',
            checkInTime: `${nowStr} WIB`,
            souvenirToken: token
          });
          setShowAttendanceConfirmedScreen(true);
        }}
      />

      {/* STANDALONE QRIS SCAN BOTTOM-SHEET MODAL */}
      <QrisScanModal
        isOpen={isQrisScanModalOpen}
        onClose={() => setIsQrisScanModalOpen(false)}
        theme={currentTheme}
        weddingTitle={`${currentInvitation.groom.name.split(',')[0]} & ${currentInvitation.bride.name.split(',')[0]}`}
        bankAccounts={currentInvitation.bankAccounts}
      />

      {/* DEDICATED POST-CHECK-IN CONFIRMATION SCREEN */}
      {showAttendanceConfirmedScreen && checkInResultData && (
        <AttendanceConfirmationScreen
          guestName={checkInResultData.guestName}
          checkInTime={checkInResultData.checkInTime}
          souvenirToken={checkInResultData.souvenirToken}
          invitation={currentInvitation}
          theme={currentTheme}
          onBackToInvitation={() => setShowAttendanceConfirmedScreen(false)}
          onOpenFeedUpload={() => {
            setShowAttendanceConfirmedScreen(false);
            setIsLiveFeedUploadOpen(true);
          }}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#071E14] text-white antialiased font-sans">
      {/* 1. SCREEN: LANDING PAGE (Matches image.png with Home, Template, About, Google OAuth) */}
      {currentScreen === 'landing' && (
        <LandingPage
          currentUser={currentUser}
          currentTheme={currentTheme}
          invitation={currentInvitation}
          onSelectAndPreviewTheme={handlePreviewThemeFullscreen}
          onCustomizeTheme={handleCustomizeFromLanding}
          onOpenStudio={() => navigateToScreen('studio_generator')}
          onOpenDriveModal={() => setIsDriveModalOpen(true)}
          onOpenAuthModal={() => setIsOAuthModalOpen(true)}
          onSignOut={handleSignOut}
        />
      )}

      {/* 2. SCREEN: TEMPLATE LIBRARY */}
      {currentScreen === 'library' && (
        <TemplateLibraryScreen
          currentThemeId={currentTheme.id}
          userName={currentUser?.name || 'Calon Mempelai'}
          userEmail={currentUser?.email || ''}
          userPhoto={currentUser?.picture || undefined}
          isDriveConnected={!!accessToken}
          onSelectAndPreviewTheme={handlePreviewThemeFullscreen}
          onBuyAndCustomize={handleBuyAndCustomize}
          onOpenDriveModal={() => setIsDriveModalOpen(true)}
          onOpenStudio={() => navigateToScreen('studio_generator')}
          onGoBack={handleGoBack}
          onSignOut={handleSignOut}
        />
      )}

      {/* 3. SCREEN: TEMPLATE INVITATION PREVIEW / GENERATED VIEW (PURE NO HEADER & NO FOOTER) */}
      {currentScreen === 'invitation_view' && (
        <div className="relative min-h-screen">
          {/* Floating iOS Glass Control Bar on Top */}
          <div className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
            {/* Left Controls */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                id="btn-return-home-from-preview"
                type="button"
                onClick={handleGoBack}
                className="p-2.5 sm:px-4 sm:py-2 rounded-full bg-black/80 hover:bg-black text-white backdrop-blur-xl border border-white/20 shadow-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Kembali</span>
              </button>

              <button
                id="btn-open-studio-from-preview"
                type="button"
                onClick={() => navigateToScreen('studio_generator')}
                className="p-2.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500/90 hover:bg-emerald-500 text-slate-950 backdrop-blur-xl border border-white/20 shadow-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <Sliders className="w-4 h-4" />
                <span>Edit di Studio</span>
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                id="btn-publish-from-preview"
                type="button"
                onClick={() => setIsPublishModalOpen(true)}
                className="p-2.5 sm:px-3.5 sm:py-2 rounded-full bg-white/90 hover:bg-white text-slate-900 backdrop-blur-xl border border-white/30 shadow-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Bagikan</span>
              </button>

              {/* Moment Vault - Hanya Terlihat oleh Pembuat/Pemilik Template */}
              {currentUser && (
                <button
                  id="btn-open-drive-from-preview"
                  type="button"
                  onClick={() => setIsDriveModalOpen(true)}
                  className="p-2.5 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white backdrop-blur-xl border border-white/20 shadow-xl cursor-pointer transition-all active:scale-95"
                  title="Google Drive Momen Vault (Khusus Pemilik)"
                >
                  <HardDrive className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Success Banner if Just Generated */}
          {justGenerated && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-sm w-full px-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-3.5 rounded-2xl bg-emerald-900/90 backdrop-blur-xl border border-emerald-400/40 text-white shadow-2xl text-center flex items-center justify-between pointer-events-auto"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold">Undangan Berhasil Dibuat!</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(true)}
                  className="px-3 py-1 rounded-xl bg-emerald-400 text-slate-950 text-[11px] font-extrabold cursor-pointer hover:bg-emerald-300 transition-all"
                >
                  Ambil Link
                </button>
              </motion.div>
            </div>
          )}

          {/* Render The Clean Invitation Main (Strictly No Header & No Footer) */}
          {renderInvitationMain()}
        </div>
      )}

      {/* 4. SCREEN: STUDIO GENERATOR */}
      {currentScreen === 'studio_generator' && (
        <GeneratorDashboard
          invitation={currentInvitation}
          theme={currentTheme}
          allInvitations={invitationsList}
          onSelectInvitation={handleSelectInvitation}
          onCreateNewInvitation={handleCreateNewInvitation}
          onUpdateInvitation={handleUpdateInvitation}
          onSelectTheme={handleSelectTheme}
          onOpenPricingModal={() => setIsPricingModalOpen(true)}
          onOpenPublishModal={() => setIsPublishModalOpen(true)}
          onOpenTemplateCatalog={() => setIsTemplateCatalogOpen(true)}
          onSwitchToGuestView={handleViewGeneratedInvitation}
          onGoBack={handleGoBack}
          childrenMobilePreview={renderInvitationMain()}
        />
      )}

      {/* MODALS */}
      {/* Google OAuth Modal */}
      <GoogleOAuthModal
        isOpen={isOAuthModalOpen}
        onClose={() => setIsOAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Google Drive Moments Modal */}
      <GoogleDriveMomentsModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        accessToken={accessToken}
        currentUserEmail={currentUser?.email}
        invitationData={currentInvitation}
        onRequireLogin={() => setIsOAuthModalOpen(true)}
      />

      {/* Checkout Modal (Rp 75k & Rp 150k) */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        plan={selectedPlanToCheckout}
        invitationTitle={`${currentInvitation.groom.name.split(',')[0]} & ${currentInvitation.bride.name.split(',')[0]}`}
        onSuccessPayment={handleSuccessPayment}
      />

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        currentTier={currentInvitation.pricingTier}
        onSelectPlan={handleSelectPricingPlan}
      />

      {/* Publish Modal with Sub-link / Slug and WhatsApp link generator */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        invitation={currentInvitation}
        onUpdateInvitation={handleUpdateInvitation}
        onUpgradeRequired={() => {
          setIsPublishModalOpen(false);
          setIsPricingModalOpen(true);
        }}
      />

      {/* Template Catalog Modal */}
      <TemplateCatalogModal
        isOpen={isTemplateCatalogOpen}
        onClose={() => setIsTemplateCatalogOpen(false)}
        selectedThemeId={currentTheme.id}
        onSelectTheme={handleSelectTheme}
        onPreviewTheme={handlePreviewThemeFullscreen}
      />
    </div>
  );
}
