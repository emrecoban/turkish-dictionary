<center><img src="https://raw.githubusercontent.com/emrecoban/turkish-dictionary/main/github_assets/logo.svg" alt="Türkçe Sözlük Logo" width="60" /></center>

# <center>Türkçe Sözlük</center>

Türkçe Sözlük, kelimelerin anlamlarını, özelliklerini ve örnek cümleler içerisinde kullanımını gösteren bir dijital platformdur. Platformda yer alan kelimelerin veri kaynağı [sozluk.gov.tr](https://sozluk.gov.tr)'dir.

### 🇬🇧 English

Türkçe Sözlük ("The Turkish Dictionary") is a digital platform that displays the meanings, properties, and usage of words in example sentences. The data source for the words included in the platform is [sozluk.gov.tr](https://sozluk.gov.tr).

## Önizleme

Türkçe Sözlük, [turkcesozluk.vercel.app](https://turkcesozluk.vercel.app) adresi üzerinden kullanılabilir.

Arama çubuğuna istediğiniz Türkçe sözcüğü yazarak arama yapabilirsiniz. Arama kutucuğuna yazılan harflere göre öneriler listelenecektir. Seçtiğiniz kelimeyi <kbd>Enter</kbd> tuşuna basarak veya 🔍 arama ikonuna tıklayarak aratabilir ve ardından uygun sonuçları görüntüleyebilirsiniz.

## Özellikler

- Adres çubuğu üzerinden arama yapabilme: [turkcesozluk.vercel.app/](https://turkcesozluk.vercel.app/)`{kelime}`
- Otomatik öneriler
- Karanlık stil (Dark mode)
- Esnek arayüz (Responsive)
- Kullanıcıya özel arama geçmişi
- Arama geçmişini temizleme
- Rastgele kelime aratma
- Kelimele anlamlarını kopyalama

## Ekran Görüntüleri

| Türkçe Sözlük - "deney" arama sonuçları (Light)                                                |
| ---------------------------------------------------------------------------------------------- |
| ![](https://raw.githubusercontent.com/emrecoban/turkish-dictionary/main/github_assets/ss1.png) |

| Türkçe Sözlük - Otomatik Öneriler (Light)                                                      |
| ---------------------------------------------------------------------------------------------- |
| ![](https://raw.githubusercontent.com/emrecoban/turkish-dictionary/main/github_assets/ss2.png) |

| Türkçe Sözlük - "deney" arama sonuçları (Dark)                                                 |
| ---------------------------------------------------------------------------------------------- |
| ![](https://raw.githubusercontent.com/emrecoban/turkish-dictionary/main/github_assets/ss3.png) |

| Türkçe Sözlük - Kullanıcıya özel arama geçmişi (Dark)                                          |
| ---------------------------------------------------------------------------------------------- |
| ![](https://raw.githubusercontent.com/emrecoban/turkish-dictionary/main/github_assets/ss4.png) |

| Türkçe Sözlük - Arama geçmişini temizleme ve animasyon (Light)                                          |
| ------------------------------------------------------------------------------------------------------- |
| ![](https://raw.githubusercontent.com/emrecoban/turkish-dictionary/main/github_assets/animation_td.gif) |

## Dizin Yapısı

```bash
├── public
├── src
│   ├── components
│   │   ├── Form.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   └── Output.jsx
│   ├── App.jsx
│   ├── autocomplete.jsx
│   ├── main.jsx
│   └── style.css
├── README.md
├── package.json
├── package-lock.json
├── vercel.json
└── vite.config.js
```

![markmap](https://raw.githubusercontent.com/emrecoban/turkish-dictionary/main/github_assets/markmap.png)

## Kurulum

1. Bu depoyu yerel makinenize klonlayın:

```bash
  git clone https://github.com/emrecoban/turkish-dictionary.git
```

2. Proje dizinine gidin:

```bash
  cd turkish-dictionary
```

3. Gerekli bağımlılıkları `npm` ile yükleyin:

```bash
  npm install
```

4. Uygulamayı başlatın:

```bash
  npm run dev
```

5. Tarayıcınızda '[http://localhost:5173](http://localhost:5173)' adresine giderek uygulamayı görüntüleyin.

## Katkıda Bulunma

Hata raporları, özellik talepleri ve pull request'leri memnuniyetle karşılanmaktadır. Bu proje, işbirliği için güvenli ve hoşgörülü bir ortam olmayı amaçlamaktadır ve katkıda bulunanların, Katılımcı Anlaşması'nın davranış kurallarına uyması beklenmektedir.

## Yapılacaklar

- [x] Arama geçmişinin listelenmesi.
- [x] Rastgele kelime düğmesi.
- [ ] Sözcüklerin İngilizce dilindeki eş anlamlılarının gösterilmesi.
- [ ] Arama sonucuna göre `twitter:image` meta etiketinin oluşturulması.

## Teknolojiler

- JavaScript
- React
  - React Router
  - copy-text-to-clipboard
  - auto-animate
- Vite
- JSON

## Destek

- Bana GitHub üzerinden sponsor ol.
- Bu repo'ya yıldız ver.
- Beni Twitter'dan ya da GitHub'dan takip et: [@emreshepherd](https://twitter.com/emreshepherd) - [@emrecoban](https://github.com/emrecoban).
- Bana kahve ısmarla: https://www.buymeacoffee.com/emrecoban

## Referanslar

- [Dictionary web app - Frontend Mentor](https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL)

## Lisans

Türkçe Sözlük, MIT Lisansı şartları altında açık kaynak olarak kullanıma sunulmaktadır.
