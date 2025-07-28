## Ödevler

### Ödev 1: Temel Grafikler (Kolay)
1. Aşağıdaki verileri kullanarak bir çizgi grafiği oluşturun:
   - x = [0, 1, 2, 3, 4, 5]
   - y1 = [0, 1, 4, 9, 16, 25] (x²)
   - y2 = [0, 1, 8, 27, 64, 125] (x³)
   
2. Grafik özelliklerini şu şekilde ayarlayın:
   - Başlık: "Polinom Fonksiyonları"
   - X ekseni etiketi: "X değerleri"
   - Y ekseni etiketi: "Y değerleri"
   - Legend ekleyin
   - Grid'i aktif edin

### Ödev 2: Histogram ve İstatistik (Orta)
1. NumPy kullanarak 1000 adet rastgele sayı üretin (normal dağılım, ortalama=50, standart sapma=15)
2. Bu verilerle bir histogram oluşturun (30 bin)
3. Histogram üzerine teorik normal dağılım eğrisini çizin
4. Ortalama, medyan ve standart sapma değerlerini grafik üzerinde gösterin
5. Grafik başlığını ve eksen etiketlerini ekleyin

### Ödev 3: Subplots ve Karşılaştırma (Orta)
1. 2x2 subplot düzeni oluşturun
2. Her subplot'ta farklı bir grafik türü gösterin:
   - Sol üst: Scatter plot (rastgele x, y verileri)
   - Sağ üst: Bar chart (5 kategori, rastgele değerler)
   - Sol alt: Pie chart (4 dilim)
   - Sağ alt: Histogram (rastgele veriler)
3. Her subplot için uygun başlık ve etiketler ekleyin

### Ödev 4: Zaman Serisi Analizi (Zor)
1. 2023 yılı için günlük tarih dizisi oluşturun
2. Aşağıdaki sentetik verileri oluşturun:
   - Satış verileri: trend + mevsimsel değişim + gürültü
   - Müşteri sayısı: satışlarla korelasyonlu
   - Kar marjı: rastgele dalgalanmalar
3. Bu üç seriyi ayrı subplot'larda gösterin
4. Hareketli ortalama (30 günlük) ekleyin
5. Yıllık toplam değerleri hesaplayıp gösterin

### Ödev 5: İleri Düzey Görselleştirme (Zor)
1. 3D surface plot oluşturun:
   - Z = sin(√(X² + Y²)) fonksiyonunu kullanın
   - X ve Y aralığı: -5 ile 5 arası
   - Colormap ve transparency ekleyin
2. Aynı figure'da yan yana 3D scatter plot ekleyin
3. Her iki grafik için uygun başlık ve eksen etiketleri ekleyin

### Ödev 6: Veri Analizi Projesi (Çok Zor)
Bir şirketin aylık performans raporunu görselleştirin:

1. **Veri Oluşturma:**
   - 12 ay için gelir, gider, kar verileri
   - Ürün kategorileri bazında satış verileri
   - Bölgesel satış dağılımı

2. **Görselleştirmeler:**
   - Ana dashboard (2x3 subplot)
   - Aylık gelir-gider karşılaştırması (çizgi + bar)
   - Ürün kategorileri pie chart
   - Bölgesel satış haritası (scatter plot)
   - Kar marjı trend analizi
   - Performans özet tablosu

3. **Özelleştirme:**
   - Profesyonel renk paleti
   - Interaktif elementler (annotationlar)
   - Logo ve başlık alanı
   - Export özelliği (PDF/PNG)

### Değerlendirme Kriterleri
- **Kod kalitesi:** Temiz, okunabilir kod
- **Görsel tasarım:** Renk uyumu, font seçimi, düzen
- **Teknik doğruluk:** Doğru grafik türü seçimi
- **Yaratıcılık:** Orijinal çözümler ve yaklaşımlar
- **Dokümantasyon:** Kod yorumları ve açıklamalar

### İpuçları
1. Her zaman `plt.tight_layout()` kullanın
2. Renk körü dostu paletler tercih edin
3. Grafik başlıklarını ve etiketlerini unutmayın
4. Veri kaynaklarını belirtin
5. Grafiklerinizi PDF olarak kaydedin: `plt.savefig('grafik.pdf', dpi=300, bbox_inches='tight')`

Bu ödevleri tamamladıktan sonra Matplotlib'de uzmanlaşmış olacaksınız. Her ödev bir sonraki seviyeye geçmeniz için gerekli becerileri kazandıracak şekilde tasarlanmıştır.