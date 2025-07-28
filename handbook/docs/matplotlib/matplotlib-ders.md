# Matplotlib Kapsamlı Eğitim Rehberi

## İçindekiler
1. [Giriş ve Kurulum](#giriş-ve-kurulum)
2. [Temel Kavramlar](#temel-kavramlar)
3. [Temel Grafik Türleri](#temel-grafik-türleri)
4. [Grafik Özelleştirme](#grafik-özelleştirme)
5. [Alt Grafikler (Subplots)](#alt-grafikler-subplots)
6. [İleri Düzey Özellikler](#ileri-düzey-özellikler)
7. [Örnek Projeler](#örnek-projeler)
8. [Ödevler](#ödevler)

## Giriş ve Kurulum

Matplotlib, Python'da veri görselleştirme için en temel ve güçlü kütüphanedir. 2003 yılında John D. Hunter tarafından geliştirilmeye başlanmış ve günümüzde bilimsel computing'in vazgeçilmez bir parçası haline gelmiştir.

### Kurulum
```bash
pip install matplotlib
```

### Temel İmport
```python
import matplotlib.pyplot as plt
import numpy as np
```

## Temel Kavramlar

### Figure ve Axes
Matplotlib'in mimarisi iki ana bileşen üzerine kuruludur:
- **Figure**: Tüm grafik öğelerini içeren ana pencere
- **Axes**: Grafiklerin çizildiği alan

```python
# Temel figure ve axes oluşturma
fig, ax = plt.subplots()
ax.plot([1, 2, 3, 4], [1, 4, 2, 3])
plt.show()
```

### İki Farklı Yaklaşım

#### 1. Pyplot Arayüzü (MATLAB benzeri)
```python
plt.plot([1, 2, 3, 4], [1, 4, 2, 3])
plt.xlabel('X Ekseni')
plt.ylabel('Y Ekseni')
plt.title('Basit Çizgi Grafiği')
plt.show()
```

#### 2. Object-Oriented Arayüz (Önerilen)
```python
fig, ax = plt.subplots()
ax.plot([1, 2, 3, 4], [1, 4, 2, 3])
ax.set_xlabel('X Ekseni')
ax.set_ylabel('Y Ekseni')
ax.set_title('Basit Çizgi Grafiği')
plt.show()
```

## Temel Grafik Türleri

### 1. Çizgi Grafiği (Line Plot)
```python
# Basit çizgi grafiği
x = np.linspace(0, 10, 100)
y = np.sin(x)

fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(x, y, label='sin(x)', linewidth=2, color='blue')
ax.plot(x, np.cos(x), label='cos(x)', linewidth=2, color='red', linestyle='--')
ax.set_xlabel('X değerleri')
ax.set_ylabel('Y değerleri')
ax.set_title('Trigonometrik Fonksiyonlar')
ax.legend()
ax.grid(True, alpha=0.3)
plt.show()
```

### 2. Scatter Plot (Dağılım Grafiği)
```python
# Rastgele veri oluşturma
np.random.seed(42)
x = np.random.randn(100)
y = 2 * x + np.random.randn(100)

fig, ax = plt.subplots(figsize=(8, 6))
scatter = ax.scatter(x, y, c=y, cmap='viridis', alpha=0.7, s=50)
ax.set_xlabel('X değerleri')
ax.set_ylabel('Y değerleri')
ax.set_title('Dağılım Grafiği')
plt.colorbar(scatter, ax=ax, label='Y değeri')
plt.show()
```

### 3. Bar Chart (Sütun Grafiği)
```python
# Kategorik veri
kategoriler = ['A', 'B', 'C', 'D', 'E']
değerler = [23, 45, 56, 78, 32]

fig, ax = plt.subplots(figsize=(8, 6))
bars = ax.bar(kategoriler, değerler, color=['red', 'green', 'blue', 'orange', 'purple'])
ax.set_xlabel('Kategoriler')
ax.set_ylabel('Değerler')
ax.set_title('Sütun Grafiği')

# Bar'ların üzerine değerleri yazma
for bar, değer in zip(bars, değerler):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1, 
            str(değer), ha='center', va='bottom')
plt.show()
```

### 4. Histogram
```python
# Normal dağılım verileri
np.random.seed(42)
data = np.random.normal(100, 15, 1000)

fig, ax = plt.subplots(figsize=(10, 6))
n, bins, patches = ax.hist(data, bins=30, alpha=0.7, color='skyblue', 
                          edgecolor='black', density=True)
ax.set_xlabel('Değerler')
ax.set_ylabel('Yoğunluk')
ax.set_title('Histogram Örneği')

# Normal dağılım eğrisi ekleme
x = np.linspace(data.min(), data.max(), 100)
y = ((1 / (np.sqrt(2 * np.pi) * 15)) * 
     np.exp(-0.5 * ((x - 100) / 15) ** 2))
ax.plot(x, y, 'r-', linewidth=2, label='Teorik Normal Dağılım')
ax.legend()
plt.show()
```

### 5. Pie Chart (Pasta Grafiği)
```python
# Pasta grafiği verileri
labels = ['Python', 'Java', 'JavaScript', 'C++', 'Diğer']
sizes = [35, 25, 20, 12, 8]
colors = ['gold', 'lightcoral', 'lightskyblue', 'lightgreen', 'pink']
explode = (0.1, 0, 0, 0, 0)  # İlk dilimi ayır

fig, ax = plt.subplots(figsize=(8, 8))
wedges, texts, autotexts = ax.pie(sizes, explode=explode, labels=labels, 
                                  colors=colors, autopct='%1.1f%%', 
                                  shadow=True, startangle=90)
ax.set_title('Programlama Dilleri Kullanım Oranları')
plt.show()
```

## Grafik Özelleştirme

### Renkler ve Stiller
```python
# Farklı renk ve stil seçenekleri
x = np.linspace(0, 10, 50)

fig, ax = plt.subplots(figsize=(12, 8))

# Farklı çizgi stilleri
ax.plot(x, np.sin(x), 'r-', linewidth=2, label='Düz çizgi')
ax.plot(x, np.sin(x + 0.5), 'g--', linewidth=2, label='Kesik çizgi')
ax.plot(x, np.sin(x + 1), 'b:', linewidth=2, label='Noktalı çizgi')
ax.plot(x, np.sin(x + 1.5), 'm-.', linewidth=2, label='Çizgi-nokta')

# Marker'lar
ax.plot(x[::5], np.sin(x[::5] + 2), 'co', markersize=8, label='Daire marker')
ax.plot(x[::5], np.sin(x[::5] + 2.5), 'rs', markersize=8, label='Kare marker')

ax.set_xlabel('X değerleri', fontsize=12)
ax.set_ylabel('Y değerleri', fontsize=12)
ax.set_title('Çizgi Stilleri ve Marker\'lar', fontsize=14, fontweight='bold')
ax.legend(fontsize=10)
ax.grid(True, alpha=0.3)
plt.show()
```

### Font ve Metin Özelleştirme
```python
# Font özelleştirme
plt.rcParams.update({
    'font.size': 12,
    'font.family': 'serif',
    'axes.labelsize': 14,
    'axes.titlesize': 16,
    'xtick.labelsize': 10,
    'ytick.labelsize': 10,
    'legend.fontsize': 12
})

fig, ax = plt.subplots(figsize=(10, 6))
x = np.linspace(0, 10, 100)
ax.plot(x, np.sin(x), label='sin(x)')

# Metin ekleme
ax.text(5, 0.5, 'Maksimum nokta', fontsize=14, 
        bbox=dict(boxstyle="round,pad=0.3", facecolor="yellow", alpha=0.7))

# Ok ekleme
ax.annotate('Sıfır geçişi', xy=(np.pi, 0), xytext=(4, 0.3),
            arrowprops=dict(arrowstyle='->', color='red', lw=2),
            fontsize=12, color='red')

ax.set_xlabel('X değerleri')
ax.set_ylabel('Y değerleri')
ax.set_title('Metin ve Annotation Örneği')
ax.legend()
plt.show()
```

## Alt Grafikler (Subplots)

### Temel Subplots
```python
# 2x2 subplot düzeni
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

x = np.linspace(0, 10, 100)

# Sol üst
axes[0, 0].plot(x, np.sin(x))
axes[0, 0].set_title('sin(x)')
axes[0, 0].grid(True)

# Sağ üst
axes[0, 1].plot(x, np.cos(x), 'r')
axes[0, 1].set_title('cos(x)')
axes[0, 1].grid(True)

# Sol alt
axes[1, 0].plot(x, np.tan(x))
axes[1, 0].set_title('tan(x)')
axes[1, 0].set_ylim(-5, 5)
axes[1, 0].grid(True)

# Sağ alt
axes[1, 1].plot(x, np.exp(-x/5))
axes[1, 1].set_title('exp(-x/5)')
axes[1, 1].grid(True)

plt.tight_layout()
plt.show()
```

### GridSpec ile Esnek Düzen
```python
from matplotlib.gridspec import GridSpec

fig = plt.figure(figsize=(12, 8))
gs = GridSpec(3, 3, figure=fig)

# Büyük grafik (sol üst 2x2)
ax1 = fig.add_subplot(gs[0:2, 0:2])
x = np.linspace(0, 10, 100)
ax1.plot(x, np.sin(x), 'b-', linewidth=2)
ax1.set_title('Ana Grafik')

# Küçük grafikler
ax2 = fig.add_subplot(gs[0, 2])
ax2.bar(['A', 'B', 'C'], [1, 3, 2])
ax2.set_title('Bar Chart')

ax3 = fig.add_subplot(gs[1, 2])
ax3.scatter(np.random.randn(50), np.random.randn(50))
ax3.set_title('Scatter')

ax4 = fig.add_subplot(gs[2, :])
ax4.hist(np.random.randn(1000), bins=30)
ax4.set_title('Histogram - Tam Genişlik')

plt.tight_layout()
plt.show()
```

## İleri Düzey Özellikler

### 3D Grafikler
```python
from mpl_toolkits.mplot3d import Axes3D

# 3D Surface Plot
fig = plt.figure(figsize=(12, 5))

# Sol: 3D Surface
ax1 = fig.add_subplot(121, projection='3d')
x = np.linspace(-5, 5, 50)
y = np.linspace(-5, 5, 50)
X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))

surface = ax1.plot_surface(X, Y, Z, cmap='viridis', alpha=0.8)
ax1.set_title('3D Surface Plot')
ax1.set_xlabel('X')
ax1.set_ylabel('Y')
ax1.set_zlabel('Z')

# Sağ: 3D Scatter
ax2 = fig.add_subplot(122, projection='3d')
n = 100
x = np.random.randn(n)
y = np.random.randn(n)
z = np.random.randn(n)
colors = z

ax2.scatter(x, y, z, c=colors, cmap='plasma')
ax2.set_title('3D Scatter Plot')
ax2.set_xlabel('X')
ax2.set_ylabel('Y')
ax2.set_zlabel('Z')

plt.tight_layout()
plt.show()
```

### Animasyon
```python
from matplotlib.animation import FuncAnimation

# Basit animasyon örneği
fig, ax = plt.subplots(figsize=(8, 6))
x = np.linspace(0, 2*np.pi, 100)
line, = ax.plot(x, np.sin(x))

ax.set_xlim(0, 2*np.pi)
ax.set_ylim(-1.5, 1.5)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_title('Animasyonlu Sinüs Dalgası')

def animate(frame):
    line.set_ydata(np.sin(x + frame/10))
    return line,

# Animasyon oluşturma
anim = FuncAnimation(fig, animate, frames=100, interval=50, blit=True)

# Not: Jupyter notebook'ta görüntülemek için:
# from IPython.display import HTML
# HTML(anim.to_jshtml())

plt.show()
```

## Örnek Projeler

### Proje 1: Hava Durumu Analizi
```python
# Örnek hava durumu verileri
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=365)
temperature = 20 + 10 * np.sin(2 * np.pi * np.arange(365) / 365) + np.random.randn(365) * 3
humidity = 60 + 20 * np.cos(2 * np.pi * np.arange(365) / 365) + np.random.randn(365) * 5
rainfall = np.random.exponential(2, 365)

fig, axes = plt.subplots(3, 1, figsize=(14, 12))

# Sıcaklık grafiği
axes[0].plot(dates, temperature, linewidth=1.5, color='red', alpha=0.7)
axes[0].fill_between(dates, temperature, alpha=0.3, color='red')
axes[0].set_title('2023 Yıllık Sıcaklık Değişimi', fontsize=14, fontweight='bold')
axes[0].set_ylabel('Sıcaklık (°C)')
axes[0].grid(True, alpha=0.3)

# Nem grafiği
axes[1].plot(dates, humidity, linewidth=1.5, color='blue', alpha=0.7)
axes[1].fill_between(dates, humidity, alpha=0.3, color='blue')
axes[1].set_title('2023 Yıllık Nem Oranı Değişimi', fontsize=14, fontweight='bold')
axes[1].set_ylabel('Nem (%)')
axes[1].grid(True, alpha=0.3)

# Yağış grafiği
axes[2].bar(dates, rainfall, width=1, alpha=0.7, color='green')
axes[2].set_title('2023 Yıllık Yağış Miktarı', fontsize=14, fontweight='bold')
axes[2].set_ylabel('Yağış (mm)')
axes[2].set_xlabel('Tarih')
axes[2].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

### Proje 2: Finansal Veri Analizi
```python
# Örnek hisse senedi verileri
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=252)  # 1 yıl iş günü
prices = [100]
for i in range(1, 252):
    change = np.random.randn() * 0.02  # %2 volatilite
    new_price = prices[-1] * (1 + change)
    prices.append(new_price)

volume = np.random.randint(1000000, 5000000, 252)

fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(14, 12))

# Fiyat grafiği
ax1.plot(dates, prices, linewidth=2, color='black')
ax1.fill_between(dates, prices, alpha=0.3, color='lightblue')
ax1.set_title('Hisse Senedi Fiyat Hareketi', fontsize=14, fontweight='bold')
ax1.set_ylabel('Fiyat ($)')
ax1.grid(True, alpha=0.3)

# Hacim grafiği
colors = ['red' if prices[i] < prices[i-1] else 'green' for i in range(1, len(prices))]
colors.insert(0, 'green')
ax2.bar(dates, volume, color=colors, alpha=0.7, width=1)
ax2.set_title('İşlem Hacmi', fontsize=14, fontweight='bold')
ax2.set_ylabel('Hacim')
ax2.grid(True, alpha=0.3)

# Günlük getiri dağılımı
daily_returns = [(prices[i] - prices[i-1]) / prices[i-1] * 100 for i in range(1, len(prices))]
ax3.hist(daily_returns, bins=30, alpha=0.7, color='purple', edgecolor='black')
ax3.axvline(np.mean(daily_returns), color='red', linestyle='--', 
           label=f'Ortalama: {np.mean(daily_returns):.2f}%')
ax3.set_title('Günlük Getiri Dağılımı', fontsize=14, fontweight='bold')
ax3.set_xlabel('Günlük Getiri (%)')
ax3.set_ylabel('Frekans')
ax3.legend()
ax3.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

