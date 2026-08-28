export type Locale = 'tr' | 'en';

export interface Translations {
  nav: {
    work: string;
    about: string;
    contact: string;
    startProject: string;
    menu: string;
    close: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    scroll: string;
  };
  statement: {
    text: string;
  };
  featuredWork: {
    title: string;
    viewProject: string;
  };
  horizontal: {
    title: string;
    scrollNav: string;
  };
  categories: {
    title: string;
    explore: string;
    'real-estate': string;
    'automotive': string;
    'commercial': string;
    'drone': string;
    [key: string]: string;
  };
  aboutPreview: {
    title: string;
    desc: string;
    btn: string;
    services: string[];
  };
  contactCTA: {
    title: string;
    btn: string;
    email: string;
  };
  workPage: {
    title: string;
    desc: string;
    all: string;
    empty: string;
  };
  projectDetail: {
    client: string;
    location: string;
    category: string;
    timeline: string;
    expand: string;
    moreWork: string;
    allWork: string;
    commission: string;
  };
  aboutPage: {
    title: string;
    philosophy: string;
    philosophyText: string;
    expertise: string;
    servicesList: string[];
  };
  contactPage: {
    title: string;
    email: string;
    phone: string;
    instagram: string;
    whatsapp: string;
    hq: string;
    hqText: string;
    hours: string;
    hoursText: string;
  };
  viewer: {
    esc: string;
    close: string;
    prev: string;
    next: string;
  };
  footer: {
    tagline: string;
    nav: string;
    connect: string;
    location: string;
    copyright: string;
    subtitle: string;
  };
  notFound: {
    title: string;
    subtitle: string;
    desc: string;
    homeBtn: string;
    workBtn: string;
  };
  admin: {
    nav: {
      dashboard: string;
      projects: string;
      newProject: string;
      categories: string;
      settings: string;
      logout: string;
      viewSite: string;
    };
    common: {
      save: string;
      saving: string;
      saved: string;
      cancel: string;
      delete: string;
      edit: string;
      publish: string;
      unpublish: string;
      duplicate: string;
      close: string;
      search: string;
      all: string;
      filter: string;
      back: string;
      upload: string;
      uploading: string;
      actions: string;
      status: string;
      published: string;
      draft: string;
      loading: string;
      confirm: string;
    };
    dashboard: {
      title: string;
      subtitle: string;
      totalProjects: string;
      publishedProjects: string;
      draftProjects: string;
      categories: string;
      totalMedia: string;
      recentProjects: string;
      noProjects: string;
      quickActions: string;
      createNewProject: string;
    };
    projects: {
      title: string;
      subtitle: string;
      newProjectBtn: string;
      searchPlaceholder: string;
      allCategories: string;
      allStatus: string;
      noProjectsFound: string;
      deleteConfirmTitle: string;
      deleteConfirmDesc: string;
      duplicateSuccess: string;
      deleteSuccess: string;
      statusUpdated: string;
      orderUpdated: string;
    };
    projectForm: {
      newTitle: string;
      editTitle: string;
      newSubtitle: string;
      editSubtitle: string;
      detailsTab: string;
      mediaTab: string;
      titleLabel: string;
      slugLabel: string;
      categoryLabel: string;
      clientLabel: string;
      locationLabel: string;
      yearLabel: string;
      heroAspectLabel: string;
      featuredLabel: string;
      featuredDesc: string;
      publishedLabel: string;
      publishedDesc: string;
      descTrLabel: string;
      descEnLabel: string;
      saveBtn: string;
      savingBtn: string;
      createBtn: string;
      creatingBtn: string;
      createdSuccess: string;
      updatedSuccess: string;
      mediaUploadTitle: string;
      mediaUploadDesc: string;
      setHero: string;
      isHero: string;
      deleteMediaConfirm: string;
    };
    categories: {
      title: string;
      subtitle: string;
      addNewBtn: string;
      createModalTitle: string;
      editModalTitle: string;
      nameTrLabel: string;
      nameEnLabel: string;
      slugLabel: string;
      slugHelp: string;
      orderLabel: string;
      noCategories: string;
      deleteConfirmTitle: string;
      deleteConfirmDesc: string;
      createdSuccess: string;
      updatedSuccess: string;
      deletedSuccess: string;
    };
    settings: {
      title: string;
      subtitle: string;
      saveChanges: string;
      savingChanges: string;
      identitySection: string;
      siteTitleEn: string;
      siteTitleTr: string;
      tagline: string;
      contactSection: string;
      emailLabel: string;
      phoneLabel: string;
      instagramLabel: string;
      youtubeLabel: string;
      vimeoLabel: string;
      contentSection: string;
      aboutLabel: string;
      contactLeadLabel: string;
      seoSection: string;
      seoTitleLabel: string;
      seoDescLabel: string;
      savedSuccess: string;
      saveError: string;
    };
  };
}

