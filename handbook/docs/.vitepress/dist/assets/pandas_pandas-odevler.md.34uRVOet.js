import{_ as a,c as i,o as n,ae as l}from"./chunks/framework.Cd-3tpCq.js";const A=JSON.parse('{"title":"🐼 Pandas Eğitimi - 5 Zorlayıcı Ödev","description":"","frontmatter":{},"headers":[],"relativePath":"pandas/pandas-odevler.md","filePath":"pandas/pandas-odevler.md"}'),e={name:"pandas/pandas-odevler.md"};function p(t,s,k,r,h,d){return n(),i("div",null,s[0]||(s[0]=[l(`<h1 id="🐼-pandas-egitimi-5-zorlayıcı-odev" tabindex="-1">🐼 Pandas Eğitimi - 5 Zorlayıcı Ödev <a class="header-anchor" href="#🐼-pandas-egitimi-5-zorlayıcı-odev" aria-label="Permalink to &quot;🐼 Pandas Eğitimi - 5 Zorlayıcı Ödev&quot;">​</a></h1><p>Bu ödevler, Pandas eğitim materyalinde öğrenilen tüm konuları kapsamlı bir şekilde test etmek için tasarlanmıştır. Her ödev farklı zorluk seviyesinde ve farklı Pandas becerilerini sınar.</p><hr><h2 id="📊-odev-1-karmasık-veri-manipulasyonu-ve-analizi" tabindex="-1">📊 Ödev 1: Karmaşık Veri Manipülasyonu ve Analizi <a class="header-anchor" href="#📊-odev-1-karmasık-veri-manipulasyonu-ve-analizi" aria-label="Permalink to &quot;📊 Ödev 1: Karmaşık Veri Manipülasyonu ve Analizi&quot;">​</a></h2><h3 id="gorev-acıklaması" tabindex="-1">Görev Açıklaması <a class="header-anchor" href="#gorev-acıklaması" aria-label="Permalink to &quot;Görev Açıklaması&quot;">​</a></h3><p>Bir teknoloji şirketinin çalışan verilerini analiz edeceksiniz. Bu ödevde veri okuma, temizleme, filtreleme, gruplama ve ileri seviye manipülasyon tekniklerini kullanacaksınız.</p><h3 id="yapmanız-gerekenler" tabindex="-1">Yapmanız Gerekenler <a class="header-anchor" href="#yapmanız-gerekenler" aria-label="Permalink to &quot;Yapmanız Gerekenler&quot;">​</a></h3><ol><li>200 çalışanlık rastgele veri seti oluşturun</li><li>Veriye bilinçli eksiklikler ve tutarsızlıklar ekleyin</li><li>Çoklu koşullu filtreler uygulayın</li><li>Karmaşık gruplama ve agregasyon işlemleri yapın</li><li>Performans bazlı ranking sistemi oluşturun</li></ol><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pandas </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pd</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numpy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> np</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> random</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> datetime </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> datetime, timedelta</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Pandas ayarları</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pd.set_option(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;display.max_columns&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">None</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pd.set_option(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;display.width&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">None</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pd.set_option(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;display.max_colwidth&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Rastgele seed ayarla</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">np.random.seed(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">42</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">random.seed(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">42</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># BURADAN KODUNUZ BAŞLIYOR</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========================</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 200 çalışanlık veri seti oluşturun (şu sütunlarla):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Çalışan_ID, Ad, Soyad, Yaş, Departman, Pozisyon, İşe_Başlama_Tarihi</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Maaş, Prim, Performans_Puanı, Eğitim_Seviyesi, Şehir, Deneyim_Yılı</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. Veri setine şu eksiklikleri/tutarsızlıkları ekleyin:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - %15 oranında eksik Performans_Puanı değerleri</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - %10 oranında eksik Prim değerleri  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Bazı çalışanların yaşları deneyim yılından küçük (mantıksız)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Bazı maaş değerleri negatif</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Aynı çalışanın 2-3 farklı kaydı (duplikasyonlar)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. Veri temizleme işlemleri yapın:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Eksik verileri uygun yöntemlerle doldurun</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Mantıksız yaş/deneyim verilerini düzeltin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Negatif maaşları pozitif yapın</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Duplikasyonları temizleyin</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. Şu karmaşık filtreleme işlemlerini yapın:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - 30 yaş altı VE (yüksek performanslı VEYA 3+ yıl deneyimli) çalışanları bulun</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Ortalama maaştan %20 fazla kazanan ama düşük performanslı çalışanları listeleyin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Her departmanda en az 2 yıl deneyimli ve lisans üstü eğitimli çalışan sayısını bulun</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 5. Gruplama ve agregasyon:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Departman ve şehir bazında ortalama maaş, max prim, min yaş hesaplayın</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Eğitim seviyesine göre performans ortalamaları</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Yaş gruplarına (20-30, 30-40, 40-50, 50+) göre departman dağılımı</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 6. İleri seviye işlemler:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Her çalışan için &quot;Maaş_Yüzdesi&quot; (departman ortalamasına göre) hesaplayın</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - &quot;Potansiyel_Değeri&quot; = (Performans * Deneyim) / (Yaş/10) formülü ile hesaplayın</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Departman içinde performans sıralaması yapın (rank)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 7. Özel rapor oluşturun:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - En yüksek potansiyelli 20 çalışanı listeleyin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Departman bazında maaş artışı önerisi hesaplayın</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Risk altındaki çalışanları (düşük performans + yüksek maaş) tespit edin</span></span></code></pre></div><hr><h2 id="📊-odev-2-zaman-serisi-ve-coklu-veri-seti-analizi" tabindex="-1">📊 Ödev 2: Zaman Serisi ve Çoklu Veri Seti Analizi <a class="header-anchor" href="#📊-odev-2-zaman-serisi-ve-coklu-veri-seti-analizi" aria-label="Permalink to &quot;📊 Ödev 2: Zaman Serisi ve Çoklu Veri Seti Analizi&quot;">​</a></h2><h3 id="gorev-acıklaması-1" tabindex="-1">Görev Açıklaması <a class="header-anchor" href="#gorev-acıklaması-1" aria-label="Permalink to &quot;Görev Açıklaması&quot;">​</a></h3><p>Bir e-ticaret şirketinin satış verilerini analiz edeceksiniz. Bu ödevde zaman bazlı analizler, çoklu DataFrame birleştirme işlemleri ve trend analizleri yapacaksınız.</p><h3 id="yapmanız-gerekenler-1" tabindex="-1">Yapmanız Gerekenler <a class="header-anchor" href="#yapmanız-gerekenler-1" aria-label="Permalink to &quot;Yapmanız Gerekenler&quot;">​</a></h3><ol><li>3 farklı veri seti oluşturun (Satışlar, Ürünler, Müşteriler)</li><li>Veri setlerini farklı yöntemlerle birleştirin</li><li>Zaman bazlı analizler yapın</li><li>Karmaşık pivot tablolar oluşturun</li></ol><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pandas </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pd</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numpy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> np</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> datetime </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> datetime, timedelta</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> calendar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Pandas ayarları</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pd.set_option(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;display.max_columns&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">None</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pd.set_option(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;display.max_rows&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># BURADAN KODUNUZ BAŞLIYOR</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========================</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. Üç adet veri seti oluşturun:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># a) SATIŞLAR tablosu (1000 satış kaydı):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Satış_ID, Müşteri_ID, Ürün_ID, Tarih, Miktar, Birim_Fiyat</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Tarih aralığı: Son 2 yıl</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Bazı ay/günlerde satış yoğunluğu daha fazla olsun</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># b) ÜRÜNLER tablosu (50 ürün):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Ürün_ID, Ürün_Adı, Kategori, Maliyet, Stok_Durumu</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Kategoriler: Elektronik, Giyim, Ev, Spor, Kitap</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># c) MÜŞTERİLER tablosu (200 müşteri):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Müşteri_ID, Ad, Soyad, Yaş, Şehir, Kayıt_Tarihi, Müşteri_Segmenti</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Segmentler: Premium, Standart, Bronze</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. Veri birleştirme işlemleri:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Tüm tabloları birleştirerek ana veri setini oluşturun</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Inner, Left, Right join farklarını gösterin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Birleştirme sonrası eksik verileri analiz edin</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. Zaman bazlı analizler:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Aylık satış trendlerini hesaplayan</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Haftanın günlerine göre satış dağılımını bulan</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Yılın hangi aylarında hangi kategoriler daha çok satıldığını analiz eden</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Önceki ay ile karşılaştırmalı büyüme oranları hesaplayan</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. Karmaşık pivot tablolar:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Kategori/Ay bazında toplam satış tutarı</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Müşteri segmenti/Şehir bazında ortalama satış miktarı  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Ürün/Müşteri yaş grubu bazında satış performansı</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 5. İleri seviye zaman analizleri:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Rolling window (3 aylık) hareketli ortalamalar</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Mevsimsel satış paternlerini tespit etme</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Yılın aynı dönemlerini karşılaştırma (YoY analizi)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 6. Müşteri analizi:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Müşteri bazında CLV (Customer Lifetime Value) hesaplama</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - En sadık müşterileri (tekrar satın alma oranı) bulma</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Churn riski taşıyan müşterileri tespit etme (uzun süredir alışveriş yapmayan)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 7. Özel metrikler:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Her kategorinin toplam satıştaki payını hesaplama</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Ürün bazında karlılık analizi (satış fiyatı - maliyet)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Şehir bazında pazarlama etkinliği skorları</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 8. Rapor ve görselleştirme hazırlığı:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Executive summary tablosu oluşturun</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - En önemli 10 bulguyu özetleyin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Aksiyon önerileri listeleyin</span></span></code></pre></div><hr><h2 id="📊-odev-3-finansal-veri-analizi-ve-risk-degerlendirmesi" tabindex="-1">📊 Ödev 3: Finansal Veri Analizi ve Risk Değerlendirmesi <a class="header-anchor" href="#📊-odev-3-finansal-veri-analizi-ve-risk-degerlendirmesi" aria-label="Permalink to &quot;📊 Ödev 3: Finansal Veri Analizi ve Risk Değerlendirmesi&quot;">​</a></h2><h3 id="gorev-acıklaması-2" tabindex="-1">Görev Açıklaması <a class="header-anchor" href="#gorev-acıklaması-2" aria-label="Permalink to &quot;Görev Açıklaması&quot;">​</a></h3><p>Bir bankanın kredi portföyünü analiz edeceksiniz. Bu ödevde finansal metriklerin hesaplanması, risk sınıflandırması ve karmaşık koşullu işlemler yapacaksınız.</p><h3 id="yapmanız-gerekenler-2" tabindex="-1">Yapmanız Gerekenler <a class="header-anchor" href="#yapmanız-gerekenler-2" aria-label="Permalink to &quot;Yapmanız Gerekenler&quot;">​</a></h3><ol><li>Kredi portföy verisi oluşturun</li><li>Risk skorları hesaplayan</li><li>Portföy analizleri yapın</li><li>Stres testleri uygulayın</li></ol><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pandas </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pd</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numpy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> np</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> datetime </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> datetime, timedelta</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Pandas ayarları ve fonksiyonlar</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pd.set_option(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;display.max_columns&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">None</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pd.set_option(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;display.precision&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># BURADAN KODUNUZ BAŞLIYOR</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========================</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. KREDİ PORTFÖYÜ verisi oluşturun (500 kredi):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Kredi_ID, Müşteri_ID, Kredi_Tutarı, Faiz_Oranı, Vade_Ay</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Açılış_Tarihi, Aylık_Ödeme, Kalan_Bakiye, Gecikme_Günü</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Müşteri_Yaş, Gelir, Kredi_Skoru, Teminat_Türü, İl</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. Risk faktörleri ekleyin:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - %20 kredide 0-30 gün gecikme</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - %10 kredide 30+ gün gecikme  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - %5 kredide 90+ gün gecikme (NPL)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Bazı müşterilerin geliri aylık ödemeden düşük (tutarsızlık)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. Finansal metriklerin hesaplanması:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - DTI (Debt to Income): Aylık ödeme / Aylık gelir</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - LTV (Loan to Value): Kredi tutarı / Teminat değeri (teminat varsa)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Kalan vade hesaplama</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Toplam faiz maliyeti hesaplama</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. Risk sınıflandırması oluşturun:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - A (Düşük Risk): Kredi skoru 750+, DTI&lt;30%, gecikme yok</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - B (Orta Risk): Kredi skoru 650-749, DTI 30-40%, hafif gecikme</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - C (Yüksek Risk): Kredi skoru 550-649, DTI 40-50%, orta gecikme  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - D (Çok Yüksek Risk): Kredi skoru &lt;550, DTI&gt;50%, ağır gecikme</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 5. Portföy analizleri:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Risk sınıfına göre portföy dağılımı</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - İl bazında ortalama kredi tutarı ve risk dağılımı</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Vade gruplarına göre (0-12, 13-24, 25-36, 36+ ay) performans analizi</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Faiz oranı bantlarına göre gecikme oranları</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 6. Gelişmiş risk metrikleri:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Vintage analizi: Açılış ayına göre performans takibi</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Migration analizi: Risk sınıfları arası geçişler simülasyonu</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Concentration risk: En büyük 10 kredinin portföy payı</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Early warning indicators: Risk artışı sinyalleri</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 7. Stres testleri uygulayın:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Senaryo 1: Faiz oranları %50 artarsa</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Senaryo 2: İşsizlik oranı %100 artarsa (gelir %20 azalır)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Senaryo 3: Teminat değerleri %30 düşerse</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Her senaryo için risk sınıfı değişimlerini hesaplayın</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 8. Özel analizler:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Optimal portföy ağırlıkları önerisi</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Risk-return optimizasyonu</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Yeni kredi verme kriterleri önerisi</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Mevcut portföyden çıkarılması gereken krediler</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 9. Regulatör raporları:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Basel kriterlerine göre sermaye gereksinimi</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - NPL (Non-Performing Loans) oranı</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Provision ihtiyacı hesaplama</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Portföy kalitesi trend analizi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 10. Kapsamlı özet raporu:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Executive summary</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Key risk indicators (KRI)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Action items ve öneriler</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Monitoring dashboard metrics</span></span></code></pre></div><hr><h2 id="📊-odev-4-egitim-kurumu-performans-analizi" tabindex="-1">📊 Ödev 4: Eğitim Kurumu Performans Analizi <a class="header-anchor" href="#📊-odev-4-egitim-kurumu-performans-analizi" aria-label="Permalink to &quot;📊 Ödev 4: Eğitim Kurumu Performans Analizi&quot;">​</a></h2><h3 id="gorev-acıklaması-3" tabindex="-1">Görev Açıklaması <a class="header-anchor" href="#gorev-acıklaması-3" aria-label="Permalink to &quot;Görev Açıklaması&quot;">​</a></h3><p>Bir üniversitenin akademik verilerini analiz edeceksiniz. Bu ödevde karmaşık string işlemleri, çok seviyeli indeksleme, ve eğitim metrikleri hesaplayacaksınız.</p><h3 id="yapmanız-gerekenler-3" tabindex="-1">Yapmanız Gerekenler <a class="header-anchor" href="#yapmanız-gerekenler-3" aria-label="Permalink to &quot;Yapmanız Gerekenler&quot;">​</a></h3><ol><li>Öğrenci, ders ve not verilerini oluşturun</li><li>Akademik performans metrikleri hesaplayan</li><li>Karmaşık string işlemleri yapın</li><li>Çok seviyeli analizler gerçekleştirin</li></ol><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pandas </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pd</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numpy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> np</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> string</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> random</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Pandas ayarları</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pd.set_option(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;display.max_columns&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">None</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pd.set_option(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;display.max_rows&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">15</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># BURADAN KODUNUZ BAŞLIYOR</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========================</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. ÜÇ FARKLI VERİ SETİ oluşturun:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># a) ÖĞRENCİLER (800 öğrenci):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Öğrenci_No (ÜNİV-FAK-BÖLÜM-NUMARA formatında), Ad, Soyad</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Doğum_Tarihi, Cinsiyet, Şehir, Burs_Durumu, Kayıt_Yılı</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Fakülte, Bölüm, Sınıf, E-posta (ad.soyad@universite.edu.tr)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># b) DERSLER (120 ders):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Ders_Kodu (FAK123 formatında), Ders_Adı, Kredi, Zorunlu_Seçmeli</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Fakülte, Bölüm, Dönem, Öğretim_Üyesi, Kontenjan</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># c) NOTLAR (5000 not kaydı):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Öğrenci_No, Ders_Kodu, Vize, Final, Büt, Devam_Durumu</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Akademik_Yıl, Dönem, Geçme_Durumu</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. Veri kalitesi sorunları ekleyin:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Öğrenci e-postalarında Türkçe karakter sorunları</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Ders adlarında tutarsız büyük/küçük harf kullanımı</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Bazı notlarda 0-100 dışı değerler</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Öğrenci numaralarında format hataları</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Eksik vize/final notları</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. String işlemleri ve veri temizleme:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - E-posta adreslerini standartlaştırın (türkçe karakter &gt; ingilizce)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Ders adlarını title case yapın</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Öğrenci numaralarını doğru formata getirin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Hatalı not değerlerini düzeltin veya çıkarın</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. Akademik metrikleri hesaplayın:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Her öğrenci için GPA (Grade Point Average) hesaplama</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Kredi ağırlıklı not ortalaması</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Dönem bazında başarı oranları</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Bölüm/fakülte genel başarı durumu</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 5. Karmaşık analizler:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Çok seviyeli indeks kullanarak (Fakülte &gt; Bölüm &gt; Sınıf) analiz</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Her dersin geçme/kalma oranları</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Öğretim üyesi bazında ders başarı karşılaştırması</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Burs durumunun akademik başarıya etkisi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 6. Trend analizleri:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Yıllar içinde bölüm başarı trendleri</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Dönem bazında not ortalaması değişimleri</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Mezuniyet süresi analizleri (normal sürede mezun olanlar)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Drop-out risk analizi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 7. İleri seviye metrikleri:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Student Success Index = (GPA * Devam_Oranı * Kredi_Yükü) / Dönem_Sayısı</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Department Efficiency Score = Mezun_Sayısı / (Öğretim_Üyesi_Sayısı * Ortalama_Süre)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Course Difficulty Index = (1 - Geçme_Oranı) * Ortalama_Çalışma_Saati</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Academic Risk Score = GPA durumu + devam + finansal durum bileşenleri</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 8. Özel raporlamalar:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Her bölüm için academic dashboard oluşturun</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Risk altındaki öğrencileri tespit edin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - En başarılı/başarısız dersleri listeleyin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Fakülte karşılaştırmalı performans raporu</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 9. String pattern analizleri:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - E-posta domain analizleri</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Öğrenci adlarında en sık kullanılan isimler</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Ders kodlarından fakülte/bölüm eşleştirmeleri</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Şehir verilerindeki yazım hatalarını düzeltme</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 10. Kapsamlı akademik rapor:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Üniversite genel durumu</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Bölüm bazında öneriler</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Risk altındaki alanlar</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - İyileştirme önerileri</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - KPI dashboard metrikleri</span></span></code></pre></div><hr><h2 id="📊-odev-5-entegre-veri-analizi-ve-ileri-seviye-pandas" tabindex="-1">📊 Ödev 5: Entegre Veri Analizi ve İleri Seviye Pandas <a class="header-anchor" href="#📊-odev-5-entegre-veri-analizi-ve-ileri-seviye-pandas" aria-label="Permalink to &quot;📊 Ödev 5: Entegre Veri Analizi ve İleri Seviye Pandas&quot;">​</a></h2><h3 id="gorev-acıklaması-4" tabindex="-1">Görev Açıklaması <a class="header-anchor" href="#gorev-acıklaması-4" aria-label="Permalink to &quot;Görev Açıklaması&quot;">​</a></h3><p>Bu son ödevde tüm öğrenilen Pandas tekniklerini kullanarak kapsamlı bir business intelligence projesi gerçekleştireceksiniz. Çok kaynaklı veri entegrasyonu, makine öğrenmesi hazırlığı ve otomatik rapor üretimi yapacaksınız.</p><h3 id="yapmanız-gerekenler-4" tabindex="-1">Yapmanız Gerekenler <a class="header-anchor" href="#yapmanız-gerekenler-4" aria-label="Permalink to &quot;Yapmanız Gerekenler&quot;">​</a></h3><ol><li>5 farklı veri kaynağını entegre edin</li><li>Makine öğrenmesi için veri hazırlayın</li><li>Otomatik rapor üretim sistemi kurun</li><li>Performance optimization uygulayın</li></ol><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pandas </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pd</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> numpy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> np</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> datetime </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> datetime, timedelta</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> warnings</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">warnings.filterwarnings(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ignore&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Pandas optimizasyon ayarları</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pd.set_option(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;display.max_columns&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">None</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pd.set_option(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;display.precision&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pd.set_option(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;mode.chained_assignment&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">None</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># BURADAN KODUNUZ BAŞLIYOR</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ========================</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. BEŞ FARKLI VERİ KAYNAĞINI OLUŞTURUN:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># a) SATIŞ VERİLERİ (2000 kayıt):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Transaction_ID, Müşteri_ID, Ürün_ID, Tarih, Miktar, Fiyat</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Kanal (Online/Mağaza/Telefon), Kampanya_ID, İndirim_Oranı</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># b) MÜŞTERİ DEMOGRAFİSİ (500 müşteri):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Müşteri_ID, Yaş, Cinsiyet, Şehir, Gelir_Seviyesi, Meslek</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Kayıt_Tarihi, Son_Aktivite, Tercih_Edilen_Kanal</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># c) ÜRÜN KATALOĞu (200 ürün):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Ürün_ID, Ürün_Adı, Kategori, Alt_Kategori, Marka, Maliyet</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Tedarikçi, Stok_Seviyesi, Minimum_Stok, Lead_Time</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># d) KAMPANYA VERİLERİ (50 kampanya):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Kampanya_ID, Kampanya_Adı, Başlangıç_Tarihi, Bitiş_Tarihi</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Hedef_Segment, Bütçe, Kanal, ROI_Hedefi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># e) WEB TRAFİK VERİLERİ (5000 oturum):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Session_ID, Müşteri_ID, Tarih, Sayfa_Görüntüleme, Süre</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Kaynak (Google/Facebook/Direct), Cihaz_Türü, Dönüşüm</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. VERİ KALİTESİ SORUNLARI EKLEYIN:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Her veri setinde %15-20 eksik veri</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Çakışan ID&#39;ler farklı formatlarda (string/int)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Tarih formatları farklı</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Tutarsız kategori isimlendirmeleri</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Outlier değerler</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. İLERİ SEVİYE VERİ TEMİZLEME:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Tüm veri tiplerini optimize edin (category, datetime, int32 vb.)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Memory usage&#39;ı minimize edin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Outlier detection ve treatment uygulayın</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Data quality report oluşturun</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. KARMAŞIK VERİ ENTEGRASYONu:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - 5 tabloyu master dataset&#39;e dönüştürün</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Join performansını optimize edin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Feature engineering uygulayın (RFM, CLV, churn risk vb.)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 5. İLERİ SEVİYE ANALİTİK METRİKLER:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Customer Lifetime Value (CLV) hesaplama</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - RFM analizi (Recency, Frequency, Monetary)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Market basket analizi</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Cohort analizi</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Churn prediction features</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Seasonality detection</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 6. MAKİNE ÖĞRENMESİ HAZIRLIĞI:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Categorical encoding (one-hot, label, target)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Feature scaling ve normalization</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Train/test/validation split</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Feature selection metrikleri</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Missing value imputation strategies</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 7. PERFORMANCE OPTİMİZASYONU:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Vectorization kullanarak apply() fonksiyonlarını optimize edin</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Memory efficient operations</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Chunk processing için büyük veri simülasyonu</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Query optimization</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 8. OTOMATİK RAPOR ÜRETİM SİSTEMİ:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Parametrik rapor fonksiyonları oluşturun</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Executive dashboard metrics</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Anomaly detection ve alerting</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Automated insights generation</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 9. İŞ ZEKASI METRİKLERİ:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - KPI tracking dashboard</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Trend analysis ve forecasting hazırlığı</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Segment profiling</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Channel attribution modeling</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#    - Campaign effectiveness measurement</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 10. KAPSAMLI FONKSİYON KÜTÜPHANESİ:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Reusable analysis functions</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Data validation functions  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Automated testing functions</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Export functions (Excel, CSV, JSON)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Error handling ve logging</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 11. FİNAL DELİVERABLES:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Complete data pipeline</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Business intelligence summary</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Model-ready dataset</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Performance benchmarks</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#     - Recommendations ve next steps</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ÖNEMLİ: Bu ödev, gerçek bir veri bilimi projesinin </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># tüm aşamalarını simüle etmektedir. Code quality,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># performance ve business value odaklı çözümler üretin.</span></span></code></pre></div><hr><h2 id="🎯-degerlendirme-kriterleri" tabindex="-1">🎯 Değerlendirme Kriterleri <a class="header-anchor" href="#🎯-degerlendirme-kriterleri" aria-label="Permalink to &quot;🎯 Değerlendirme Kriterleri&quot;">​</a></h2><p>Her ödev için aşağıdaki kriterler değerlendirilecektir:</p><h3 id="teknik-beceriler-60" tabindex="-1">Teknik Beceriler (60%) <a class="header-anchor" href="#teknik-beceriler-60" aria-label="Permalink to &quot;Teknik Beceriler (60%)&quot;">​</a></h3><ul><li>Pandas metodlarının doğru kullanımı</li><li>Code efficiency ve optimization</li><li>Veri kalitesi kontrolü</li><li>Error handling</li></ul><h3 id="analitik-dusunce-25" tabindex="-1">Analitik Düşünce (25%) <a class="header-anchor" href="#analitik-dusunce-25" aria-label="Permalink to &quot;Analitik Düşünce (25%)&quot;">​</a></h3><ul><li>Problem çözme yaklaşımı</li><li>İş değeri yaratan insights</li><li>Trend ve pattern tespiti</li><li>Actionable recommendations</li></ul><h3 id="kod-kalitesi-15" tabindex="-1">Kod Kalitesi (15%) <a class="header-anchor" href="#kod-kalitesi-15" aria-label="Permalink to &quot;Kod Kalitesi (15%)&quot;">​</a></h3><ul><li>Clean code principles</li><li>Documentation ve comments</li><li>Modular yapı</li><li>Reproducibility</li></ul><h3 id="bonus-puanlar" tabindex="-1">Bonus Puanlar <a class="header-anchor" href="#bonus-puanlar" aria-label="Permalink to &quot;Bonus Puanlar&quot;">​</a></h3><ul><li>Creative solutions (+5%)</li><li>Performance optimizations (+5%)</li><li>Advanced techniques (+5%)</li></ul><hr><h2 id="📝-teslim-formatı" tabindex="-1">📝 Teslim Formatı <a class="header-anchor" href="#📝-teslim-formatı" aria-label="Permalink to &quot;📝 Teslim Formatı&quot;">​</a></h2><p>Her ödev için şunları teslim edin:</p><ol><li><strong>Jupyter Notebook</strong> - Tüm kodlar ve analizler</li><li><strong>Veri dosyaları</strong> - Oluşturulan CSV/Excel dosyaları</li><li><strong>README.md</strong> - Proje açıklaması ve çalıştırma talimatları</li><li><strong>Summary Report</strong> - Ana bulgular ve öneriler</li></ol><p><strong>Başarılar! 🚀 Bu ödevler Pandas becerilerinizi bir üst seviyeye taşıyacak!</strong></p>`,53)]))}const D=a(e,[["render",p]]);export{A as __pageData,D as default};
