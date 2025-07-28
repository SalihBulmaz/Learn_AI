## Ödevler

### Ödev 1: Temel Seaborn Grafikleri (Kolay)
**Amaç:** Seaborn'un temel grafiklerini öğrenmek

**Görevler:**
1. Aşağıdaki veriyi kullanarak çeşitli grafikler oluşturun:
```python
# Veri oluşturma kodu
np.random.seed(42)
data = pd.DataFrame({
    'x': np.random.randn(200),
    'y': np.random.randn(200),
    'kategori': np.random.choice(['A', 'B', 'C'], 200),
    'değer': np.random.randint(1, 100, 200)
})
```

2. Oluşturacağınız grafikler:
   - Scatter plot (kategori ile renklendirilmiş)
   - Histogram (kategori bazlı)
   - Box plot
   - Bar plot (kategorilere göre ortalama değer)
   - Line plot (indeks bazlı)

**Değerlendirme:** Her grafik için uygun başlık ve etiketler, renk seçimi

### Ödev 2: İstatistiksel Görselleştirme (Orta)
**Amaç:** Seaborn'un istatistiksel özelliklerini kullanmak

**Görevler:**
1. Tips dataset'ini yükleyin (`sns.load_dataset('tips')`)
2. Aşağıdaki analizleri yapın:
   - Korelasyon heatmap'i oluşturun
   - total_bill ve tip arasında regresyon analizi
   - Günlere göre bahşiş dağılımını violin plot ile gösterin
   - Cinsiyet ve sigara içme durumuna göre bahşiş karşılaştırması
   - Pair plot oluşturun (numerik değişkenler için)

**Bonus:** Bahşiş yüzdesini hesaplayın ve analiz edin

### Ödev 3: Çok Değişkenli Analiz (Orta-Zor)
**Amaç:** FacetGrid ve gelişmiş görselleştirme tekniklerini öğrenmek

**Görevler:**
1. Iris dataset'i ile çalışın
2. Oluşturacağınız görselleştirmeler:
   - Tüm özellik çiftleri için scatter plot (FacetGrid kullanarak)
   - Türlere göre ayrılmış KDE plotları
   - Joint plot (sepal_length vs petal_length)
   - Clustermap (standartlaştırılmış veriler ile)

**İleri seviye:** PCA uygulayın ve sonuçları görselleştirin

### Ödev 4: Tema ve Stil Özelleştirme (Orta)
**Amaç:** Seaborn'un stil ve tema özelliklerini master etmek

**Görevler:**
1. Aynı veriyi 5 farklı stil ile görselleştirin
2. Özel renk paleti oluşturun ve kullanın
3. Subplots ile bir dashboard oluşturun
4. Annotation ve text ekleyin
5. Profesyonel görünümlü bir rapor formatı hazırlayın

**Teknik gereksinimler:**
- En az 3 farklı seaborn stili
- Özel renk paleti (hex kodları ile)
- Grid layout (2x3 veya 3x2)
- Her subplot için farklı grafik türü

### Ödev 5: Veri Keşif Projesi (Zor)
**Amaç:** Gerçek bir veri seti ile kapsamlı EDA (Exploratory Data Analysis)

**Senaryo:** Bir e-ticaret şirketinin müşteri verilerini analiz edin

**Veri oluşturma (sentetik):**
```python
np.random.seed(42)
n_customers = 1000

customer_data = pd.DataFrame({
    'yaş': np.random.randint(18, 70, n_customers),
    'gelir': np.random.lognormal(10, 0.5, n_customers),
    'harcama': np.random.gamma(2, 500, n_customers),
    'şehir': np.random.choice(['İstanbul', 'Ankara', 'İzmir', 'Bursa'], n_customers),
    'cinsiyet': np.random.choice(['Erkek', 'Kadın'], n_customers),
    'eğitim': np.random.choice(['Lise', 'Üniversite', 'Lisansüstü'], n_customers),
    'müşteri_segmenti': np.random.choice(['Bronze', 'Silver', 'Gold'], n_customers)
})
```

**Analiz gereksinimleri:**
1. **Demografik Analiz:**
   - Yaş dağılımı
   - Şehir bazlı analiz
   - Cinsiyet-eğitim crosstab

2. **Finansal Analiz:**
   - Gelir-harcama ilişkisi
   - Segment bazlı karşılaştırma
   - Outlier detection

3. **Segmentasyon:**
   - Müşteri segmentlerinin özellikleri
   - RFM analizi (mock)
   - Clustering görselleştirmesi

4. **Dashboard:**
   - 3x3 subplot grid
   - Executive summary
   - Actionable insights

### Ödev 6: Zaman Serisi Görselleştirme (Zor)
**Amaç:** Zaman bazlı verileri seaborn ile analiz etmek

**Görevler:**
1. 2 yıllık günlük satış verisi oluşturun (trend + mevsimsellik + gürültü)
2. Oluşturacağınız analizler:
   - Zaman serisi decomposition görselleştirmesi
   - Hareketli ortalamalar
   - Mevsimsel paternler (aylık, haftalık)
   - Trend analizi
   - Anomali detection
   - Forecasting görselleştirmesi (basit)

**Teknik zorluklar:**
- Tarih formatting
- Multiple y-axis
- Annotation ile önemli olayları işaretleme
- İnteraktif elementler