export const translations: Record<Locale, Translations> = {
  tr: {
    nav: {
      work: 'İŞLER',
      about: 'HAKKIMIZDA',
      contact: 'İLETİŞİM',
      startProject: 'PROJE BAŞLAT',
      menu: 'MENÜ',
      close: 'KAPAT',
    },
    hero: {
      titleLine1: 'BAYRAKTAR',
      titleLine2: 'CREATIVE',
      subtitle: 'Markalar, Mekanlar ve İnsanlar İçin Görsel Hikayeler.',
      scroll: 'KAYDIR',
    },
    statement: {
      text: 'MEKANLARI, İNSANLARI VE ANLARI GÖRSEL HİKAYELERE DÖNÜŞTÜRÜYORUZ.',
    },
    featuredWork: {
      title: 'SEÇİLMİŞ İŞLER',
      viewProject: 'PROJEYİ İNCELE',
    },
    horizontal: {
      title: 'PROJE AKIŞI [YATAY KEŞİF]',
      scrollNav: 'KAYDIRARAK KEŞFET →',
    },
    categories: {
      title: 'DİSİPLİNLER & YETKİNLİKLER',
      explore: 'KEŞFET →',
      'real-estate': 'Gayrimenkul & Mimari',
      'automotive': 'Otomotiv Sinematografisi',
      'commercial': 'Ticari & Marka Filmleri',
      'drone': 'Drone & Havadan Çekim',
    },
    aboutPreview: {
      title: 'GÖRSEL HİKAYE ANLATIMI ETRAFINDA KURULMUŞ BİR YAPIM STÜDYOSU.',
      desc: 'Gerçeklikten beslenen, sinematik zanaatla yükselen görsel deneyimler üretiyoruz. Sanatsal vizyon ile ticari etki arasında köprü kurarak akılda kalan görsel hikayeler oluşturuyoruz.',
      btn: 'STÜDYOYU KEŞFET →',
      services: [
        '01. Video Yapımı',
        '02. Fotoğraf Prodüksiyonu',
        '03. Drone Operasyonları',
        '04. Ticari Medya',
        '05. Gayrimenkul Filmleri',
        '06. Sosyal Kampanyalar',
      ],
    },
    contactCTA: {
      title: 'İZLEMEYE DEĞER BİR ŞEYLER ÜRETELİM.',
      btn: 'BİZE ULAŞIN',
      email: 'hello@bayraktarcreative.com',
    },
    workPage: {
      title: 'SEÇİLMİŞ İŞLER',
      desc: 'Farklı disiplinlerdeki sinematik görsel hikaye anlatımımızın en seçkin örnekleri.',
      all: 'Tümü',
      empty: 'BU KATEGORİDE HENÜZ ÇALIŞMA BULUNMUYOR.',
    },
    projectDetail: {
      client: 'MÜŞTERİ',
      location: 'LOKASYON',
      category: 'KATEGORİ',
      timeline: 'DÖNEM',
      expand: 'KAREYİ BÜYÜT [＋]',
      moreWork: 'DİĞER ÇALIŞMALAR',
      allWork: 'TÜM İŞLER →',
      commission: 'Özel Yapım',
    },
    aboutPage: {
      title: 'GÖRSEL HİKAYE ANLATIMI ETRAFINDA KURULMUŞ BİR YAPIM STÜDYOSU.',
      philosophy: 'FELSEFEMİZ',
      philosophyText: 'Bayraktar Creative; mimari, otomotiv, ticari marka ve dijital deneyimler için yüksek prodüksiyon kalitesinde görsel hikayeler üreten bağımsız bir kreatif stüdyodur. Her karede derinlik, ritim ve görsel bütünlük ararız.',
      expertise: 'STÜDYO UZMANLIĞI',
      servicesList: [
        'Video Prodüksiyon',
        'Fotoğrafçılık',
        'Drone Sinematografisi',
        'Ticari Reklam Filmleri',
        'Gayrimenkul & Mimari',
        'Sosyal Medya İçerikleri',
      ],
    },
    contactPage: {
      title: 'İZLEMEYE DEĞER BİR ŞEYLER ÜRETELİM.',
      email: 'E-Posta',
      phone: 'Telefon',
      instagram: 'Instagram',
      whatsapp: 'WhatsApp',
      hq: 'STÜDYO MERKEZİ',
      hqText: 'İstanbul, Türkiye\nDünya genelinde görsel prodüksiyon ve projeler için uygundur.',
      hours: 'Çalışma Saatleri',
      hoursText: 'Pazartesi — Cuma, 09:00 — 18:00 (GMT+3)',
    },
    viewer: {
      esc: 'ESC [✕]',
      close: 'Kapat',
      prev: 'Önceki',
      next: 'Sonraki',
    },
    footer: {
      tagline: 'Markalar, mekanlar ve insanlar için görsel hikayeler. Bağımsız bir sinematik yapım stüdyosu.',
      nav: 'Navigasyon',
      connect: 'Bağlantı',
      location: 'İstanbul, Türkiye — Dünya Genelinde',
      copyright: 'TÜM HAKLARI SAKLIDIR.',
      subtitle: 'Sinematik Paralaks Stüdyo Platformu',
    },
    notFound: {
      title: '404',
      subtitle: 'BU KARE BULUNAMADI.',
      desc: 'Aradığınız sayfa taşınmış veya sekansımızda yer almıyor olabilir.',
      homeBtn: 'Ana Sayfaya Dön',
      workBtn: 'İşlerimizi İnceleyin',
    },
    admin: {
      nav: {
        dashboard: 'Kontrol Paneli',
        projects: 'Projeler',
        newProject: 'Yeni Proje',
        categories: 'Kategoriler',
        settings: 'Ayarlar',
        logout: 'Çıkış Yap',
        viewSite: 'Siteyi Görüntüle',
      },
      common: {
        save: 'Kaydet',
        saving: 'Kaydediliyor...',
        saved: 'Kaydedildi',
        cancel: 'İptal',
        delete: 'Sil',
        edit: 'Düzenle',
        publish: 'Yayınla',
        unpublish: 'Taslağa Al',
        duplicate: 'Çoğalt',
        close: 'Kapat',
        search: 'Ara...',
        all: 'Tümü',
        filter: 'Filtrele',
        back: 'Geri Dön',
        upload: 'Medya Yükle',
        uploading: 'Yükleniyor...',
        actions: 'İşlemler',
        status: 'Durum',
        published: 'Yayında',
        draft: 'Taslak',
        loading: 'Yükleniyor...',
        confirm: 'Onayla',
      },
      dashboard: {
        title: 'Kontrol Paneli',
        subtitle: 'Bayraktar Creative stüdyo ve portföy yönetim merkezi.',
        totalProjects: 'Toplam Proje',
        publishedProjects: 'Yayındaki Projeler',
        draftProjects: 'Taslaklar',
        categories: 'Kategoriler',
        totalMedia: 'Yüklü Medya',
        recentProjects: 'Son Projeler',
        noProjects: 'Henüz veritabanında kayıtlı proje bulunmuyor.',
        quickActions: 'Hızlı İşlemler',
        createNewProject: 'Yeni Proje Oluştur',
      },
      projects: {
        title: 'Projeler',
        subtitle: 'Tüm portföy projelerini yönetin, yayın durumunu güncelleyin ve sıralayın.',
        newProjectBtn: 'Yeni Proje',
        searchPlaceholder: 'Başlık, müşteri veya konuma göre ara...',
        allCategories: 'Tüm Kategoriler',
        allStatus: 'Tüm Durumlar',
        noProjectsFound: 'Arama kriterlerine uygun proje bulunamadı.',
        deleteConfirmTitle: 'Projeyi Sil',
        deleteConfirmDesc: 'Bu projeyi silmek istediğinizden emin misiniz? İlişkili medya kayıtları da silinecektir.',
        duplicateSuccess: 'Proje başarıyla kopyalandı.',
        deleteSuccess: 'Proje başarıyla silindi.',
        statusUpdated: 'Proje durumu güncellendi.',
        orderUpdated: 'Sıralama güncellendi.',
      },
      projectForm: {
        newTitle: 'Yeni Proje Oluştur',
        editTitle: 'Projeyi Düzenle',
        newSubtitle: 'Portföyünüze yeni bir sinematik proje ekleyin.',
        editSubtitle: 'Proje detaylarını, medya dosyalarını ve yayın durumunu güncelleyin.',
        detailsTab: 'Proje Bilgileri',
        mediaTab: 'Medya & Galeri',
        titleLabel: 'Proje Başlığı',
        slugLabel: 'URL Slug',
        categoryLabel: 'Kategori',
        clientLabel: 'Müşteri / Marka',
        locationLabel: 'Lokasyon',
        yearLabel: 'Yapım Yılı',
        heroAspectLabel: 'Hero En/Boy Oranı',
        featuredLabel: 'Öne Çıkarılan Proje',
        featuredDesc: 'Ana sayfadaki seçilmiş işler ve vitrin bölümlerinde göster.',
        publishedLabel: 'Yayında',
        publishedDesc: 'Projeyi sitede herkesin görebileceği şekilde yayınla.',
        descTrLabel: 'Açıklama (Türkçe)',
        descEnLabel: 'Açıklama (İngilizce)',
        saveBtn: 'Değişiklikleri Kaydet',
        savingBtn: 'Kaydediliyor...',
        createBtn: 'Projeyi Oluştur',
        creatingBtn: 'Oluşturuluyor...',
        createdSuccess: 'Proje başarıyla oluşturuldu.',
        updatedSuccess: 'Proje başarıyla güncellendi.',
        mediaUploadTitle: 'Medya Yükleme & Galeri Yönetimi',
        mediaUploadDesc: 'Projeye görsel veya video yükleyin. R2 üzerine doğrudan güvenli yüklenir.',
        setHero: 'Kapak Yap',
        isHero: 'Kapak Medyası',
        deleteMediaConfirm: 'Bu medyayı silmek istediğinizden emin misiniz?',
      },
      categories: {
        title: 'Kategoriler',
        subtitle: 'Proje disiplinlerini ve kategorilerini yönetin.',
        addNewBtn: 'Yeni Kategori',
        createModalTitle: 'Yeni Kategori Ekle',
        editModalTitle: 'Kategoriyi Düzenle',
        nameTrLabel: 'Kategori Adı (Türkçe)',
        nameEnLabel: 'Kategori Adı (İngilizce)',
        slugLabel: 'Kategori Slug (URL)',
        slugHelp: 'Örnek: mimari-gayrimenkul',
        orderLabel: 'Sıralama',
        noCategories: 'Veritabanında kayıtlı kategori bulunmuyor.',
        deleteConfirmTitle: 'Kategoriyi Sil',
        deleteConfirmDesc: 'Bu kategoriyi silmek istediğinizden emin misiniz? Projeler silinmez ancak kategori bağlantısı kaldırılır.',
        createdSuccess: 'Kategori başarıyla oluşturuldu.',
        updatedSuccess: 'Kategori başarıyla güncellendi.',
        deletedSuccess: 'Kategori başarıyla silindi.',
      },
      settings: {
        title: 'Stüdyo Ayarları',
        subtitle: 'Genel stüdyo kimliği, iletişim kanalları ve SEO yapılandırması.',
        saveChanges: 'Değişiklikleri Kaydet',
        savingChanges: 'Kaydediliyor...',
        identitySection: 'Stüdyo Kimliği & Başlık',
        siteTitleEn: 'Site Başlığı (İngilizce)',
        siteTitleTr: 'Site Başlığı (Türkçe)',
        tagline: 'Slogan / Tagline',
        contactSection: 'İletişim & Sosyal Kanallar',
        emailLabel: 'E-Posta Adresi',
        phoneLabel: 'Telefon / WhatsApp',
        instagramLabel: 'Instagram URL',
        youtubeLabel: 'YouTube URL',
        vimeoLabel: 'Vimeo URL',
        contentSection: 'Stüdyo İçeriği & Biyografi',
        aboutLabel: 'Hakkımızda Metni (Editoryal Açıklama)',
        contactLeadLabel: 'İletişim Sayfası Giriş Metni',
        seoSection: 'SEO & Meta Veriler',
        seoTitleLabel: 'Varsayılan SEO Başlığı',
        seoDescLabel: 'Varsayılan SEO Açıklaması',
        savedSuccess: 'Ayarlar başarıyla veritabanına kaydedildi.',
        saveError: 'Ayarlar kaydedilirken bir hata oluştu.',
      },
    },
  },
  en: {
    nav: {
      work: 'WORK',
      about: 'ABOUT',
      contact: 'CONTACT',
      startProject: 'START PROJECT',
      menu: 'MENU',
      close: 'CLOSE',
    },
    hero: {
      titleLine1: 'BAYRAKTAR',
      titleLine2: 'CREATIVE',
      subtitle: 'Visual Stories for Brands, Spaces and People.',
      scroll: 'SCROLL',
    },
    statement: {
      text: 'WE TURN SPACES, PEOPLE AND MOMENTS INTO VISUAL STORIES.',
    },
    featuredWork: {
      title: 'SELECTED WORK',
      viewProject: 'VIEW PROJECT',
    },
    horizontal: {
      title: 'PROJECT SEQUENCE [HORIZONTAL EXPLORATION]',
      scrollNav: 'SCROLL TO NAVIGATE →',
    },
    categories: {
      title: 'DISCIPLINES & CAPABILITIES',
      explore: 'EXPLORE →',
      'real-estate': 'Real Estate & Architecture',
      'automotive': 'Automotive Cinematography',
      'commercial': 'Commercial & Brand',
      'drone': 'Drone & Aerial Views',
    },
    aboutPreview: {
      title: 'A CREATIVE PRODUCTION STUDIO BUILT AROUND VISUAL STORYTELLING.',
      desc: 'Based in reality, elevated through cinematic craft. We bridge the gap between artistic vision and commercial impact, creating visual stories that linger in memory.',
      btn: 'ABOUT THE STUDIO →',
      services: [
        '01. Video Production',
        '02. Photography',
        '03. Drone Operations',
        '04. Commercial Media',
        '05. Real Estate Films',
        '06. Social Campaigns',
      ],
    },
    contactCTA: {
      title: "LET'S MAKE SOMETHING WORTH WATCHING.",
      btn: 'GET IN TOUCH',
      email: 'hello@bayraktarcreative.com',
    },
    workPage: {
      title: 'SELECTED WORK',
      desc: 'A collection of our finest visual storytelling across various disciplines.',
      all: 'All Work',
      empty: 'NO WORK IN THIS CATEGORY YET.',
    },
    projectDetail: {
      client: 'CLIENT',
      location: 'LOCATION',
      category: 'CATEGORY',
      timeline: 'TIMELINE',
      expand: 'EXPAND FRAME [＋]',
      moreWork: 'CONTINUE EXPLORATION',
      allWork: 'ALL WORK →',
      commission: 'Commission',
    },
    aboutPage: {
      title: 'A CREATIVE PRODUCTION STUDIO BUILT AROUND VISUAL STORYTELLING.',
      philosophy: 'OUR PHILOSOPHY',
      philosophyText: 'Bayraktar Creative is an independent creative studio producing high-standard visual stories for architecture, automotive, commercial brands, and digital experiences. In every frame, we strive for depth, rhythm, and visual coherence.',
      expertise: 'STUDIO EXPERTISE',
      servicesList: [
        'Video Production',
        'Photography',
        'Drone Cinematography',
        'Commercial Films',
        'Real Estate & Architecture',
        'Social Media Content',
      ],
    },
    contactPage: {
      title: "LET'S MAKE SOMETHING WORTH WATCHING.",
      email: 'Direct Email',
      phone: 'Telephone',
      instagram: 'Instagram',
      whatsapp: 'WhatsApp',
      hq: 'STUDIO HEADQUARTERS',
      hqText: 'Istanbul, Turkey\nAvailable for commissions and visual productions worldwide.',
      hours: 'Production Hours',
      hoursText: 'Monday — Friday, 09:00 — 18:00 (GMT+3)',
    },
    viewer: {
      esc: 'ESC [✕]',
      close: 'Close',
      prev: 'Previous',
      next: 'Next',
    },
    footer: {
      tagline: 'Visual stories for brands, spaces and people. An independent cinematic production studio.',
      nav: 'Navigation',
      connect: 'Connect',
      location: 'Istanbul, Turkey — Available Worldwide',
      copyright: 'ALL RIGHTS RESERVED.',
      subtitle: 'Cinematic Parallax Studio Platform',
    },
    notFound: {
      title: '404',
      subtitle: "THIS FRAME DOESN'T EXIST.",
      desc: 'The page you are looking for has moved or does not exist in our sequence.',
      homeBtn: 'Return Home',
      workBtn: 'View Work',
    },
    admin: {
      nav: {
        dashboard: 'Dashboard',
        projects: 'Projects',
        newProject: 'New Project',
        categories: 'Categories',
        settings: 'Settings',
        logout: 'Logout',
        viewSite: 'View Live Site',
      },
      common: {
        save: 'Save Changes',
        saving: 'Saving...',
        saved: 'Saved',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        publish: 'Publish',
        unpublish: 'Unpublish',
        duplicate: 'Duplicate',
        close: 'Close',
        search: 'Search...',
        all: 'All',
        filter: 'Filter',
        back: 'Go Back',
        upload: 'Upload Media',
        uploading: 'Uploading...',
        actions: 'Actions',
        status: 'Status',
        published: 'Published',
        draft: 'Draft',
        loading: 'Loading...',
        confirm: 'Confirm',
      },
      dashboard: {
        title: 'Dashboard',
        subtitle: 'Bayraktar Creative studio and portfolio management center.',
        totalProjects: 'Total Projects',
        publishedProjects: 'Published Projects',
        draftProjects: 'Draft Projects',
        categories: 'Categories',
        totalMedia: 'Uploaded Media',
        recentProjects: 'Recent Projects',
        noProjects: 'No projects registered in database yet.',
        quickActions: 'Quick Actions',
        createNewProject: 'Create New Project',
      },
      projects: {
        title: 'Projects',
        subtitle: 'Manage all portfolio projects, update publication status, and reorder items.',
        newProjectBtn: 'New Project',
        searchPlaceholder: 'Search by title, client, or location...',
        allCategories: 'All Categories',
        allStatus: 'All Statuses',
        noProjectsFound: 'No projects match the search criteria.',
        deleteConfirmTitle: 'Delete Project',
        deleteConfirmDesc: 'Are you sure you want to delete this project? All associated media records will also be removed.',
        duplicateSuccess: 'Project duplicated successfully.',
        deleteSuccess: 'Project deleted successfully.',
        statusUpdated: 'Project status updated.',
        orderUpdated: 'Project order updated.',
      },
      projectForm: {
        newTitle: 'Create New Project',
        editTitle: 'Edit Project',
        newSubtitle: 'Add a new cinematic project to your studio portfolio.',
        editSubtitle: 'Update project details, media gallery, and publication status.',
        detailsTab: 'Project Details',
        mediaTab: 'Media & Gallery',
        titleLabel: 'Project Title',
        slugLabel: 'URL Slug',
        categoryLabel: 'Category',
        clientLabel: 'Client / Brand',
        locationLabel: 'Location',
        yearLabel: 'Production Year',
        heroAspectLabel: 'Hero Aspect Ratio',
        featuredLabel: 'Featured Project',
        featuredDesc: 'Showcase in homepage selected work and featured visual sections.',
        publishedLabel: 'Published',
        publishedDesc: 'Make project publicly visible on the live portfolio website.',
        descTrLabel: 'Description (Turkish)',
        descEnLabel: 'Description (English)',
        saveBtn: 'Save Changes',
        savingBtn: 'Saving...',
        createBtn: 'Create Project',
        creatingBtn: 'Creating...',
        createdSuccess: 'Project created successfully.',
        updatedSuccess: 'Project updated successfully.',
        mediaUploadTitle: 'Media Upload & Gallery Management',
        mediaUploadDesc: 'Upload images or videos. Directly and securely uploaded to Cloudflare R2.',
        setHero: 'Set as Hero',
        isHero: 'Hero Cover',
        deleteMediaConfirm: 'Are you sure you want to delete this media item?',
      },
      categories: {
        title: 'Categories',
        subtitle: 'Manage studio project disciplines and categories.',
        addNewBtn: 'New Category',
        createModalTitle: 'Add New Category',
        editModalTitle: 'Edit Category',
        nameTrLabel: 'Category Name (Turkish)',
        nameEnLabel: 'Category Name (English)',
        slugLabel: 'Category Slug (URL)',
        slugHelp: 'Example: architectural-real-estate',
        orderLabel: 'Sort Order',
        noCategories: 'No categories registered in database.',
        deleteConfirmTitle: 'Delete Category',
        deleteConfirmDesc: 'Are you sure you want to delete this category? Projects will not be deleted but will lose this categorization.',
        createdSuccess: 'Category created successfully.',
        updatedSuccess: 'Category updated successfully.',
        deletedSuccess: 'Category deleted successfully.',
      },
      settings: {
        title: 'Studio Settings',
        subtitle: 'Global studio identity, contact channels, and SEO configuration.',
        saveChanges: 'Save Changes',
        savingChanges: 'Saving...',
        identitySection: 'Studio Identity & Title',
        siteTitleEn: 'Site Title (English)',
        siteTitleTr: 'Site Title (Turkish)',
        tagline: 'Tagline / Slogan',
        contactSection: 'Contact & Social Channels',
        emailLabel: 'Email Address',
        phoneLabel: 'Phone / WhatsApp',
        instagramLabel: 'Instagram URL',
        youtubeLabel: 'YouTube URL',
        vimeoLabel: 'Vimeo URL',
        contentSection: 'Studio Content & Bio',
        aboutLabel: 'About Text (Editorial Statement)',
        contactLeadLabel: 'Contact Page Lead Text',
        seoSection: 'SEO & Metadata',
        seoTitleLabel: 'Default SEO Title',
        seoDescLabel: 'Default SEO Description',
        savedSuccess: 'Settings saved successfully to database.',
        saveError: 'Failed to save settings to database.',
      },
    },
  },
};
