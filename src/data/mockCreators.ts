import {
  CORE_CREATOR_CATEGORIES,
  type CoreCreatorCategory,
  type CreatorCategory,
  type CreatorProfile,
} from '../types/creator';

const unsplash = (id: string, width = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

const avatar = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&w=400&q=80`;

export const MOCK_CREATORS: CreatorProfile[] = [
  // =========================================================================
  // PHOTOGRAPHERS (ფოტოგრაფი)
  // =========================================================================
  {
    id: 'creator-01',
    slug: 'nika-beridze',
    fullName: 'ნიკა ბერიძე',
    avatarUrl: avatar('1507003211169-0a1dd7228f2d'),
    coverWorkUrl: unsplash('1515886657613-9f3515b0c78f'),
    role: 'photographer',
    bio: 'არქიტექტურული და ფეშენ ედითორიალ ფოტოგრაფია თბილისიდან. ვმუშაობ მინიმალისტურ კომპოზიციასა და ბუნებრივ შუქზე.',
    location: 'თბილისი',
    skills: [
      'ფეშენ ედითორიალი',
      'არქიტექტურული ფოტოგრაფია',
      'სტუდიური შუქი',
      'რეთუში',
    ],
    contacts: {
      instagram: 'https://instagram.com/nikaberidze.studio',
      whatsapp: 'https://wa.me/995599112233',
      email: 'nika@beridzestudio.ge',
    },
    portfolioItems: [
      {
        id: 'nika-p1',
        type: 'project',
        title: 'შემოდგომა/ზამთარი — კამპანია',
        clientName: 'ბრენდისთვის: Materiel',
        description:
          'მინიმალისტური ფეშენ ედითორიალი სუფთა არქიტექტურულ ფონზე, ბუნებრივი დღის განათებით.',
        myRole:
          'ვიზუალური კონცეფცია, ლოკაციის შერჩევა, ფოტოგადაღება, ფერის კორექცია და ედითორიალ რეთუში',
        year: 2026,
        coverImageUrl: unsplash('1515886657613-9f3515b0c78f'),
        galleryImages: [
          unsplash('1515886657613-9f3515b0c78f', 1200),
          unsplash('1509631179647-0177331693ae', 1200),
          unsplash('1469334031218-e382a71b716b', 1200),
          unsplash('1490481651871-ab68de25d43d', 1200),
        ],
      },
      {
        id: 'nika-p2',
        type: 'project',
        title: 'ბეტონი და სინათლე',
        clientName: 'ბრენდისთვის: სტამბა',
        description:
          'ინტერიერისა და არქიტექტურული დეტალების სერია დილის მკვეთრი ჩრდილების თამაშით.',
        myRole:
          'არქიტექტურული გადაღება, ბუნებრივი შუქის დაგეგმვა და საბეჭდი პოსტ-პროდაქშენი',
        year: 2025,
        coverImageUrl: unsplash('1486406146926-c627a92ad1ab'),
        galleryImages: [
          unsplash('1486406146926-c627a92ad1ab', 1200),
          unsplash('1513694203232-719a280e022f', 1200),
          unsplash('1497366216548-37526070297c', 1200),
        ],
      },
      {
        id: 'nika-p3',
        type: 'project',
        title: 'დილის რიტუალი',
        clientName: 'ბრენდისთვის: Shavi Coffee Roasters',
        description:
          'ატმოსფერული ბრენდ-ფოტოგრაფია ახალი ყავის სახალავი სივრცისა და პაკეტებისთვის.',
        myRole:
          'ბრენდ-ფოტოგრაფია, პროდუქტის სთაილინგი და სოციალური მედიის ვიზუალების დამუშავება',
        year: 2025,
        coverImageUrl: unsplash('1495474472287-4d71bcdd2085'),
        galleryImages: [
          unsplash('1495474472287-4d71bcdd2085', 1200),
          unsplash('1442512595331-e89e73853f31', 1200),
          unsplash('1509042239860-f550ce710b93', 1200),
        ],
      },
      {
        id: 'nika-v1',
        type: 'video',
        title: 'კამპანიის ბექსთეიჯი — მოძრავი პორტრეტი',
        clientName: 'ბრენდისთვის: Materiel',
        description:
          'მოკლე 35mm ესთეტიკის ბექსთეიჯ რგოლი შემოდგომის ფოტოსესიიდან.',
        myRole:
          'ბექსთეიჯ ვიდეოგადაღება, რიტმული მონტაჟი და ფირის ფერის კორექცია',
        year: 2026,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
        thumbnailUrl: unsplash('1509631179647-0177331693ae'),
        externalSocialUrl: 'https://instagram.com/reel/rgoli-nika-bts',
        platform: 'instagram',
        aspectRatio: '9:16',
      },
    ],
  },
  {
    id: 'creator-02',
    slug: 'nino-kapanadze',
    fullName: 'ნინო კაპანაძე',
    avatarUrl: avatar('1494790108377-be9c29b29330'),
    coverWorkUrl: unsplash('1414235077428-338989a2e8c0'),
    role: 'photographer',
    bio: 'პროდუქტის, გასტრონომიისა და ლაიფსტაილ ფოტოგრაფი. ვეხმარები ქართულ ბრენდებს თბილი, ავთენტური ვიზუალური ენის შექმნაში.',
    location: 'თბილისი',
    skills: [
      'პროდუქტის ფოტოგრაფია',
      'Food Styling',
      'ლაიფსტაილი',
      'კამპანიების გადაღება',
    ],
    contacts: {
      instagram: 'https://instagram.com/ninokapanadze.photo',
      email: 'nino@kapanadzephoto.ge',
      whatsapp: 'https://wa.me/995591223344',
    },
    portfolioItems: [
      {
        id: 'nino-p1',
        type: 'project',
        title: 'სეზონური მენიუ',
        clientName: 'ბრენდისთვის: ლოლიტა',
        description:
          'გასტრონომიული ფოტოსესია ახალი სეზონური კერძებისა და საავტორო კოქტეილებისთვის.',
        myRole:
          'Food Styling, რეკვიზიტის შერჩევა, ფოტოგადაღება და ფერის დამუშავება',
        year: 2026,
        coverImageUrl: unsplash('1414235077428-338989a2e8c0'),
        galleryImages: [
          unsplash('1414235077428-338989a2e8c0', 1200),
          unsplash('1504674900247-0877df9cc836', 1200),
          unsplash('1555396273-367ea4eb4db5', 1200),
        ],
      },
      {
        id: 'nino-p2',
        type: 'project',
        title: 'კაფსულების კოლექცია',
        clientName: 'ბრენდისთვის: მეამა',
        description:
          'სუფთა სტუდიური პროდუქტის გადაღება რბილი ტონებითა და ტექსტურული დეტალებით.',
        myRole:
          'სტუდიური სეტ-დიზაინი, განათების სქემა, პროდუქტის გადაღება და მაღალი რეზოლუციის რეთუში',
        year: 2025,
        coverImageUrl: unsplash('1509042239860-f550ce710b93'),
        galleryImages: [
          unsplash('1509042239860-f550ce710b93', 1200),
          unsplash('1495474472287-4d71bcdd2085', 1200),
          unsplash('1514933651103-005eec06c04b', 1200),
        ],
      },
      {
        id: 'nino-p3',
        type: 'project',
        title: 'ქვევრის ხასიათი',
        clientName: 'ბრენდისთვის: 8000 მოსავალი',
        description:
          'მცირე მარნების ღვინის ბოთლებისა და სადეგუსტაციო სივრცის ედითორიალ სერია.',
        myRole:
          'ედითორიალ გადაღება, ბოთლების სტუდიური განათება და კატალოგისთვის დამუშავება',
        year: 2025,
        coverImageUrl: unsplash('1510812431401-41d2bd2722f3'),
        galleryImages: [
          unsplash('1510812431401-41d2bd2722f3', 1200),
          unsplash('1514933651103-005eec06c04b', 1200),
          unsplash('1504674900247-0877df9cc836', 1200),
        ],
      },
    ],
  },
  {
    id: 'creator-03',
    slug: 'giorgi-lomidze',
    fullName: 'გიორგი ლომიძე',
    avatarUrl: avatar('1500648767791-00dcc994a43e'),
    coverWorkUrl: unsplash('1470229722913-7c0e2dbbafd3'),
    role: 'photographer',
    bio: 'პორტრეტის, საკონცერტო და დოკუმენტური ქუჩის ფოტოგრაფია. ვიჭერ ცოცხალ ემოციებს 35mm ფირსა და ციფრულ კამერაზე.',
    location: 'ბათუმი',
    skills: [
      'პორტრეტი',
      'საკონცერტო ფოტოგრაფია',
      '35mm ფირი',
      'დოკუმენტური სერიები',
    ],
    contacts: {
      instagram: 'https://instagram.com/giorgilomidze.film',
      email: 'giorgi.lomidze@gmail.com',
    },
    portfolioItems: [
      {
        id: 'giorgi-p1',
        type: 'project',
        title: 'ღამის სცენა',
        clientName: 'ბრენდისთვის: Tbilisi Open Air',
        description:
          'ფესტივალის მთავარი სცენისა და აუდიტორიის დოკუმენტური ფოტორეპორტაჟი.',
        myRole:
          'სამდღიანი ფესტივალის ფოტორეპორტაჟი, სელექცია და პრესისთვის ოპერატიული დამუშავება',
        year: 2026,
        coverImageUrl: unsplash('1470229722913-7c0e2dbbafd3'),
        galleryImages: [
          unsplash('1470229722913-7c0e2dbbafd3', 1200),
          unsplash('1514525253161-7a46d19cd819', 1200),
          unsplash('1493225457124-a3eb161ffa5f', 1200),
        ],
      },
      {
        id: 'giorgi-p2',
        type: 'project',
        title: 'ქალაქის რიტმი 35mm-ზე',
        clientName: 'ბრენდისთვის: ფაბრიკა თბილისი',
        description:
          'ანალოგური ქუჩის პორტრეტების სერია ჩუღურეთის ეზოებსა და საღამოს სინათლეში.',
        myRole:
          '35mm ფირზე გადაღება, სკანირების კონტროლი და ფოტოსერიის კურატორობა',
        year: 2025,
        coverImageUrl: unsplash('1477959858617-67f85cf4f1df'),
        galleryImages: [
          unsplash('1477959858617-67f85cf4f1df', 1200),
          unsplash('1519501025264-65ba15a82390', 1200),
          unsplash('1511671782779-c97d3d27a1d4', 1200),
        ],
      },
      {
        id: 'giorgi-p3',
        type: 'project',
        title: 'ბექსთეიჯის ქრონიკა',
        clientName: 'ბრენდისთვის: Mutant Radio',
        description:
          'არტისტების კულისებს მიღმა პორტრეტები საგამოფენო კატალოგისთვის.',
        myRole:
          'დოკუმენტური პორტრეტის გადაღება, შავ-თეთრი ტონირება და საგამოფენო ფაილების მომზადება',
        year: 2025,
        coverImageUrl: unsplash('1511671782779-c97d3d27a1d4'),
        galleryImages: [
          unsplash('1511671782779-c97d3d27a1d4', 1200),
          unsplash('1493225457124-a3eb161ffa5f', 1200),
        ],
      },
    ],
  },

  // =========================================================================
  // GRAPHIC DESIGNERS (გრაფიკული დიზაინერი)
  // =========================================================================
  {
    id: 'creator-04',
    slug: 'mariam-tsiklauri',
    fullName: 'მარიამ წიკლაური',
    avatarUrl: avatar('1534528741775-53994a69daeb'),
    coverWorkUrl: unsplash('1565193566173-7a0ee3dbe261'),
    role: 'graphic-designer',
    bio: 'ბრენდ აიდენტითი, შეფუთვის დიზაინი და თანამედროვე ქართული ტიპოგრაფია. ვქმნი მკაფიო და დასამახსოვრებელ ვიზუალურ სისტემებს.',
    location: 'თბილისი',
    skills: [
      'ბრენდინგი',
      'შეფუთვის დიზაინი',
      'ქართული ტიპოგრაფია',
      'ლოგოტიპი',
    ],
    contacts: {
      instagram: 'https://instagram.com/mariamtsiklauri.design',
      email: 'mariam@tsiklauridesign.ge',
    },
    portfolioItems: [
      {
        id: 'mariam-p1',
        type: 'project',
        title: 'ვიზუალური იდენტობა და შეფუთვა',
        clientName: 'ბრენდისთვის: გუნდა საცხობი',
        description:
          'სრული რებრენდინგი, საავტორო ქართული შრიფტის ლოგოტიპი და ეკო-შეფუთვების ხაზი.',
        myRole:
          'ბრენდ სტრატეგია, საავტორო ქართული ლოგოტიპი, შეფუთვის კონცეფცია და ბეჭდური ფაილების მომზადება',
        year: 2026,
        coverImageUrl: unsplash('1509440159596-0249088772ff'),
        galleryImages: [
          unsplash('1509440159596-0249088772ff', 1200),
          unsplash('1558961363-fa8fdf82db35', 1200),
          unsplash('1586717791821-3f44a563fa4c', 1200),
        ],
      },
      {
        id: 'mariam-p2',
        type: 'project',
        title: 'ხელნაკეთი კერამიკის ბრენდბუქი',
        clientName: 'ბრენდისთვის: კერა სტუდიო',
        description:
          'ტაქტილური ბეჭდური მასალები, იარლიყები და მინიმალისტური ციფრული კატალოგი.',
        myRole:
          'ვიზუალური იდენტობა, ბრენდბუქი, იარლიყების დიზაინი და კატალოგის დაკაბადონება',
        year: 2025,
        coverImageUrl: unsplash('1565193566173-7a0ee3dbe261'),
        galleryImages: [
          unsplash('1565193566173-7a0ee3dbe261', 1200),
          unsplash('1578749556568-bc2c40e68b61', 1200),
          unsplash('1561070791-2526d30994b5', 1200),
        ],
      },
      {
        id: 'mariam-p3',
        type: 'project',
        title: 'საფერავის რეზერვი — ეტიკეტი',
        clientName: 'ბრენდისთვის: შუმი',
        description:
          'ლიმიტირებული სერიის ღვინის ეტიკეტი გეომეტრიული გრაფიკითა და რელიეფური ბეჭდვით.',
        myRole:
          'ეტიკეტის დიზაინი, ქაღალდისა და რელიეფური ბეჭდვის სპეციფიკაცია, პრე-პრეს მომზადება',
        year: 2025,
        coverImageUrl: unsplash('1561070791-2526d30994b5'),
        galleryImages: [
          unsplash('1561070791-2526d30994b5', 1200),
          unsplash('1626785774573-4b799315345d', 1200),
          unsplash('1510812431401-41d2bd2722f3', 1200),
        ],
      },
    ],
  },
  {
    id: 'creator-05',
    slug: 'sandro-gachechiladze',
    fullName: 'სანდრო გაჩეჩილაძე',
    avatarUrl: '',
    coverWorkUrl: unsplash('1513519245088-0e12902e5a38'),
    role: 'graphic-designer',
    bio: 'არტ-დირექტორი და გრაფიკული დიზაინერი. ფოკუსირებული ვარ პოსტერების დიზაინზე, კულტურული ღონისძიებების ბრენდინგსა და ციფრულ ვიზუალებზე.',
    location: 'თბილისი',
    skills: [
      'არტ-დირექშენი',
      'პოსტერების დიზაინი',
      'ვიზუალური სისტემები',
      'დიჯიტალ დიზაინი',
    ],
    contacts: {
      instagram: 'https://instagram.com/sandrogache.art',
      email: 'hello@sandrogache.com',
      whatsapp: 'https://wa.me/995577334455',
    },
    portfolioItems: [
      {
        id: 'sandro-p1',
        type: 'project',
        title: 'არქიტექტურის ბიენალე — პოსტერები',
        clientName: 'ბრენდისთვის: თბილისის არქიტექტურის ბიენალე',
        description:
          'შვეიცარიული ბადის სისტემაზე აწყობილი პოსტერებისა და საგამოფენო ნავიგაციის სერია.',
        myRole:
          'არტ-დირექშენი, პოსტერების სერია, საგამოფენო ნავიგაციის სისტემა და ტიპოგრაფიული ბადე',
        year: 2026,
        coverImageUrl: unsplash('1513519245088-0e12902e5a38'),
        galleryImages: [
          unsplash('1513519245088-0e12902e5a38', 1200),
          unsplash('1544716278-ca5e3f4abd8c', 1200),
          unsplash('1586023492125-27b2c045efd7', 1200),
        ],
      },
      {
        id: 'sandro-p2',
        type: 'project',
        title: 'სეზონური კამპანიის ვიზუალური ენა',
        clientName: 'ბრენდისთვის: Rooms Hotels',
        description:
          'ბეჭდური და ციფრული არტ-დირექშენი ზამთრის კულტურული პროგრამისთვის.',
        myRole:
          'კამპანიის ვიზუალური კონცეფცია, გრაფიკული სისტემა, ბეჭდური და დიჯიტალ ადაპტაციები',
        year: 2025,
        coverImageUrl: unsplash('1586023492125-27b2c045efd7'),
        galleryImages: [
          unsplash('1586023492125-27b2c045efd7', 1200),
          unsplash('1523726491678-bf852e717f6a', 1200),
          unsplash('1513694203232-719a280e022f', 1200),
        ],
      },
      {
        id: 'sandro-p3',
        type: 'project',
        title: 'ვინილის ყდების კოლექცია',
        clientName: 'ბრენდისთვის: CES Records',
        description:
          'ექსპერიმენტული გრაფიკული ალბომის ყდები ლოკალური ელექტრონული ლეიბლისთვის.',
        myRole:
          'ალბომის ყდების გრაფიკული დიზაინი, ილუსტრაცია და ვინილის ბეჭდური მაკეტები',
        year: 2025,
        coverImageUrl: unsplash('1558655146-9f40138edfeb'),
        galleryImages: [
          unsplash('1558655146-9f40138edfeb', 1200),
          unsplash('1626785774573-4b799315345d', 1200),
        ],
      },
    ],
  },
  {
    id: 'creator-06',
    slug: 'elene-maisuradze',
    fullName: 'ელენე მაისურაძე',
    avatarUrl: '',
    coverWorkUrl: unsplash('1556228578-0d85b1a4d571'),
    role: 'graphic-designer',
    bio: 'ედითორიალ და ბრენდ დიზაინერი მინიმალისტური ესთეტიკით. ვმუშაობ ბეჭდურ გამოცემებზე, შეფუთვებსა და ბრენდბუქებზე.',
    location: 'თბილისი',
    skills: [
      'ედითორიალ დიზაინი',
      'ბრენდბუქი',
      'შეფუთვა',
      'სოციალური მედიის სისტემა',
    ],
    contacts: {
      instagram: 'https://instagram.com/elenemaisuradze.studio',
      email: 'elene@maisuradze.ge',
    },
    portfolioItems: [
      {
        id: 'elene-p1',
        type: 'project',
        title: 'ბოტანიკური კოსმეტიკის შეფუთვა',
        clientName: 'ბრენდისთვის: ივერი ბოტანიკალს',
        description:
          'სუფთა მინიმალისტური ეტიკეტებისა და სასაჩუქრე ყუთების დიზაინი ნატურალური მოვლის ხაზისთვის.',
        myRole:
          'შეფუთვის არქიტექტურა, 6 SKU ეტიკეტის დიზაინი, ფერთა სისტემა და 3D მოქაპები',
        year: 2026,
        coverImageUrl: unsplash('1556228578-0d85b1a4d571'),
        galleryImages: [
          unsplash('1556228578-0d85b1a4d571', 1200),
          unsplash('1522335789203-aabd1fc54bc9', 1200),
          unsplash('1596462502278-27bfdc403348', 1200),
        ],
      },
      {
        id: 'elene-p2',
        type: 'project',
        title: 'არქიტექტურული ჟურნალის დაკაბადონება',
        clientName: 'ბრენდისთვის: აჭარა ჯგუფი',
        description:
          '120-გვერდიანი ბეჭდური გამოცემის კონცეფცია, ტიპოგრაფიული იერარქია და ფოტორედაქტირება.',
        myRole:
          'ედითორიალ ბადის დიზაინი, სრული 120-გვერდიანი დაკაბადონება და საბეჭდი კონტროლი',
        year: 2025,
        coverImageUrl: unsplash('1544716278-ca5e3f4abd8c'),
        galleryImages: [
          unsplash('1544716278-ca5e3f4abd8c', 1200),
          unsplash('1600607687939-ce8a6c25118c', 1200),
          unsplash('1523726491678-bf852e717f6a', 1200),
        ],
      },
      {
        id: 'elene-p3',
        type: 'project',
        title: 'სადღესასწაულო იდენტობა',
        clientName: 'ბრენდისთვის: კეტო და კოტე',
        description:
          'ბეჭდური მენიუები, მოსაწვევები და სოციალური ქსელების შაბლონები.',
        myRole:
          'ბეჭდური მენიუს დიზაინი, მოსაწვევები და სოციალური მედიის შაბლონების სისტემა',
        year: 2025,
        coverImageUrl: unsplash('1523726491678-bf852e717f6a'),
        galleryImages: [
          unsplash('1523726491678-bf852e717f6a', 1200),
          unsplash('1561070791-2526d30994b5', 1200),
        ],
      },
    ],
  },

  // =========================================================================
  // VIDEOGRAPHERS (ვიდეოგრაფი)
  // =========================================================================
  {
    id: 'creator-07',
    slug: 'luka-chikovani',
    fullName: 'ლუკა ჩიქოვანი',
    avatarUrl: avatar('1539571696357-5a69c17a67c6'),
    coverWorkUrl: unsplash('1464822759023-fed622ff2c3b'),
    role: 'videographer',
    bio: 'კომერციული ვიდეოგრაფი და კოლორისტი. ვიღებ დინამიკურ ბრენდ-ფილმებს, სარეკლამო რგოლებსა და აეროკადრებს საქართველოს მასშტაბით.',
    location: 'თბილისი',
    skills: [
      'კომერციული ვიდეო',
      'DaVinci Color Grading',
      'დრონით გადაღება',
      'მონტაჟი',
    ],
    contacts: {
      instagram: 'https://instagram.com/lukachikovani.dop',
      tiktok: 'https://tiktok.com/@lukachikovani',
      whatsapp: 'https://wa.me/995599445566',
      email: 'luka@chikovani.film',
    },
    portfolioItems: [
      {
        id: 'luka-v1',
        type: 'video',
        title: 'მთების ენერგია — იმიჯ ფილმი',
        clientName: 'ბრენდისთვის: ბორჯომი',
        description:
          'ბუნების ტექსტურებსა და წყლის დინამიკაზე აგებული კომერციული რგოლი.',
        myRole:
          'ოპერატორობა (DOP), აეროგადაღება, მონტაჟი და DaVinci Resolve ფერის კორექცია',
        year: 2026,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
        thumbnailUrl: unsplash('1464822759023-fed622ff2c3b'),
        externalSocialUrl: 'https://youtube.com/watch?v=rgoli-borjomi-film',
        platform: 'youtube',
        aspectRatio: '16:9',
      },
      {
        id: 'luka-v2',
        type: 'video',
        title: 'მზის ჩასვლა მთებში — აერო კამპანია',
        clientName: 'ბრენდისთვის: თიბისი კონცეპტი',
        description:
          'მაღალმთიანი პანორამული აეროგადაღება ზამთრის პრემიუმ კამპანიისთვის.',
        myRole:
          'დრონის ოპერატორობა, კადრირება, საუნდ-დიზაინი და ფერის კორექცია',
        year: 2026,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
        thumbnailUrl: unsplash('1506905925346-21bda4d32df4'),
        externalSocialUrl: 'https://youtube.com/watch?v=rgoli-tbc-concept',
        platform: 'youtube',
        aspectRatio: '16:9',
      },
      {
        id: 'luka-v3',
        type: 'video',
        title: 'ღამის ქალაქის რიტმი',
        clientName: 'ბრენდისთვის: Gudauri Freeride',
        description:
          'ვერტიკალური თიზერ რგოლი სწრაფი მონტაჟითა და საუნდ-დიზაინით.',
        myRole:
          'კონცეფცია, ღამის გადაღება, დინამიკური მონტაჟი და ხმის დიზაინი',
        year: 2025,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-vertical-view-of-a-traffic-light-at-night-42358-large.mp4',
        thumbnailUrl: unsplash('1519681393784-d120267933ba'),
        externalSocialUrl: 'https://instagram.com/reel/rgoli-luka-night',
        platform: 'instagram',
        aspectRatio: '9:16',
      },
      {
        id: 'luka-p1',
        type: 'project',
        title: 'ფერების კორექცია — კადრების არქივი',
        clientName: 'ბრენდისთვის: ბორჯომი',
        description:
          'DaVinci Resolve-ში დამუშავებული ფილმის ფრეიმები და ფერთა პალიტრის კვლევა.',
        myRole:
          'Color Grading, საავტორო LUT-ის შექმნა და ვიზუალური პალიტრის სტანდარტიზაცია',
        year: 2026,
        coverImageUrl: unsplash('1506905925346-21bda4d32df4'),
        galleryImages: [
          unsplash('1506905925346-21bda4d32df4', 1200),
          unsplash('1464822759023-fed622ff2c3b', 1200),
          unsplash('1519681393784-d120267933ba', 1200),
        ],
      },
    ],
  },
  {
    id: 'creator-08',
    slug: 'davit-gelashvili',
    fullName: 'დავით გელაშვილი',
    avatarUrl: '',
    coverWorkUrl: unsplash('1492691527719-9d1e07e534b4'),
    role: 'videographer',
    bio: 'ფეშენ ფილმები, მუსიკალური კლიპები და მოკლე დოკუმენტური ისტორიები. აქცენტს ვაკეთებ კინემატოგრაფიულ მოძრაობასა და ატმოსფერულ განათებაზე.',
    location: 'თბილისი',
    skills: [
      'ფეშენ ფილმი',
      'მუსიკალური კლიპი',
      'სარეჟისორო მონტაჟი',
      'სინემატოგრაფია',
    ],
    contacts: {
      instagram: 'https://instagram.com/davitgelashvili.film',
      email: 'davit@gelashvilifilm.ge',
    },
    portfolioItems: [
      {
        id: 'davit-v1',
        type: 'video',
        title: 'ახალი სილუეტი — ფეშენ ფილმი',
        clientName: 'ბრენდისთვის: Crosty',
        description:
          'ნეონის განათებით გადაღებული რიტმული ფეშენ რგოლი სეზონური დროფისთვის.',
        myRole:
          'რეჟისურა, სინემატოგრაფია, განათების დადგმა და სარეჟისორო მონტაჟი',
        year: 2026,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
        thumbnailUrl: unsplash('1483985988355-763728e1935b'),
        externalSocialUrl: 'https://instagram.com/reel/rgoli-crosty-film',
        platform: 'instagram',
        aspectRatio: '9:16',
      },
      {
        id: 'davit-v2',
        type: 'video',
        title: 'სცენის პულსი — ლაივ ვიზუალი',
        clientName: 'ბრენდისთვის: Tbilisi Fashion Week',
        description:
          'დინამიკური შუქ-ჩრდილები და ექსპერიმენტული კადრირება ოფიციალური აფთერმუვისთვის.',
        myRole:
          'კამერის ოპერატორობა, მონტაჟი, ფერის კორექცია და მუსიკალური სინქრონიზაცია',
        year: 2025,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
        thumbnailUrl: unsplash('1485846234645-a62644f84728'),
        externalSocialUrl: 'https://youtube.com/watch?v=rgoli-tfw-aftermovie',
        platform: 'youtube',
        aspectRatio: '16:9',
      },
      {
        id: 'davit-v3',
        type: 'video',
        title: 'ციფრული აბსტრაქცია',
        clientName: 'ბრენდისთვის: Kikala Studio',
        description:
          'ექსპერიმენტული ვიზუალური ეტიუდი ბრენდის ციფრული პრეზენტაციისთვის.',
        myRole:
          'ვიზუალური რეჟისურა, სტუდიური გადაღება და ექსპერიმენტული პოსტ-პროდაქშენი',
        year: 2025,
        videoUrl: 'https://assets.mixkit.co/videos/99544/99544-720.mp4',
        thumbnailUrl: unsplash('1536240478700-b869070f9279'),
        externalSocialUrl: 'https://instagram.com/reel/rgoli-kikala-motion',
        platform: 'instagram',
        aspectRatio: '16:9',
      },
    ],
  },
  {
    id: 'creator-09',
    slug: 'salome-abramishvili',
    fullName: 'სალომე აბრამიშვილი',
    avatarUrl: avatar('1524504388940-b1c1722653e1'),
    coverWorkUrl: unsplash('1600585154340-be6161a56a0c'),
    role: 'videographer',
    bio: 'ჰოსპიტალითი, რესტორნებისა და ბუტიკ-სასტუმროების ვიდეოგრაფი. ვქმნი ესთეტიკურ Reels-ებს და მოკლე ბრენდ-ისტორიებს.',
    location: 'ბათუმი',
    skills: [
      'Reels პროდაქშენი',
      'ჰოსპიტალითი ვიდეო',
      'ვიდეო ედითინგი',
      'სთორითელინგი',
    ],
    contacts: {
      instagram: 'https://instagram.com/salome.visuals',
      tiktok: 'https://tiktok.com/@salomevisuals',
      email: 'salome@abramishvili.ge',
    },
    portfolioItems: [
      {
        id: 'salome-v1',
        type: 'video',
        title: 'დილა მთის ტერასაზე',
        clientName: 'ბრენდისთვის: Rooms Kazbegi',
        description:
          'მშვიდი, ბუნებრივ განათებაზე აწყობილი ატმოსფერული Reels სერია.',
        myRole:
          'სთორიბორდი, ვიდეოგადაღება, მონტაჟი და ფერის კორექცია Instagram Reels-ისთვის',
        year: 2026,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1191-large.mp4',
        thumbnailUrl: unsplash('1600585154340-be6161a56a0c'),
        externalSocialUrl: 'https://instagram.com/reel/rgoli-rooms-morning',
        platform: 'instagram',
        aspectRatio: '9:16',
      },
      {
        id: 'salome-v2',
        type: 'video',
        title: 'გემოების ატმოსფერო',
        clientName: 'ბრენდისთვის: შავი ლომი',
        description:
          'მოკლე ვიდეო-პორტრეტი სამზარეულოს დეტალებსა და სტუმარმასპინძლობაზე.',
        myRole:
          'გადაღება, ბუნებრივი ASMR ხმის ჩაწერა, მონტაჟი და თბილი ფერის გრეიდინგი',
        year: 2025,
        videoUrl:
          'https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4',
        thumbnailUrl: unsplash('1555396273-367ea4eb4db5'),
        externalSocialUrl: 'https://tiktok.com/@salomevisuals/video/740102',
        platform: 'tiktok',
        aspectRatio: '16:9',
      },
      {
        id: 'salome-v3',
        type: 'video',
        title: 'ზღვისპირა სეზონი',
        clientName: 'ბრენდისთვის: Paragraph Shekvetili',
        description: 'საზაფხულო ჰოსპიტალითი ფილმი თბილი ფერთა პალიტრით.',
        myRole:
          'სრული ვიდეო პროდაქშენი, ლოკაციის რეჟისურა, მონტაჟი და ვერსიების ადაპტაცია',
        year: 2025,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
        thumbnailUrl: unsplash('1545324418-cc1a3fa10c00'),
        externalSocialUrl: 'https://youtube.com/watch?v=rgoli-paragraph-summer',
        platform: 'youtube',
        aspectRatio: '16:9',
      },
    ],
  },

  // =========================================================================
  // CONTENT CREATORS / UGC (კონტენტ კრეატორი / UGC)
  // =========================================================================
  {
    id: 'creator-10',
    slug: 'ana-khutsishvili',
    fullName: 'ანა ხუციშვილი',
    avatarUrl: avatar('1544005313-94ddf0286df2'),
    coverWorkUrl: unsplash('1570172619644-dfd03ed5d881'),
    role: 'content-creator',
    bio: 'ბიუთი, კანის მოვლისა და ლაიფსტაილ UGC კრეატორი. ვქმნი ბუნებრივ, მაღალკონვერსიულ ვიდეოებს TikTok-ისა და Instagram Reels-ისთვის.',
    location: 'თბილისი',
    skills: [
      'UGC ვიდეოები',
      'სცენარის შედგენა',
      'Reels/TikTok',
      'ვიდეო ედითინგი',
      'ბიუთი კონტენტი',
    ],
    contacts: {
      instagram: 'https://instagram.com/anakhutsishvili.ugc',
      tiktok: 'https://tiktok.com/@anakhutsishvili',
      whatsapp: 'https://wa.me/995595667788',
      email: 'ana@khutsishvili.ge',
    },
    portfolioItems: [
      {
        id: 'ana-v1',
        type: 'video',
        title: 'დილის კანის მოვლის რუტინა',
        clientName: 'ბრენდისთვის: ივერი ბოტანიკალს',
        description:
          'ავთენტური GRWM სტილის UGC რგოლი მკაფიო ჰუკითა და პროდუქტის დემონსტრაციით.',
        myRole:
          'სცენარისა და 3 ჰუკ-ვარიაციის შედგენა, გადაღება, ხმოვანი გახმოვანება და TikTok მონტაჟი',
        year: 2026,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-young-woman-looking-at-phone-in-the-city-41310-large.mp4',
        thumbnailUrl: unsplash('1570172619644-dfd03ed5d881'),
        externalSocialUrl: 'https://tiktok.com/@anakhutsishvili/video/740511',
        platform: 'tiktok',
        aspectRatio: '9:16',
      },
      {
        id: 'ana-v2',
        type: 'video',
        title: 'ერთი დღე ქალაქში — UGC',
        clientName: 'ბრენდისთვის: Kote',
        description:
          'ლაიფსტაილ ფორმატის Reels ვიდეო ბრენდის ყოველდღიური აქსესუარების ინტეგრაციით.',
        myRole:
          'კონცეფცია, გადაღება ბუნებრივ ლოკაციებზე, ტიტრები და Instagram Reels ედითინგი',
        year: 2026,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-using-a-smartphone-41318-large.mp4',
        thumbnailUrl: unsplash('1522335789203-aabd1fc54bc9'),
        externalSocialUrl: 'https://instagram.com/reel/rgoli-ana-kote',
        platform: 'instagram',
        aspectRatio: '9:16',
      },
      {
        id: 'ana-v3',
        type: 'video',
        title: 'გულწრფელი მიმოხილვა — ტექსტურა და შედეგი',
        clientName: 'ბრენდისთვის: L’Occitane Georgia',
        description:
          'ახლო კადრებითა და ხმოვანი თხრობით აწყობილი პერფორმანს-კრეატივი რეკლამისთვის.',
        myRole:
          'სარეკლამო სცენარი, პროდუქტის მაკრო-გადაღება, Voiceover და პერფორმანს მონტაჟი',
        year: 2025,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
        thumbnailUrl: unsplash('1596462502278-27bfdc403348'),
        externalSocialUrl: 'https://tiktok.com/@anakhutsishvili/video/740822',
        platform: 'tiktok',
        aspectRatio: '9:16',
      },
    ],
  },
  {
    id: 'creator-11',
    slug: 'tako-meladze',
    fullName: 'თაკო მელაძე',
    avatarUrl: avatar('1529626455594-4ff0802cfb7e'),
    coverWorkUrl: unsplash('1501339847302-ac426a4a7cbb'),
    role: 'content-creator',
    bio: 'ტექნოლოგიების, ყავის კულტურისა და ყოველდღიური ლაიფსტაილის კრეატორი. სწრაფი მონტაჟი, ძლიერი ჰუკები და ავთენტური გადმოცემა.',
    location: 'თბილისი',
    skills: [
      'TikTok სტრატეგია',
      'ვიდეო ედითინგი',
      'სცენარის შედგენა',
      'აპლიკაციების UGC',
    ],
    contacts: {
      instagram: 'https://instagram.com/takomeladze',
      tiktok: 'https://tiktok.com/@takomeladze',
      email: 'tako@meladze.creator',
    },
    portfolioItems: [
      {
        id: 'tako-v1',
        type: 'video',
        title: 'შეკვეთა 30 წამში — აპლიკაციის UGC',
        clientName: 'ბრენდისთვის: Wolt Georgia',
        description:
          'ეკრანისა და რეალური კადრების დინამიკური კომბინაცია TikTok Ads კამპანიისთვის.',
        myRole:
          'სცენარის შედგენა, გადაღება, ეკრანის ინტეგრაცია და TikTok Ads-ისთვის სწრაფი მონტაჟი',
        year: 2026,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-using-a-smartphone-41318-large.mp4',
        thumbnailUrl: unsplash('1501339847302-ac426a4a7cbb'),
        externalSocialUrl: 'https://tiktok.com/@takomeladze/video/741001',
        platform: 'tiktok',
        aspectRatio: '9:16',
      },
      {
        id: 'tako-v2',
        type: 'video',
        title: 'ჩემი სამუშაო დილა',
        clientName: 'ბრენდისთვის: მეამა',
        description:
          'ესთეტიკური დილის ვლოგი მინიმალისტური ტიტრებითა და ბუნებრივი ხმებით.',
        myRole:
          'იდეა, გადაღება, ბუნებრივი ხმის მიქსინგი, ტიტრები და ფერის კორექცია',
        year: 2026,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-young-woman-looking-at-phone-in-the-city-41310-large.mp4',
        thumbnailUrl: unsplash('1498050108023-c5249f4df085'),
        externalSocialUrl: 'https://instagram.com/reel/rgoli-tako-meama',
        platform: 'instagram',
        aspectRatio: '9:16',
      },
      {
        id: 'tako-v3',
        type: 'video',
        title: 'რა ვნახოთ ამ უიქენდზე',
        clientName: 'ბრენდისთვის: Cavea+',
        description:
          'სასაუბრო ფორმატის სწრაფი რეკომენდაციების რუბრიკა მაღალი ჩართულობისთვის.',
        myRole:
          'კონტენტ სტრატეგია, ტექსტის წერა, გადაღება და რიტმული TikTok ედითინგი',
        year: 2025,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-vertical-view-of-a-traffic-light-at-night-42358-large.mp4',
        thumbnailUrl: unsplash('1485846234645-a62644f84728'),
        externalSocialUrl: 'https://tiktok.com/@takomeladze/video/741299',
        platform: 'tiktok',
        aspectRatio: '9:16',
      },
    ],
  },
  {
    id: 'creator-12',
    slug: 'irakli-dadiani',
    fullName: 'ირაკლი დადიანი',
    avatarUrl: avatar('1472099645785-5658abf4ff4e'),
    coverWorkUrl: unsplash('1501785888041-af3ef285b470'),
    role: 'content-creator',
    bio: 'მოგზაურობის, გასტრონომიისა და თავგადასავლების კონტენტ კრეატორი. ვაცოცხლებ ლოკაციებსა და ტურისტულ ბრენდებს მოკლე ფორმატში.',
    location: 'თბილისი',
    skills: [
      'Travel UGC',
      'Reels/TikTok',
      'მობილური ვიდეოგრაფია',
      'სთორითელინგი',
    ],
    contacts: {
      instagram: 'https://instagram.com/iraklidadiani.travel',
      tiktok: 'https://tiktok.com/@iraklidadiani',
      whatsapp: 'https://wa.me/995599889900',
      email: 'irakli@dadianitravel.ge',
    },
    portfolioItems: [
      {
        id: 'irakli-v1',
        type: 'video',
        title: '48 საათი კავკასიონზე',
        clientName: 'ბრენდისთვის: Kazbegi Glamping',
        description:
          'მოკლე სამოგზაურო მინი-ვლოგი ლოკაციის ატმოსფეროსა და მარშრუტის ჩვენებით.',
        myRole:
          'მარშრუტის სთორითელინგი, გადაღება, გახმოვანება და ფერის კორექცია',
        year: 2026,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
        thumbnailUrl: unsplash('1501785888041-af3ef285b470'),
        externalSocialUrl: 'https://instagram.com/reel/rgoli-irakli-kazbegi',
        platform: 'instagram',
        aspectRatio: '16:9',
      },
      {
        id: 'irakli-v2',
        type: 'video',
        title: 'ღვინის გზა კახეთში',
        clientName: 'ბრენდისთვის: თელიანი ველი',
        description: 'გასტრო-ტურისტული სერია ვენახებიდან დეგუსტაციამდე.',
        myRole:
          'სცენარი, მობილური ვიდეოგადაღება, ინტერვიუების მონტაჟი და ტიტრები',
        year: 2026,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1191-large.mp4',
        thumbnailUrl: unsplash('1476514525535-07fb3b4ae5f1'),
        externalSocialUrl: 'https://tiktok.com/@iraklidadiani/video/742044',
        platform: 'tiktok',
        aspectRatio: '9:16',
      },
      {
        id: 'irakli-v3',
        type: 'video',
        title: 'ღამის თბილისის გიდი',
        clientName: 'ბრენდისთვის: Georgian Airways',
        description: 'საერთაშორისო ვიზიტორებისთვის შექმნილი სწრაფი ურბანული გიდი.',
        myRole:
          'სცენარის შედგენა, ღამის ლოკაციების გადაღება, დინამიკური მონტაჟი და ორენოვანი ტიტრები',
        year: 2025,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-vertical-view-of-a-traffic-light-at-night-42358-large.mp4',
        thumbnailUrl: unsplash('1519501025264-65ba15a82390'),
        externalSocialUrl: 'https://instagram.com/reel/rgoli-irakli-tbilisi',
        platform: 'instagram',
        aspectRatio: '9:16',
      },
    ],
  },

  // =========================================================================
  // OTHER / SPECIALIZED CREATIVES (სხვა: UI/UX, Motion, Illustrator / 3D)
  // =========================================================================
  {
    id: 'creator-13',
    slug: 'tekla-janelidze',
    fullName: 'თეკლა ჯანელიძე',
    avatarUrl: avatar('1580489944761-15a19d654956'),
    coverWorkUrl: unsplash('1545235617-9465d2a55698'),
    role: 'other',
    customRoleLabel: 'UI/UX დიზაინერი',
    bio: 'ციფრული პროდუქტების, დიზაინ-სისტემებისა და ვებ-ინტერფეისების დიზაინერი. ვაქცევ რთულ სერვისებს მარტივ და სუფთა გამოცდილებად.',
    location: 'თბილისი',
    skills: [
      'UI/UX დიზაინი',
      'დიზაინ-სისტემები',
      'პროტოტიპირება',
      'მობილური აპები',
    ],
    contacts: {
      instagram: 'https://instagram.com/teklajanelidze.ux',
      behance: 'https://behance.net/teklajanelidze',
      linkedin: 'https://linkedin.com/in/teklajanelidze',
      email: 'tekla@janelidze.design',
    },
    portfolioItems: [
      {
        id: 'tekla-p1',
        type: 'project',
        title: 'მობილური ბანკინგის დიზაინ-სისტემა',
        clientName: 'ბრენდისთვის: Space International',
        description:
          'მოდულური კომპონენტების ბიბლიოთეკა და მომხმარებლის ნაკადების რედიზაინი iOS და Android პლატფორმებისთვის.',
        myRole:
          'UX კვლევა, საინფორმაციო არქიტექტურა, Figma დიზაინ-სისტემა და ინტერაქტიული პროტოტიპები',
        year: 2026,
        coverImageUrl: unsplash('1545235617-9465d2a55698'),
        galleryImages: [
          unsplash('1545235617-9465d2a55698', 1200),
          unsplash('1507238691740-187a5b1d37b8', 1200),
          unsplash('1551650975-87deedd944c3', 1200),
        ],
      },
      {
        id: 'tekla-p2',
        type: 'project',
        title: 'ელექტრონული კომერციის ვებ-პლატფორმა',
        clientName: 'ბრენდისთვის: Velistore',
        description:
          'მინიმალისტური ონლაინ მაღაზიის ინტერფეისი სწრაფი ძიებითა და გამარტივებული გადახდის ეტაპით.',
        myRole:
          'პროდუქტის დიზაინი, მობილური ადაპტაცია და მომხმარებელთა ტესტირება',
        year: 2025,
        coverImageUrl: unsplash('1507238691740-187a5b1d37b8'),
        galleryImages: [
          unsplash('1507238691740-187a5b1d37b8', 1200),
          unsplash('1551650975-87deedd944c3', 1200),
        ],
      },
      {
        id: 'tekla-p3',
        type: 'project',
        title: 'ბილეთების აპლიკაციის რედიზაინი',
        clientName: 'ბრენდისთვის: TKT.ge',
        description:
          'კონცერტებისა და კინოს სეანსების დაჯავშნის განახლებული ინტერფეისი და ადგილების ინტერაქტიული რუკა.',
        myRole:
          'UI დიზაინი, მიკროინტერაქციები და დეველოპერებისთვის სპეციფიკაციების მომზადება',
        year: 2025,
        coverImageUrl: unsplash('1551650975-87deedd944c3'),
        galleryImages: [
          unsplash('1551650975-87deedd944c3', 1200),
          unsplash('1545235617-9465d2a55698', 1200),
        ],
      },
    ],
  },
  {
    id: 'creator-14',
    slug: 'beka-mamulashvili',
    fullName: 'ბექა მამულაშვილი',
    avatarUrl: '',
    coverWorkUrl: unsplash('1634017839464-5c339ebe3cb4'),
    role: 'other',
    customRoleLabel: 'მოუშენ დიზაინერი',
    bio: '2D და 3D მოუშენ გრაფიკა, ბრენდ-ანიმაციები და კინეტიკური ტიპოგრაფია. ვაცოცხლებ ვიზუალურ იდენტობებს ციფრული ეკრანებისთვის.',
    location: 'თბილისი',
    skills: [
      'მოუშენ დიზაინი',
      '3D ანიმაცია',
      'კინეტიკური ტიპოგრაფია',
      'After Effects / Cinema 4D',
    ],
    contacts: {
      instagram: 'https://instagram.com/bekamamulashvili.motion',
      behance: 'https://behance.net/bekamamulashvili',
      email: 'beka@mamulashvili.motion',
    },
    portfolioItems: [
      {
        id: 'beka-v1',
        type: 'video',
        title: 'ფესტივალის ოფიციალური ტიტრები',
        clientName: 'ბრენდისთვის: თბილისის კინოფესტივალი',
        description:
          'კინეტიკური ქართული ტიპოგრაფიითა და სინათლის ტექსტურებით შექმნილი გახსნის ვიზუალი.',
        myRole:
          'მოუშენ კონცეფცია, 3D რენდერი, კინეტიკური ტიპოგრაფია და საუნდ-სინქრონიზაცია',
        year: 2026,
        videoUrl: 'https://assets.mixkit.co/videos/99544/99544-720.mp4',
        thumbnailUrl: unsplash('1634017839464-5c339ebe3cb4'),
        externalSocialUrl: 'https://instagram.com/reel/rgoli-beka-titles',
        platform: 'instagram',
        aspectRatio: '16:9',
      },
      {
        id: 'beka-v2',
        type: 'video',
        title: 'ბრენდ-იდენტობის მოუშენ სისტემა',
        clientName: 'ბრენდისთვის: TBC Tech',
        description:
          'ლოგოს ანიმაცია და სოციალური მედიის მოუშენ შაბლონები ტექნოლოგიური მიმართულებისთვის.',
        myRole:
          'მოუშენ სისტემის დიზაინი, ლოგოს ანიმაცია და After Effects შაბლონების აწყობა',
        year: 2026,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
        thumbnailUrl: unsplash('1550745165-9bc0b252726f'),
        externalSocialUrl: 'https://instagram.com/reel/rgoli-beka-tbc',
        platform: 'instagram',
        aspectRatio: '16:9',
      },
      {
        id: 'beka-v3',
        type: 'video',
        title: 'პროდუქტის 3D პრეზენტაცია',
        clientName: 'ბრენდისთვის: მეამა',
        description:
          'მინიმალისტური 3D რენდერ რგოლი ახალი ყავის აპარატის ციფრული კამპანიისთვის.',
        myRole:
          '3D მოდელირება, მასალებისა და განათების დაყენება, ანიმაცია და კომპოზიტინგი',
        year: 2025,
        videoUrl:
          'https://assets.mixkit.co/videos/preview/mixkit-vertical-view-of-a-traffic-light-at-night-42358-large.mp4',
        thumbnailUrl: unsplash('1618005182384-a83a8bd57fbe'),
        externalSocialUrl: 'https://instagram.com/reel/rgoli-beka-3d',
        platform: 'instagram',
        aspectRatio: '9:16',
      },
    ],
  },
  {
    id: 'creator-15',
    slug: 'sopo-kvaratskhelia',
    fullName: 'სოფო კვარაცხელია',
    avatarUrl: avatar('1531746020798-e6953c6e8e04'),
    coverWorkUrl: unsplash('1513364776144-60967b0f800f'),
    role: 'other',
    customRoleLabel: 'ილუსტრატორი · 3D არტისტი',
    bio: 'ედითორიალ ილუსტრაცია, პერსონაჟების დიზაინი და ციფრული არტ-სერიები წიგნებისთვის, პრესისა და თანამედროვე ქართული ბრენდებისთვის.',
    location: 'ბათუმი',
    skills: [
      'ციფრული ილუსტრაცია',
      'ედითორიალ არტი',
      'პერსონაჟების დიზაინი',
      '3D ვიზუალიზაცია',
    ],
    contacts: {
      instagram: 'https://instagram.com/sopokvaratskhelia.art',
      behance: 'https://behance.net/sopokvaratskhelia',
      email: 'sopo@kvaratskhelia.art',
    },
    portfolioItems: [
      {
        id: 'sopo-p1',
        type: 'project',
        title: 'ქალაქის ისტორიები — ედითორიალ ილუსტრაციები',
        clientName: 'ბრენდისთვის: ინდიგო',
        description:
          'საავტორო ციფრული ილუსტრაციების სერია ბეჭდური ჟურნალის სპეციალური გამოშვებისთვის.',
        myRole:
          'ვიზუალური თხრობა, სკეტჩინგი, ციფრული ილუსტრაცია და ბეჭდური ფერის მომზადება',
        year: 2026,
        coverImageUrl: unsplash('1513364776144-60967b0f800f'),
        galleryImages: [
          unsplash('1513364776144-60967b0f800f', 1200),
          unsplash('1579783902614-a3fb3927b6a5', 1200),
          unsplash('1547891654-e66ed7ebb968', 1200),
        ],
      },
      {
        id: 'sopo-p2',
        type: 'project',
        title: 'ზღვის სეზონი — შეფუთვის ილუსტრაციები',
        clientName: 'ბრენდისთვის: შავი ზღვის ჩაი',
        description:
          'ხელნაკეთი ტექსტურებით შექმნილი ბოტანიკური ილუსტრაციები სასაჩუქრე კოლექციისთვის.',
        myRole:
          'საავტორო ბოტანიკური ილუსტრაცია, პატერნების სისტემა და ფერთა პალიტრა',
        year: 2025,
        coverImageUrl: unsplash('1579783902614-a3fb3927b6a5'),
        galleryImages: [
          unsplash('1579783902614-a3fb3927b6a5', 1200),
          unsplash('1547891654-e66ed7ebb968', 1200),
        ],
      },
      {
        id: 'sopo-p3',
        type: 'project',
        title: 'წიგნის ყდების სერია',
        clientName: 'ბრენდისთვის: სულაკაურის გამომცემლობა',
        description:
          'თანამედროვე ქართული პროზის სამტომეულის ილუსტრირებული ყდები.',
        myRole:
          'ილუსტრაცია, ყდის კომპოზიცია და საგამომცემლო ფაილების სრული მომზადება',
        year: 2025,
        coverImageUrl: unsplash('1547891654-e66ed7ebb968'),
        galleryImages: [
          unsplash('1547891654-e66ed7ebb968', 1200),
          unsplash('1513364776144-60967b0f800f', 1200),
        ],
      },
    ],
  },
];

/**
 * Data-access selectors structured cleanly so a Supabase repository
 * can replace the in-memory mock array without changing page components.
 */
export function getCreatorBySlug(slug: string): CreatorProfile | undefined {
  const normalized = slug.trim().toLowerCase();
  return MOCK_CREATORS.find((creator) => creator.slug === normalized);
}

export function getCreatorsByCategory(
  category: CreatorCategory | 'all',
  source: readonly CreatorProfile[] = MOCK_CREATORS,
): CreatorProfile[] {
  if (category === 'all') {
    return [...source];
  }
  if (category === 'other') {
    return source.filter(
      (creator) =>
        creator.role === 'other' ||
        !CORE_CREATOR_CATEGORIES.includes(creator.role as CoreCreatorCategory),
    );
  }
  return source.filter((creator) => creator.role === category);
}
