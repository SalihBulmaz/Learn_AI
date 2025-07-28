# Seaborn Kapsamlı Eğitim Rehberi

## İçindekiler
1. [Giriş ve Kurulum](#giriş-ve-kurulum)
2. [Seaborn vs Matplotlib](#seaborn-vs-matplotlib)
3. [Temel Grafik Türleri](#temel-grafik-türleri)
4. [İstatistiksel Görselleştirmeler](#i̇statistiksel-görselleştirmeler)
5. [Tema ve Stil Yönetimi](#tema-ve-stil-yönetimi)
6. [Çok Değişkenli Analiz](#çok-değişkenli-analiz)
7. [İleri Düzey Özellikler](#i̇leri-düzey-özellikler)
8. [Gerçek Veri Analizleri](#gerçek-veri-analizleri)
9. [Ödevler](#ödevler)

## Giriş ve Kurulum

Seaborn, Matplotlib üzerine inşa edilmiş, istatistiksel veri görselleştirme için özel olarak tasarlanmış bir Python kütüphanesidir. Michael Waskom tarafından geliştirilmiş ve özellikle veri bilimi toplulukları tarafından yaygın olarak kullanılmaktadır.

### Kurulum
```bash
pip install seaborn pandas numpy matplotlib
```

### Temel İmport
```python
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Seaborn stilini aktif et
sns.set_style("whitegrid")
```

### Seaborn'un Avantajları
- **İstatistiksel odaklı:** Otomatik istatistiksel hesaplamalar
- **Güzel varsayılan stiller:** Minimal kod ile profesyonel görünüm
- **Pandas entegrasyonu:** DataFrame'lerle doğrudan çalışma
- **Gelişmiş color palettes:** Bilimsel standartlara uygun renk seçimi
- **Kompleks görselleştirmeler:** Faceting, multi-level grouping

## Seaborn vs Matplotlib

### Matplotlib Yaklaşımı
```python
# Matplotlib ile grup bazlı bar chart
import matplotlib.pyplot as plt
import numpy as np

categories = ['A', 'B', 'C', 'D']
values1 = [20, 35, 30, 35]
values2 = [25, 30, 15, 30]

x = np.arange(len(categories))
width = 0.35

fig, ax = plt.subplots()
bars1 = ax.bar(x - width/2, values1, width, label='Grup 1')
bars2 = ax.bar(x + width/2, values2, width, label='Grup 2')

ax.set_xlabel('Kategoriler')
ax.set_ylabel('Değerler')
ax.set_title('Grup Karşılaştırması')
ax.set_xticks(x)
ax.set_xticklabels(categories)
ax.legend()
plt.show()
```

### Seaborn Yaklaşımı
```python
# Seaborn ile aynı grafik
import seaborn as sns
import pandas as pd

# Veriyi long format'ta hazırla
data = pd.DataFrame({
    'Kategori': ['A', 'B', 'C', 'D'] * 2,
    'Değer': [20, 35, 30, 35, 25, 30, 15, 30],
    'Grup': ['Grup 1'] * 4 + ['Grup 2'] * 4
})

plt.figure(figsize=(8, 6))
sns.barplot(data=data, x='Kategori', y='Değer', hue='Grup')
plt.title('Grup Karşılaştırması')
plt.show()
```

## Temel Grafik Türleri

### 1. Scatter Plot - scatterplot()
```python
# Örnek veri seti oluşturma
np.random.seed(42)
data = pd.DataFrame({
    'x': np.random.randn(100),
    'y': np.random.randn(100),
    'kategori': np.random.choice(['A', 'B', 'C'], 100),
    'boyut': np.random.randint(20, 200, 100)
})

# Temel scatter plot
plt.figure(figsize=(12, 4))

plt.subplot(1, 3, 1)
sns.scatterplot(data=data, x='x', y='y')
plt.title('Temel Scatter Plot')

plt.subplot(1, 3, 2)
sns.scatterplot(data=data, x='x', y='y', hue='kategori')
plt.title('Kategoriye Göre Renklendirilmiş')

plt.subplot(1, 3, 3)
sns.scatterplot(data=data, x='x', y='y', hue='kategori', size='boyut')
plt.title('Renk + Boyut')

plt.tight_layout()
plt.show()
```

### 2. Line Plot - lineplot()
```python
# Zaman serisi verisi
dates = pd.date_range('2023-01-01', periods=365)
np.random.seed(42)

# Trend + mevsimsel + gürültü
trend = np.linspace(100, 150, 365)
seasonal = 10 * np.sin(2 * np.pi * np.arange(365) / 365.25 * 4)  # 4 mevsim
noise = np.random.randn(365) * 5

timeseries_data = pd.DataFrame({
    'tarih': dates,
    'değer': trend + seasonal + noise,
    'kategori': np.random.choice(['Ürün A', 'Ürün B'], 365)
})

plt.figure(figsize=(15, 8))

# Tek seri
plt.subplot(2, 2, 1)
single_series = timeseries_data[timeseries_data['kategori'] == 'Ürün A'].head(100)
sns.lineplot(data=single_series, x='tarih', y='değer')
plt.title('Tek Zaman Serisi')
plt.xticks(rotation=45)

# Çoklu seri
plt.subplot(2, 2, 2)
multi_series = timeseries_data.head(200)
sns.lineplot(data=multi_series, x='tarih', y='değer', hue='kategori')
plt.title('Çoklu Zaman Serisi')
plt.xticks(rotation=45)

# Güven aralığı ile
plt.subplot(2, 2, 3)
sns.lineplot(data=multi_series, x='tarih', y='değer', hue='kategori', ci=95)
plt.title('Güven Aralığı ile')
plt.xticks(rotation=45)

# Estimator değiştirme
plt.subplot(2, 2, 4)
sns.lineplot(data=multi_series, x='tarih', y='değer', hue='kategori', 
             estimator=np.median, ci=None)
plt.title('Medyan Estimator')
plt.xticks(rotation=45)

plt.tight_layout()
plt.show()
```

### 3. Bar Plot - barplot()
```python
# Kategorik veri
sales_data = pd.DataFrame({
    'ay': ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'] * 3,
    'satış': [150, 180, 220, 200, 250, 280, 
              160, 190, 210, 190, 240, 270,
              140, 170, 200, 180, 230, 260],
    'bölge': ['Kuzey'] * 6 + ['Güney'] * 6 + ['Doğu'] * 6,
    'ürün': (['A'] * 3 + ['B'] * 3) * 3
})

plt.figure(figsize=(15, 10))

# Temel bar plot
plt.subplot(2, 3, 1)
sns.barplot(data=sales_data, x='ay', y='satış')
plt.title('Aylık Satış Ortalaması')
plt.xticks(rotation=45)

# Kategoriye göre gruplandırılmış
plt.subplot(2, 3, 2)
sns.barplot(data=sales_data, x='ay', y='satış', hue='bölge')
plt.title('Bölgeye Göre Aylık Satış')
plt.xticks(rotation=45)

# Hata çubukları ile
plt.subplot(2, 3, 3)
sns.barplot(data=sales_data, x='bölge', y='satış', ci=95, capsize=0.1)
plt.title('Bölge Satış (Güven Aralığı)')

# Yatay bar plot
plt.subplot(2, 3, 4)
sns.barplot(data=sales_data, y='bölge', x='satış', orient='h')
plt.title('Yatay Bar Plot')

# Estimator değiştirme
plt.subplot(2, 3, 5)
sns.barplot(data=sales_data, x='bölge', y='satış', estimator=np.median)
plt.title('Medyan Değerler')

# Çoklu kategoriler
plt.subplot(2, 3, 6)
sns.barplot(data=sales_data, x='bölge', y='satış', hue='ürün')
plt.title('Bölge ve Ürün Bazlı')

plt.tight_layout()
plt.show()
```

### 4. Histogram - histplot()
```python
# Çoklu dağılım verisi
np.random.seed(42)
distribution_data = pd.DataFrame({
    'normal': np.random.normal(50, 15, 1000),
    'uniform': np.random.uniform(0, 100, 1000),
    'exponential': np.random.exponential(20, 1000),
    'bimodal': np.concatenate([np.random.normal(30, 8, 500), 
                              np.random.normal(70, 8, 500)])
})

plt.figure(figsize=(15, 12))

# Temel histogram
plt.subplot(3, 3, 1)
sns.histplot(distribution_data['normal'], bins=30)
plt.title('Normal Dağılım')

# KDE ile birlikte
plt.subplot(3, 3, 2)
sns.histplot(distribution_data['normal'], bins=30, kde=True)
plt.title('Histogram + KDE')

# Çoklu dağılım
plt.subplot(3, 3, 3)
for col in distribution_data.columns:
    sns.histplot(distribution_data[col], alpha=0.5, label=col, stat='density')
plt.legend()
plt.title('Çoklu Dağılım')

# Bivariate histogram
plt.subplot(3, 3, 4)
x = np.random.randn(500)
y = x + np.random.randn(500) * 0.5
sns.histplot(x=x, y=y)
plt.title('2D Histogram')

# Farklı stat türleri
plt.subplot(3, 3, 5)
sns.histplot(distribution_data['normal'], stat='count', alpha=0.7, label='Count')
plt.title('Count Statistiği')

plt.subplot(3, 3, 6)
sns.histplot(distribution_data['normal'], stat='probability', alpha=0.7)
plt.title('Probability Statistiği')

# Element türleri
plt.subplot(3, 3, 7)
sns.histplot(distribution_data['normal'], element='step')
plt.title('Step Element')

plt.subplot(3, 3, 8)
sns.histplot(distribution_data['normal'], element='poly')
plt.title('Poly Element')

# Çok değişkenli
plt.subplot(3, 3, 9)
sample_data = pd.DataFrame({
    'değer': np.concatenate([distribution_data['normal'][:200], 
                            distribution_data['exponential'][:200]]),
    'grup': ['A'] * 200 + ['B'] * 200
})
sns.histplot(data=sample_data, x='değer', hue='grup', multiple='stack')
plt.title('Gruplu Histogram')

plt.tight_layout()
plt.show()
```

## İstatistiksel Görselleştirmeler

### 1. Box Plot - boxplot()
```python
# Örnek veri seti
np.random.seed(42)
box_data = pd.DataFrame({
    'değer': np.concatenate([
        np.random.normal(100, 15, 100),  # Normal
        np.random.normal(120, 20, 100),  # Yüksek ortalama
        np.random.gamma(2, 10, 100) + 80,  # Sağa çarpık
        np.random.beta(0.5, 0.5, 100) * 80 + 60  # U şeklinde
    ]),
    'grup': ['Normal', 'Yüksek', 'Çarpık', 'U-şekil'] * 100,
    'kategori': np.random.choice(['X', 'Y'], 400)
})

plt.figure(figsize=(15, 10))

# Temel box plot
plt.subplot(2, 3, 1)
sns.boxplot(data=box_data, y='değer')
plt.title('Temel Box Plot')

# Kategoriye göre
plt.subplot(2, 3, 2)
sns.boxplot(data=box_data, x='grup', y='değer')
plt.title('Gruplara Göre')
plt.xticks(rotation=45)

# Alt kategoriler
plt.subplot(2, 3, 3)
sns.boxplot(data=box_data, x='grup', y='değer', hue='kategori')
plt.title('Alt Kategoriler')
plt.xticks(rotation=45)

# Violin plot
plt.subplot(2, 3, 4)
sns.violinplot(data=box_data, x='grup', y='değer')
plt.title('Violin Plot')
plt.xticks(rotation=45)

# Box + Strip
plt.subplot(2, 3, 5)
sns.boxplot(data=box_data, x='grup', y='değer', color='lightblue')
sns.stripplot(data=box_data, x='grup', y='değer', color='red', alpha=0.5)
plt.title('Box + Strip Plot')
plt.xticks(rotation=45)

# Swarm plot
plt.subplot(2, 3, 6)
sample_data = box_data.sample(200)  # Daha az nokta için
sns.swarmplot(data=sample_data, x='grup', y='değer')
plt.title('Swarm Plot')
plt.xticks(rotation=45)

plt.tight_layout()
plt.show()
```

### 2. Correlation Heatmap - heatmap()
```python
# Korelasyon analizi için veri
np.random.seed(42)
n_samples = 500

# Birbiriyle ilişkili değişkenler oluştur
x1 = np.random.randn(n_samples)
x2 = x1 + np.random.randn(n_samples) * 0.5  # x1 ile pozitif korelasyon
x3 = -x1 + np.random.randn(n_samples) * 0.3  # x1 ile negatif korelasyon
x4 = np.random.randn(n_samples)  # Bağımsız
x5 = x2 + x3 + np.random.randn(n_samples) * 0.2  # x2 ve x3 ile ilişkili

correlation_data = pd.DataFrame({
    'Gelir': x1 * 10000 + 50000,
    'Eğitim': x2 * 2 + 16,
    'Yaş': -x3 * 5 + 35,
    'Sağlık': x4 * 20 + 100,
    'Mutluluk': x5 * 15 + 75
})

plt.figure(figsize=(15, 12))

# Temel korelasyon heatmap
plt.subplot(2, 3, 1)
corr_matrix = correlation_data.corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Temel Korelasyon Matrix')

# Farklı color map
plt.subplot(2, 3, 2)
sns.heatmap(corr_matrix, annot=True, cmap='RdYlBu_r', center=0, 
            square=True, linewidths=0.5)
plt.title('Farklı Renk Paleti')

# Sadece alt üçgen
plt.subplot(2, 3, 3)
mask = np.triu(np.ones_like(corr_matrix, dtype=bool))
sns.heatmap(corr_matrix, mask=mask, annot=True, cmap='viridis', center=0)
plt.title('Alt Üçgen Matrix')

# Clustering ile
plt.subplot(2, 3, 4)
from scipy.cluster.hierarchy import linkage
from scipy.spatial.distance import squareform

# Mesafe matrisini korelasyondan hesapla
distances = 1 - np.abs(corr_matrix)
linkage_matrix = linkage(squareform(distances), method='average')
sns.clustermap(corr_matrix, annot=True, cmap='coolwarm', center=0,
               row_linkage=linkage_matrix, col_linkage=linkage_matrix,
               figsize=(8, 6))
plt.title('Clustering ile Heatmap')

# Özel annotation
plt.subplot(2, 3, 5)
# Korelasyon değerlerini özel formatta göster
annot_matrix = corr_matrix.copy()
for i in range(len(annot_matrix)):
    for j in range(len(annot_matrix.columns)):
        val = annot_matrix.iloc[i, j]
        if abs(val) > 0.7:
            annot_matrix.iloc[i, j] = f"{val:.2f}**"
        elif abs(val) > 0.5:
            annot_matrix.iloc[i, j] = f"{val:.2f}*"
        else:
            annot_matrix.iloc[i, j] = f"{val:.2f}"

sns.heatmap(corr_matrix, annot=annot_matrix, fmt='', cmap='coolwarm', center=0)
plt.title('İstatistiksel Anlamlılık')

# Pivot table heatmap
plt.subplot(2, 3, 6)
# Kategorik veri ekle
correlation_data['Gelir_Kategori'] = pd.cut(correlation_data['Gelir'], 
                                          bins=3, labels=['Düşük', 'Orta', 'Yüksek'])
correlation_data['Eğitim_Kategori'] = pd.cut(correlation_data['Eğitim'], 
                                           bins=3, labels=['Lise', 'Üniversite', 'Lisansüstü'])

pivot_table = correlation_data.groupby(['Gelir_Kategori', 'Eğitim_Kategori'])['Mutluluk'].mean().unstack()
sns.heatmap(pivot_table, annot=True, fmt='.1f', cmap='YlOrRd')
plt.title('Kategorik Pivot Heatmap')

plt.tight_layout()
plt.show()
```

### 3. Regression Plots - regplot(), lmplot()
```python
# Regresyon analizi için veri
np.random.seed(42)
n = 200
x = np.random.randn(n)
y_linear = 2 * x + 3 + np.random.randn(n) * 0.8
y_quad = x**2 + x + np.random.randn(n) * 0.5
y_exp = np.exp(x/2) + np.random.randn(n) * 0.3

regression_data = pd.DataFrame({
    'x': np.tile(x, 3),
    'y': np.concatenate([y_linear, y_quad, y_exp]),
    'tip': ['Linear'] * n + ['Quadratic'] * n + ['Exponential'] * n,
    'kategori': np.random.choice(['A', 'B'], n * 3)
})

plt.figure(figsize=(15, 12))

# Temel regresyon
plt.subplot(3, 3, 1)
linear_data = regression_data[regression_data['tip'] == 'Linear']
sns.regplot(data=linear_data, x='x', y='y')
plt.title('Linear Regresyon')

# Quadratic regresyon
plt.subplot(3, 3, 2)
quad_data = regression_data[regression_data['tip'] == 'Quadratic']
sns.regplot(data=quad_data, x='x', y='y', order=2)
plt.title('Quadratic Regresyon')

# Robust regresyon
plt.subplot(3, 3, 3)
sns.regplot(data=linear_data, x='x', y='y', robust=True)
plt.title('Robust Regresyon')

# lmplot ile kategorik
plt.subplot(3, 3, 4)
sample_data = linear_data.sample(100)
g = sns.lmplot(data=sample_data, x='x', y='y', hue='kategori', 
               height=4, aspect=1, scatter_kws={'alpha': 0.6})
plt.title('Kategorik Regresyon')

# Residual plot
plt.subplot(3, 3, 5)
sns.residplot(data=linear_data, x='x', y='y')
plt.title('Residual Plot')

# Çoklu regresyon
plt.subplot(3, 3, 6)
# 3D verisi düzleştir
multi_data = pd.DataFrame({
    'x1': np.random.randn(100),
    'x2': np.random.randn(100)
})
multi_data['y'] = multi_data['x1'] * 2 + multi_data['x2'] * 1.5 + np.random.randn(100) * 0.5

sns.regplot(data=multi_data, x='x1', y='y')
plt.title('X1 vs Y')

plt.subplot(3, 3, 7)
sns.regplot(data=multi_data, x='x2', y='y')
plt.title('X2 vs Y')

# Logaritmik regresyon
plt.subplot(3, 3, 8)
log_data = pd.DataFrame({
    'x': np.linspace(0.1, 5, 100),
})
log_data['y'] = np.log(log_data['x']) + np.random.randn(100) * 0.2
sns.regplot(data=log_data, x='x', y='y', logx=True)
plt.title('Logaritmik X')

# Güven aralığı yok
plt.subplot(3, 3, 9)
sns.regplot(data=linear_data, x='x', y='y', ci=None, 
           scatter_kws={'alpha': 0.3}, line_kws={'color': 'red'})
plt.title('Güven Aralığı Yok')

plt.tight_layout()
plt.show()
```

## Tema ve Stil Yönetimi

### 1. Seaborn Stilleri
```python
# Farklı stil örnekleri
styles = ['darkgrid', 'whitegrid', 'dark', 'white', 'ticks']
data = pd.DataFrame({
    'x': np.random.randn(100),
    'y': np.random.randn(100),
    'kategori': np.random.choice(['A', 'B', 'C'], 100)
})

fig, axes = plt.subplots(2, 3, figsize=(18, 12))
axes = axes.ravel()

for i, style in enumerate(styles):
    sns.set_style(style)
    plt.sca(axes[i])
    sns.scatterplot(data=data, x='x', y='y', hue='kategori')
    plt.title(f'Style: {style}')

# Özel stil
sns.set_style("whitegrid", {
    "axes.linewidth": 2,
    "grid.linewidth": 1,
    "grid.color": "lightblue"
})
plt.sca(axes[5])
sns.scatterplot(data=data, x='x', y='y', hue='kategori')
plt.title('Özel Stil')

plt.tight_layout()
plt.show()

# Stil sıfırla
sns.set_style("whitegrid")
```

### 2. Renk Paletleri
```python
# Renk paleti örnekleri
plt.figure(figsize=(15, 12))

# Qualitative paletler
plt.subplot(3, 4, 1)
sns.barplot(x=['A', 'B', 'C', 'D'], y=[1, 2, 3, 2], palette='Set1')
plt.title('Set1 Paleti')

plt.subplot(3, 4, 2)
sns.barplot(x=['A', 'B', 'C', 'D'], y=[1, 2, 3, 2], palette='Set2')
plt.title('Set2 Paleti')

plt.subplot(3, 4, 3)
sns.barplot(x=['A', 'B', 'C', 'D'], y=[1, 2, 3, 2], palette='tab10')
plt.title('Tab10 Paleti')

# Sequential paletler
plt.subplot(3, 4, 4)
sns.barplot(x=['A', 'B', 'C', 'D'], y=[1, 2, 3, 4], palette='Blues')
plt.title('Blues Paleti')

plt.subplot(3, 4, 5)
sns.barplot(x=['A', 'B', 'C', 'D'], y=[1, 2, 3, 4], palette='viridis')
plt.title('Viridis Paleti')

plt.subplot(3, 4, 6)
sns.barplot(x=['A', 'B', 'C', 'D'], y=[1, 2, 3, 4], palette='plasma')
plt.title('Plasma Paleti')

# Diverging paletler
plt.subplot(3, 4, 7)
sns.barplot(x=['A', 'B', 'C', 'D'], y=[-2, -1, 1, 2], palette='RdBu')
plt.title('RdBu Paleti')

plt.subplot(3, 4, 8)
sns.barplot(x=['A', 'B', 'C', 'D'], y=[-2, -1, 1, 2], palette='coolwarm')
plt.title('Coolwarm Paleti')

# Özel paletler
plt.subplot(3, 4, 9)
custom_palette = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"]
sns.barplot(x=['A', 'B', 'C', 'D'], y=[1, 2, 3, 2], palette=custom_palette)
plt.title('Özel Renk Paleti')

# Palette generator
plt.subplot(3, 4, 10)
sns.barplot(x=['A', 'B', 'C', 'D'], y=[1, 2, 3, 2], 
           palette=sns.color_palette("husl", 4))
plt.title('HUSL Paleti')

plt.subplot(3, 4, 11)
sns.barplot(x=['A', 'B', 'C', 'D'], y=[1, 2, 3, 2], 
           palette=sns.color_palette("light:b", 4))
plt.title('Light Blue Paleti')

plt.subplot(3, 4, 12)
sns.barplot(x=['A', 'B', 'C', 'D'], y=[1, 2, 3, 2], 
           palette=sns.color_palette("dark:salmon_r", 4))
plt.title('Dark Salmon Paleti')

plt.tight_layout()
plt.show()

# Renk paleti görselleştirme
plt.figure(figsize=(12, 8))
palettes = ['Set1', 'viridis', 'coolwarm', 'husl']
for i, pal in enumerate(palettes):
    plt.subplot(2, 2, i+1)
    sns.palplot(sns.color_palette(pal, 8))
    plt.title(f'{pal} Paleti')

plt.tight_layout()
plt.show()
```

## Çok Değişkenli Analiz

### 1. Pair Plot - pairplot()
```python
# Çok değişkenli veri seti
np.random.seed(42)
n = 200

# Birbiriyle ilişkili değişkenler
factor1 = np.random.randn(n)
factor2 = np.random.randn(n)

multivariate_data = pd.DataFrame({
    'Boyut': factor1 * 20 + 170 + np.random.randn(n) * 5,
    'Kilo': factor1 * 15 + 70 + np.random.randn(n) * 8,
    'Yaş': np.random.randint(18, 65, n),
    'Gelir': factor2 * 20000 + 50000 + np.random.randn(n) * 10000,
    'Eğitim': factor2 * 3 + 16 + np.random.randn(n) * 2,
    'Cinsiyet': np.random.choice(['Erkek', 'Kadın'], n),
    'Şehir': np.random.choice(['İstanbul', 'Ankara', 'İzmir'], n)
})

# Temel pair plot
g = sns.pairplot(multivariate_data[['Boyut', 'Kilo', 'Yaş', 'Gelir']])
g.fig.suptitle('Temel Pair Plot', y=1.02)
plt.show()

# Kategorik değişkenle renklendirilmiş
g = sns.pairplot(multivariate_data[['Boyut', 'Kilo', 'Yaş', 'Gelir', 'Cinsiyet']], 
                hue='Cinsiyet', diag_kind='hist')
g.fig.suptitle('Cinsiyete Göre Pair Plot', y=1.02)
plt.show()

# Farklı plot türleri
g = sns.pairplot(multivariate_data[['Boyut', 'Kilo', 'Yaş', 'Gelir', 'Cinsiyet']], 
                hue='Cinsiyet', diag_kind='kde', kind='reg')
g.fig.suptitle('KDE + Regresyon Pair Plot', y=1.02)
plt.show()
```

### 2. Facet Grid - FacetGrid()
```python
# Facet analizi için veri
np.random.seed(42)
facet_data = pd.DataFrame({
    'x': np.random.randn(400),
    'y': np.random.randn(400) * 2 + 1,
    'kategori': np.random.choice(['A', 'B', 'C', 'D'], 400),
    'grup': np.random.choice(['Grup1', 'Grup2'], 400),
    'zaman': np.random.choice(['2021', '2022', '2023'], 400)
})

# Temel FacetGrid
g = sns.FacetGrid(facet_data, col='kategori', hue='grup', 
                  col_wrap=2, height=4)
g.map(sns.scatterplot, 'x', 'y', alpha=0.7)
g.add_legend()
g.fig.suptitle('Kategori Bazlı Facet Grid', y=1.02)
plt.show()

# Satır ve sütun
g = sns.FacetGrid(facet_data, row='grup', col='zaman', 
                  height=4, aspect=1.2)
g.map(sns.histplot, 'x', alpha=0.7)
g.fig.suptitle('Grup ve Zaman Bazlı Facet', y=1.02)
plt.show()

# Özel fonksiyon ile
def custom_plot(x, y, **kwargs):
    plt.scatter(x, y, **kwargs)
    # Trend çizgisi ekle
    z = np.polyfit(x, y, 1)
    p = np.poly1d(z)
    plt.plot(x, p(x), "r--", alpha=0.8)

g = sns.FacetGrid(facet_data, col='kategori', col_wrap=2, height=4)
g.map(custom_plot, 'x', 'y', alpha=0.6)
g.fig.suptitle('Özel Fonksiyon ile Facet', y=1.02)
plt.show()
```

### 3. Clustermap
```python
# Clustering analizi için veri
np.random.seed(42)
cluster_data = pd.DataFrame(
    np.random.randn(50, 12),
    columns=[f'Gen_{i+1}' for i in range(12)],
    index=[f'Örnek_{i+1}' for i in range(50)]
)

# Bazı paternler ekle
cluster_data.iloc[:15, :4] += 2  # İlk grup
cluster_data.iloc[15:30, 4:8] += 2  # İkinci grup
cluster_data.iloc[30:, 8:] += 2  # Üçüncü grup

# Temel clustermap
plt.figure(figsize=(10, 8))
sns.clustermap(cluster_data, cmap='RdBu_r', center=0, 
               figsize=(12, 10), cbar_kws={'label': 'Ekspresyon Seviyesi'})
plt.suptitle('Gen Ekspresyon Clustering', y=0.95)
plt.show()

# Özel clustering parametreleri
from scipy.cluster.hierarchy import linkage

# Farklı linkage yöntemleri
g = sns.clustermap(cluster_data, method='ward', metric='euclidean',
                   cmap='viridis', center=0, figsize=(12, 10),
                   row_cluster=True, col_cluster=True,
                   cbar_kws={'label': 'Z-score'})
plt.suptitle('Ward Linkage Clustering', y=0.95)
plt.show()

# Annotation ile
annotation_data = cluster_data.copy()
# Sadece yüksek değerleri göster
annotation_data[annotation_data < 1.5] = ""
annotation_data[annotation_data >= 1.5] = "●"

g = sns.clustermap(cluster_data, annot=annotation_data, fmt='',
                   cmap='RdYlBu_r', center=0, figsize=(14, 10),
                   annot_kws={'fontsize': 8})
plt.suptitle('Annotation ile Clustermap', y=0.95)
plt.show()
```

## İleri Düzey Özellikler

### 1. Joint Plot - jointplot()
```python
# İki değişken arasındaki ilişki analizi
np.random.seed(42)
n = 300
x = np.random.randn(n)
y = x + np.random.randn(n) * 0.8

joint_data = pd.DataFrame({
    'x': x,
    'y': y,
    'kategori': np.random.choice(['A', 'B'], n)
})

# Temel joint plot
g = sns.jointplot(data=joint_data, x='x', y='y', kind='scatter')
g.fig.suptitle('Temel Joint Plot', y=1.02)
plt.show()

# Regression ile
g = sns.jointplot(data=joint_data, x='x', y='y', kind='reg')
g.fig.suptitle('Regression Joint Plot', y=1.02)
plt.show()

# KDE ile
g = sns.jointplot(data=joint_data, x='x', y='y', kind='kde')
g.fig.suptitle('KDE Joint Plot', y=1.02)
plt.show()

# Hex plot
g = sns.jointplot(data=joint_data, x='x', y='y', kind='hex')
g.fig.suptitle('Hexagon Joint Plot', y=1.02)
plt.show()

# Kategorik ile
g = sns.jointplot(data=joint_data, x='x', y='y', hue='kategori')
g.fig.suptitle('Kategorik Joint Plot', y=1.02)
plt.show()
```

### 2. Categorical Plots
```python
# Kategorik analiz için kapsamlı veri
np.random.seed(42)
n_per_group = 100

categorical_data = pd.DataFrame({
    'puan': np.concatenate([
        np.random.normal(75, 10, n_per_group),  # Matematik
        np.random.normal(70, 12, n_per_group),  # Fen
        np.random.normal(80, 8, n_per_group),   # Edebiyat
        np.random.normal(68, 15, n_per_group)   # Tarih
    ]),
    'ders': ['Matematik', 'Fen', 'Edebiyat', 'Tarih'] * n_per_group,
    'sınıf': np.random.choice(['9', '10', '11', '12'], n_per_group * 4),
    'cinsiyet': np.random.choice(['Kız', 'Erkek'], n_per_group * 4),
    'okul_türü': np.random.choice(['Devlet', 'Özel'], n_per_group * 4)
})

plt.figure(figsize=(20, 15))

# Strip plot
plt.subplot(3, 4, 1)
sns.stripplot(data=categorical_data, x='ders', y='puan')
plt.title('Strip Plot')
plt.xticks(rotation=45)

# Swarm plot
plt.subplot(3, 4, 2)
sample_cat = categorical_data.sample(200)
sns.swarmplot(data=sample_cat, x='ders', y='puan')
plt.title('Swarm Plot')
plt.xticks(rotation=45)

# Box plot
plt.subplot(3, 4, 3)
sns.boxplot(data=categorical_data, x='ders', y='puan')
plt.title('Box Plot')
plt.xticks(rotation=45)

# Violin plot
plt.subplot(3, 4, 4)
sns.violinplot(data=categorical_data, x='ders', y='puan')
plt.title('Violin Plot')
plt.xticks(rotation=45)

# Kategorik ile box plot
plt.subplot(3, 4, 5)
sns.boxplot(data=categorical_data, x='ders', y='puan', hue='cinsiyet')
plt.title('Cinsiyete Göre Box Plot')
plt.xticks(rotation=45)

# Point plot
plt.subplot(3, 4, 6)
sns.pointplot(data=categorical_data, x='ders', y='puan', hue='cinsiyet')
plt.title('Point Plot')
plt.xticks(rotation=45)

# Bar plot
plt.subplot(3, 4, 7)
sns.barplot(data=categorical_data, x='ders', y='puan', hue='okul_türü')
plt.title('Okul Türüne Göre Bar Plot')
plt.xticks(rotation=45)

# Count plot
plt.subplot(3, 4, 8)
sns.countplot(data=categorical_data, x='ders', hue='sınıf')
plt.title('Sınıfa Göre Count Plot')
plt.xticks(rotation=45)

# Nested kategoriler
plt.subplot(3, 4, 9)
sns.boxplot(data=categorical_data, x='okul_türü', y='puan', hue='cinsiyet')
plt.title('İç İçe Kategoriler')

# Çoklu seviye
plt.subplot(3, 4, 10)
pivot_data = categorical_data.groupby(['ders', 'sınıf'])['puan'].mean().reset_index()
sns.barplot(data=pivot_data, x='ders', y='puan', hue='sınıf')
plt.title('Sınıf Bazlı Ortalamalar')
plt.xticks(rotation=45)

# Kombinasyon
plt.subplot(3, 4, 11)
sns.violinplot(data=categorical_data, x='ders', y='puan', inner=None)
sns.stripplot(data=categorical_data, x='ders', y='puan', 
              color='red', alpha=0.3, size=2)
plt.title('Violin + Strip')
plt.xticks(rotation=45)

# Split violin
plt.subplot(3, 4, 12)
sns.violinplot(data=categorical_data, x='ders', y='puan', 
               hue='cinsiyet', split=True)
plt.title('Split Violin Plot')
plt.xticks(rotation=45)

plt.tight_layout()
plt.show()
```

### 3. Dağılım Analizleri
```python
# Farklı dağılımların karşılaştırılması
np.random.seed(42)

distributions = {
    'Normal': np.random.normal(0, 1, 1000),
    'Uniform': np.random.uniform(-2, 2, 1000),
    'Exponential': np.random.exponential(1, 1000),
    'Beta': np.random.beta(2, 5, 1000),
    'Gamma': np.random.gamma(2, 1, 1000),
    'Bimodal': np.concatenate([np.random.normal(-1, 0.5, 500),
                              np.random.normal(1, 0.5, 500)])
}

dist_data = pd.DataFrame({
    'değer': np.concatenate(list(distributions.values())),
    'dağılım': np.repeat(list(distributions.keys()), 1000)
})

plt.figure(figsize=(20, 15))

# KDE plot
plt.subplot(3, 4, 1)
for dist_name, values in distributions.items():
    sns.kdeplot(values, label=dist_name)
plt.legend()
plt.title('KDE Karşılaştırması')

# Histogram overlay
plt.subplot(3, 4, 2)
for dist_name, values in distributions.items():
    sns.histplot(values, alpha=0.3, label=dist_name, stat='density')
plt.legend()
plt.title('Histogram Overlay')

# Violin plot
plt.subplot(3, 4, 3)
sns.violinplot(data=dist_data, x='dağılım', y='değer')
plt.title('Violin Plot Karşılaştırma')
plt.xticks(rotation=45)

# Box plot
plt.subplot(3, 4, 4)
sns.boxplot(data=dist_data, x='dağılım', y='değer')
plt.title('Box Plot Karşılaştırma')
plt.xticks(rotation=45)

# Ridge plot (kdeplot ile manual)
plt.subplot(3, 4, 5)
y_pos = 0
colors = sns.color_palette("husl", len(distributions))
for i, (dist_name, values) in enumerate(distributions.items()):
    sns.kdeplot(values, color=colors[i], alpha=0.7)
    plt.fill_between(np.linspace(values.min(), values.max(), 100),
                    0, 0.1, alpha=0.3, color=colors[i])
    y_pos += 1
plt.title('Ridge Plot Style')

# ECDF (Empirical Cumulative Distribution Function)
plt.subplot(3, 4, 6)
for dist_name, values in distributions.items():
    sns.ecdfplot(values, label=dist_name)
plt.legend()
plt.title('ECDF Plot')

# Q-Q Plot benzeri
plt.subplot(3, 4, 7)
from scipy import stats
normal_sample = distributions['Normal']
uniform_sample = distributions['Uniform']
plt.scatter(np.sort(normal_sample), np.sort(uniform_sample), alpha=0.5)
plt.plot([-3, 3], [-2, 2], 'r--')
plt.xlabel('Normal Distribution')
plt.ylabel('Uniform Distribution')
plt.title('Q-Q Plot Style')

# Survival function
plt.subplot(3, 4, 8)
for dist_name, values in distributions.items():
    sns.ecdfplot(values, complementary=True, label=dist_name)
plt.legend()
plt.title('Survival Function')

# Pairwise KDE
plt.subplot(3, 4, 9)
x = distributions['Normal'][:500]
y = distributions['Beta'][:500]
sns.kdeplot(x=x, y=y, fill=True)
plt.title('2D KDE Plot')

# Marginal histograms
plt.subplot(3, 4, 10)
g = sns.JointGrid()
g.plot_joint(sns.scatterplot, data=pd.DataFrame({'x': x, 'y': y}), 
             x='x', y='y', alpha=0.5)
g.plot_marginals(sns.histplot, kde=True)
plt.title('Marginal Histograms')

# Heat map style density
plt.subplot(3, 4, 11)
H, xedges, yedges = np.histogram2d(x, y, bins=20)
plt.imshow(H.T, origin='lower', extent=[xedges[0], xedges[-1], yedges[0], yedges[-1]], 
           cmap='Blues', aspect='auto')
plt.colorbar()
plt.title('2D Histogram')

# Statistical summary
plt.subplot(3, 4, 12)
summary_stats = []
for dist_name, values in distributions.items():
    stats_dict = {
        'Dağılım': dist_name,
        'Ortalama': np.mean(values),
        'Std': np.std(values),
        'Çarpıklık': stats.skew(values),
        'Basıklık': stats.kurtosis(values)
    }
    summary_stats.append(stats_dict)

summary_df = pd.DataFrame(summary_stats)
summary_pivot = summary_df.set_index('Dağılım').T
sns.heatmap(summary_pivot, annot=True, fmt='.2f', cmap='RdYlBu_r')
plt.title('İstatistiksel Özet')

plt.tight_layout()
plt.show()
```

## Gerçek Veri Analizleri

### Örnek 1: Iris Dataset Analizi
```python
# Iris dataset ile kapsamlı analiz
iris = sns.load_dataset('iris')

plt.figure(figsize=(20, 15))

# Temel istatistikler
plt.subplot(3, 4, 1)
sns.boxplot(data=iris, y='sepal_length')
plt.title('Sepal Length Dağılımı')

plt.subplot(3, 4, 2)
sns.violinplot(data=iris, x='species', y='sepal_length')
plt.title('Türlere Göre Sepal Length')

# Korelasyon analizi
plt.subplot(3, 4, 3)
corr_matrix = iris.select_dtypes(include=[np.number]).corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Özellik Korelasyonları')

# Pairwise relationships
plt.subplot(3, 4, 4)
# Manuel pair plot
numeric_cols = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']
from itertools import combinations
pair = list(combinations(numeric_cols, 2))[0]  # İlk çifti al
sns.scatterplot(data=iris, x=pair[0], y=pair[1], hue='species')
plt.title(f'{pair[0]} vs {pair[1]}')

# Dağılım analizi
plt.subplot(3, 4, 5)
for species in iris['species'].unique():
    species_data = iris[iris['species'] == species]
    sns.kdeplot(species_data['petal_length'], label=species)
plt.legend()
plt.title('Petal Length KDE')

# Multivariate analysis
plt.subplot(3, 4, 6)
sns.scatterplot(data=iris, x='petal_length', y='petal_width', 
                hue='species', size='sepal_length')
plt.title('Çok Değişkenli Analiz')

# Classification boundary visualization
plt.subplot(3, 4, 7)
from sklearn.decomposition import PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(iris[numeric_cols])
pca_df = pd.DataFrame(X_pca, columns=['PC1', 'PC2'])
pca_df['species'] = iris['species'].values
sns.scatterplot(data=pca_df, x='PC1', y='PC2', hue='species')
plt.title('PCA Projection')

# Statistical tests visualization
plt.subplot(3, 4, 8)
species_means = iris.groupby('species')[numeric_cols].mean()
sns.heatmap(species_means.T, annot=True, fmt='.2f', cmap='YlOrRd')
plt.title('Tür Bazlı Ortalamalar')

# Outlier detection
plt.subplot(3, 4, 9)
from scipy import stats
z_scores = np.abs(stats.zscore(iris[numeric_cols]))
outliers = (z_scores > 2).any(axis=1)
iris_with_outliers = iris.copy()
iris_with_outliers['outlier'] = outliers
sns.scatterplot(data=iris_with_outliers, x='sepal_length', y='sepal_width',
                hue='outlier', style='species')
plt.title('Outlier Detection')

# Feature importance (mock)
plt.subplot(3, 4, 10)
feature_importance = np.random.rand(len(numeric_cols))
feature_df = pd.DataFrame({
    'feature': numeric_cols,
    'importance': feature_importance
})
sns.barplot(data=feature_df, x='importance', y='feature')
plt.title('Feature Importance (Mock)')

# Cluster analysis
plt.subplot(3, 4, 11)
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(iris[numeric_cols])
cluster_df = iris.copy()
cluster_df['cluster'] = clusters
sns.scatterplot(data=cluster_df, x='petal_length', y='petal_width',
                hue='cluster', style='species')
plt.title('K-Means Clustering')

# Decision regions (simplified)
plt.subplot(3, 4, 12)
setosa = iris[iris['species'] == 'setosa']
others = iris[iris['species'] != 'setosa']
plt.scatter(setosa['petal_length'], setosa['petal_width'], 
           label='Setosa', alpha=0.7)
plt.scatter(others['petal_length'], others['petal_width'], 
           label='Others', alpha=0.7)
plt.axvline(x=2.5, color='red', linestyle='--', label='Decision Boundary')
plt.legend()
plt.xlabel('Petal Length')
plt.ylabel('Petal Width')
plt.title('Simple Decision Boundary')

plt.tight_layout()
plt.show()
```

### Örnek 2: Tips Dataset Analizi
```python
# Tips dataset ile restoran analizi
tips = sns.load_dataset('tips')

plt.figure(figsize=(20, 15))

# Temel dağılımlar
plt.subplot(3, 4, 1)
sns.histplot(data=tips, x='total_bill', bins=20, kde=True)
plt.title('Toplam Hesap Dağılımı')

plt.subplot(3, 4, 2)
sns.histplot(data=tips, x='tip', bins=20, kde=True)
plt.title('Bahşiş Dağılımı')

# İlişki analizi
plt.subplot(3, 4, 3)
sns.scatterplot(data=tips, x='total_bill', y='tip', hue='time')
plt.title('Hesap vs Bahşiş')

plt.subplot(3, 4, 4)
sns.regplot(data=tips, x='total_bill', y='tip')
plt.title('Regresyon Analizi')

# Kategorik analizler
plt.subplot(3, 4, 5)
sns.boxplot(data=tips, x='day', y='tip')
plt.title('Güne Göre Bahşiş')

plt.subplot(3, 4, 6)
sns.barplot(data=tips, x='day', y='tip', hue='time')
plt.title('Gün ve Zaman Bazlı')

# Cinsiyet analizi
plt.subplot(3, 4, 7)
sns.violinplot(data=tips, x='sex', y='tip', hue='smoker')
plt.title('Cinsiyet ve Sigara')

plt.subplot(3, 4, 8)
sns.pointplot(data=tips, x='size', y='tip', hue='sex')
plt.title('Masa Boyutu Etkisi')

# İleri analizler
plt.subplot(3, 4, 9)
tips['tip_percentage'] = tips['tip'] / tips['total_bill'] * 100
sns.boxplot(data=tips, x='day', y='tip_percentage')
plt.title('Bahşiş Yüzdesi')

plt.subplot(3, 4, 10)
crosstab = pd.crosstab(tips['day'], tips['time'])
sns.heatmap(crosstab, annot=True, fmt='d', cmap='Blues')
plt.title('Gün-Zaman Crosstab')

# Outlier analizi
plt.subplot(3, 4, 11)
Q1 = tips['tip'].quantile(0.25)
Q3 = tips['tip'].quantile(0.75)
IQR = Q3 - Q1
outliers = tips[(tips['tip'] < Q1 - 1.5*IQR) | (tips['tip'] > Q3 + 1.5*IQR)]
tips_clean = tips[~tips.index.isin(outliers.index)]
sns.scatterplot(data=tips, x='total_bill', y='tip', alpha=0.6, label='Normal')
sns.scatterplot(data=outliers, x='total_bill', y='tip', 
                color='red', s=100, label='Outliers')
plt.legend()
plt.title('Outlier Detection')

# Segment analizi
plt.subplot(3, 4, 12)
tips['bill_category'] = pd.cut(tips['total_bill'], 
                               bins=[0, 15, 25, 50], 
                               labels=['Düşük', 'Orta', 'Yüksek'])
segment_analysis = tips.groupby(['bill_category', 'time'])['tip_percentage'].mean().unstack()
sns.heatmap(segment_analysis, annot=True, fmt='.1f', cmap='RdYlGn')
plt.title('Segment Analizi')

plt.tight_layout()
plt.show()
```