### Ödev 7: Karşılaştırmalı Analiz Projesi (Çok Zor)
**Amaç:** İki farklı veri setini karşılaştırmalı olarak analiz etmek

**Senaryo:** A/B test sonuçlarını analiz edin

**Veri setleri:**
- Kontrol grubu (mevcut sistem)
- Test grubu (yeni sistem)
- Metriker: conversion rate, time spent, revenue

**Analiz gereksinimleri:**
1. **İstatistiksel Testler:**
   - T-test sonuçlarını görselleştirin
   - Effect size hesaplaması
   - Confidence intervals

2. **Segment Analizleri:**
   - Yaş gruplarına göre
   - Cihaz türüne göre
   - Coğrafi bölgelere göre

3. **Zaman Analizi:**
   - Günlük trend karşılaştırması
   - Hafta içi/hafta sonu etkileri
   - Learning curve analizi

4. **İş Etkisi:**
   - Revenue impact
   - ROI calculation
   - Risk assessment

### Değerlendirme Kriterleri

**Teknik Beceriler (40%):**
- Doğru grafik türü seçimi
- Seaborn fonksiyonlarının etkin kullanımı
- Kod kalitesi ve organizasyon
- Hata yakalama ve debugging

**Görsel Tasarım (30%):**
- Renk paleti seçimi
- Layout ve composition
- Typography ve labeling
- Professional appearance

**Analitik Düşünce (20%):**
- İnsight kalitesi
- Statistical interpretation
- Business relevance
- Actionable recommendations

**Dokümantasyon (10%):**
- Code comments
- Markdown açıklamaları
- Methodology explanation
- Limitations ve assumptions

### İpuçları ve Best Practices

1. **Veri Hazırlığı:**
   - Her zaman veriyi ilk inceleyin (`info()`, `describe()`)
   - Missing values'ları kontrol edin
   - Outlier'ları tanımlayın

2. **Grafik Seçimi:**
   - Continuous vs categorical variables
   - Sample size considerations
   - Distribution assumptions

3. **Performance:**
   - Large datasets için sampling
   - Memory management
   - Vectorized operations

4. **Interpretability:**
   - Her grafik bir story anlatmalı
   - Axes labels ve titles
   - Color coding consistency

5. **Export ve Sharing:**
   ```python
   plt.savefig('analysis.png', dpi=300, bbox_inches='tight')
   plt.savefig('analysis.pdf', bbox_inches='tight')
   ```

### Seaborn Cheat Sheet

#### En Sık Kullanılan Fonksiyonlar:
```python
# Distribution plots
sns.histplot(data, x='col')
sns.kdeplot(data, x='col')
sns.ecdfplot(data, x='col')

# Categorical plots
sns.boxplot(data, x='cat', y='num')
sns.violinplot(data, x='cat', y='num')
sns.stripplot(data, x='cat', y='num')
sns.swarmplot(data, x='cat', y='num')
sns.barplot(data, x='cat', y='num')
sns.pointplot(data, x='cat', y='num')
sns.countplot(data, x='cat')

# Relational plots
sns.scatterplot(data, x='x', y='y')
sns.lineplot(data, x='x', y='y')

# Regression plots
sns.regplot(data, x='x', y='y')
sns.residplot(data, x='x', y='y')

# Matrix plots
sns.heatmap(data.corr())
sns.clustermap(data)

# Multi-plot grids
sns.pairplot(data)
sns.jointplot(data, x='x', y='y')
sns.FacetGrid(data, col='cat')
```

#### Özelleştirme Parametreleri:
```python
# Color
palette='viridis', hue='category', color='red'

# Size and style
figsize=(10,6), s=50, linewidth=2, alpha=0.7

# Statistical
ci=95, estimator=np.median, order=2

# Layout
col_wrap=3, height=4, aspect=1.2
```

### Sonuç

Seaborn, Python ekosisteminde veri görselleştirme için vazgeçilmez bir araçtır. Matplotlib'in gücünü basit ve elegante bir API ile birleştirerek, veri bilimcilerin ve analistlerin hızlı ve etkili görselleştirmeler oluşturmasını sağlar.

**Seaborn'u Seçmeniz Gereken Durumlar:**
- İstatistiksel veri analizi
- Pandas DataFrame'leri ile çalışma
- Hızlı exploratory data analysis
- Publication-ready grafikler
- Minimal kod ile professional görünüm

**Matplotlib'i Seçmeniz Gereken Durumlar:**
- Tam kontrol ihtiyacı
- Özel visualizations
- Real-time plotting
- Embedded applications
- Complex animations

Bu rehber tamamlandıktan sonra, Seaborn ile profesyonel seviyede veri görselleştirmeleri oluşturabilecek, karmaşık analizleri basit kodlarla gerçekleştirebilecek ve veri hikayelerinizi etkili bir şekilde anlatabileceksiniz.

**Önemli Hatırlatmalar:**
1. Her zaman veriyi anlamaya odaklanın
2. Görselleştirmenin amacını netleştirin
3. Hedef kitlenizi göz önünde bulundurun
4. Basitlik ve açıklık her zaman karmaşıklıktan iyidir
5. Sürekli pratik yapın ve yeni teknikleri deneyin

Bu ödevleri tamamladıktan sonra, veri görselleştirme konusunda uzman seviyesine ulaşacak ve kariyerinizde büyük avantaj sağlayacaksınız.