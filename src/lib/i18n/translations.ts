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
  },
};
