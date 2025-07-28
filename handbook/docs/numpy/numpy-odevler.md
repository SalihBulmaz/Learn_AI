# NumPy İleri Seviye Ödevleri

Bu ödevler, NumPy'ın tüm özelliklerini test etmek ve derinlemesine anlamak için tasarlanmıştır. Her ödev, farklı NumPy kavramlarını birleştirerek gerçek dünya senaryolarını simüle eder.

---

## Ödev 1: Finansal Portföy Analiz Sistemi

### Açıklama
Bir yatırım şirketi için portföy analiz sistemi geliştirin. Sistem, farklı hisse senetlerinin performansını analiz edecek, risk hesaplamaları yapacak ve portföy optimizasyonu önerileri sunacak.

### Gereksinimler
- 10 farklı hisse senedi için 2 yıllık günlük fiyat verisi oluşturun
- Her hisse için günlük getiri hesaplayın
- Portföy risk analizi yapın (VaR, Sharpe ratio, beta)
- Korelasyon matrisi oluşturun
- Portföy optimizasyonu için weight hesaplamaları yapın

### Template Kod

```python
import numpy as np
import pandas as pd
from numpy.linalg import inv, eig
import matplotlib.pyplot as plt

# Seed ayarlama (tekrarlanabilir sonuçlar için)
np.random.seed(42)

# ===== VERİ OLUŞTURMA =====
# 2 yıl = 504 iş günü
days = 504
n_stocks = 10
stock_names = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'AMD', 'INTC']

# Başlangıç fiyatları (gerçekçi değerler)
initial_prices = np.array([150, 2800, 300, 3300, 800, 350, 600, 500, 100, 50])

# Her hisse için farklı volatilite ve drift parametreleri
volatilities = np.array([0.02, 0.025, 0.018, 0.03, 0.04, 0.035, 0.045, 0.04, 0.05, 0.025])
drifts = np.array([0.0005, 0.0008, 0.0006, 0.001, 0.0015, 0.0012, 0.002, 0.0018, 0.0025, 0.0004])

# Fiyat matrisi oluşturma (stocks x days)
price_matrix = np.zeros((n_stocks, days + 1))
price_matrix[:, 0] = initial_prices

# Random walk ile fiyat simülasyonu
for day in range(1, days + 1):
    # Her hisse için günlük getiri
    daily_returns = np.random.normal(drifts, volatilities)
    price_matrix[:, day] = price_matrix[:, day-1] * (1 + daily_returns)

print(f"Fiyat matrisi boyutu: {price_matrix.shape}")
print(f"İlk 5 gün için AAPL fiyatları: {price_matrix[0, :5]}")

# ===== BURADA KODUNUZ BAŞLIYOR =====

# 1. Günlük getiri matrisi oluşturun (price_matrix kullanarak)
# Hint: np.diff() ve broadcasting kullanın

# 2. Her hisse için yıllık getiri, volatilite ve Sharpe ratio hesaplayın
# Hint: 252 iş günü kullanın, risk-free rate = 0.02

# 3. Korelasyon matrisi oluşturun ve en yüksek/ en düşük korelasyonlu hisse çiftlerini bulun

# 4. Portföy VaR (Value at Risk) hesaplayın (95% güven seviyesi)
# Hint: Normal dağılım varsayımı ile

# 5. Minimum variance portföyü hesaplayın
# Hint: Quadratic programming, covariance matrix kullanın

# 6. Beta hesaplamaları yapın (market olarak tüm hisselerin ortalamasını kullanın)

# 7. Efficient frontier analizi için farklı risk seviyelerinde portföy ağırlıkları hesaplayın

# 8. Sonuçları raporlayın ve en iyi portföy kombinasyonunu önerin
```


### Beklenen Çıktılar
- Günlük getiri matrisi
- Her hisse için risk-getiri analizi
- Korelasyon matrisi ve analizi
- VaR hesaplamaları
- Optimal portföy ağırlıkları
- Efficient frontier grafiği

---

## Ödev 2: Görüntü İşleme ve Filtreleme Sistemi

### Açıklama
Bir görüntü işleme sistemi geliştirin. Sistem, farklı filtreler uygulayacak, görüntü analizi yapacak ve görüntü kalitesini iyileştirecek.

### Gereksinimler
- Farklı boyutlarda test görüntüleri oluşturun
- Çeşitli filtreler uygulayın (blur, sharpen, edge detection)
- Histogram analizi yapın
- Görüntü kalitesi metrikleri hesaplayın
- Morphological işlemler uygulayın

### Template Kod

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import ndimage

# Seed ayarlama
np.random.seed(42)

# ===== TEST GÖRÜNTÜLERİ OLUŞTURMA =====
def create_test_images():
    """Farklı test görüntüleri oluşturur"""
    images = {}
    
    # 1. Gradient görüntü
    height, width = 256, 256
    x = np.linspace(0, 1, width)
    y = np.linspace(0, 1, height)
    X, Y = np.meshgrid(x, y)
    images['gradient'] = (X + Y) * 255
    
    # 2. Noise'lu görüntü
    images['noisy'] = np.random.normal(128, 30, (height, width))
    images['noisy'] = np.clip(images['noisy'], 0, 255)
    
    # 3. Geometric shapes
    images['shapes'] = np.zeros((height, width))
    # Circle
    center_y, center_x = height//2, width//2
    Y_coords, X_coords = np.ogrid[:height, :width]
    mask = (X_coords - center_x)**2 + (Y_coords - center_y)**2 <= 50**2
    images['shapes'][mask] = 255
    
    # Rectangle
    images['shapes'][100:150, 50:200] = 128
    
    # 4. Checkerboard pattern
    checker = np.indices((height, width))
    images['checkerboard'] = ((checker[0] // 32) + (checker[1] // 32)) % 2 * 255
    
    return images

test_images = create_test_images()
print(f"Oluşturulan görüntü türleri: {list(test_images.keys())}")

# ===== BURADA KODUNUZ BAŞLIYOR =====

# 1. Her görüntü için histogram analizi yapın
# Hint: np.histogram() kullanın, 256 bin ile

# 2. Gaussian blur filtresi uygulayın (sigma=2)
# Hint: 2D Gaussian kernel oluşturun ve np.convolve() kullanın

# 3. Sharpening filtresi uygulayın
# Hint: Laplacian kernel kullanın

# 4. Edge detection uygulayın (Sobel operator)
# Hint: X ve Y yönünde gradient hesaplayın

# 5. Median filter uygulayın (salt & pepper noise için)
# Hint: Sliding window ile median hesaplayın

# 6. Histogram equalization uygulayın
# Hint: Cumulative distribution function kullanın

# 7. Morphological işlemler uygulayın (erosion, dilation)
# Hint: Binary görüntüler için

# 8. Görüntü kalitesi metrikleri hesaplayın (PSNR, MSE)
# Hint: Orijinal ve işlenmiş görüntüleri karşılaştırın

# 9. Adaptive thresholding uygulayın
# Hint: Local mean kullanarak

# 10. Sonuçları görselleştirin ve analiz edin
```


### Beklenen Çıktılar
- Her görüntü için histogram grafikleri
- Filtrelenmiş görüntüler
- Edge detection sonuçları
- Kalite metrikleri tablosu
- Morphological işlem sonuçları
- Karşılaştırmalı analiz raporu

---

## Ödev 3: Makine Öğrenmesi Veri Hazırlama ve Feature Engineering

### Açıklama
Kapsamlı bir makine öğrenmesi veri hazırlama sistemi geliştirin. Sistem, veri temizleme, feature engineering, normalizasyon ve veri analizi yapacak.

### Gereksinimler
- Çok boyutlu veri seti oluşturun
- Eksik veri imputation yapın
- Feature scaling ve normalization uygulayın
- Outlier detection ve handling yapın
- Feature selection ve dimensionality reduction uygulayın

### Template Kod

```python
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.decomposition import PCA

# Seed ayarlama
np.random.seed(42)

# ===== KOMPLEKS VERİ SETİ OLUŞTURMA =====
n_samples = 1000
n_features = 20

# Feature isimleri
feature_names = [f'feature_{i}' for i in range(n_features)]

# Gerçekçi veri oluşturma
data = {}

# 1. Normal dağılımlı özellikler
data['feature_0'] = np.random.normal(100, 15, n_samples)  # Yaş
data['feature_1'] = np.random.normal(70, 12, n_samples)   # Kilo
data['feature_2'] = np.random.normal(170, 10, n_samples)  # Boy

# 2. Kategorik özellikler (one-hot encoding için)
data['feature_3'] = np.random.choice(['A', 'B', 'C'], n_samples, p=[0.4, 0.3, 0.3])
data['feature_4'] = np.random.choice([0, 1], n_samples, p=[0.6, 0.4])

# 3. Correlated features
data['feature_5'] = data['feature_1'] * 0.8 + np.random.normal(0, 5, n_samples)  # BMI benzeri
data['feature_6'] = data['feature_2'] * 0.6 + np.random.normal(0, 8, n_samples)  # Boy ile ilişkili

# 4. Polynomial features
data['feature_7'] = data['feature_0']**2 / 1000 + np.random.normal(0, 10, n_samples)
data['feature_8'] = np.sqrt(data['feature_1']) + np.random.normal(0, 2, n_samples)

# 5. Cyclical features
data['feature_9'] = np.sin(2 * np.pi * np.arange(n_samples) / 365) + np.random.normal(0, 0.1, n_samples)
data['feature_10'] = np.cos(2 * np.pi * np.arange(n_samples) / 7) + np.random.normal(0, 0.1, n_samples)

# 6. Noise features
for i in range(11, 20):
    data[f'feature_{i}'] = np.random.normal(0, 1, n_samples)

# DataFrame oluşturma
df = pd.DataFrame(data)
print(f"Veri seti boyutu: {df.shape}")
print(f"Veri tipleri:\n{df.dtypes.value_counts()}")

# Eksik veri ekleme
missing_mask = np.random.random(df.shape) < 0.05  # %5 eksik veri
df_missing = df.copy()
df_missing[missing_mask] = np.nan

print(f"Eksik veri sayısı: {df_missing.isnull().sum().sum()}")

# ===== BURADA KODUNUZ BAŞLIYOR =====

# 1. Eksik veri analizi ve imputation
# Hint: Mean, median, mode ve forward fill yöntemlerini karşılaştırın

# 2. Outlier detection (IQR, Z-score, Isolation Forest benzeri)
# Hint: 3-sigma kuralı ve IQR yöntemlerini uygulayın

# 3. Feature correlation analizi
# Hint: Correlation matrix oluşturun ve yüksek korelasyonlu feature'ları tespit edin

# 4. Feature scaling (StandardScaler, MinMaxScaler, RobustScaler)
# Hint: Farklı scaling yöntemlerini karşılaştırın

# 5. Polynomial feature generation
# Hint: 2. derece polynomial features oluşturun

# 6. Feature selection (Variance threshold, correlation-based)
# Hint: Düşük varyanslı ve yüksek korelasyonlu feature'ları çıkarın

# 7. Dimensionality reduction (PCA)
# Hint: Explained variance ratio hesaplayın

# 8. Categorical encoding (One-hot, Label encoding)
# Hint: Kategorik değişkenleri sayısal hale getirin

# 9. Feature importance hesaplama
# Hint: Variance, correlation ve mutual information kullanın

# 10. Data quality metrics hesaplama
# Hint: Completeness, consistency, validity
```


### Beklenen Çıktılar
- Eksik veri analizi raporu
- Outlier detection sonuçları
- Correlation matrix ve heatmap
- Feature importance sıralaması
- PCA sonuçları ve explained variance
- Data quality metrics tablosu
- Preprocessing pipeline önerisi

---

## Ödev 4: İstatistiksel Analiz ve Hipotez Testi Sistemi

### Açıklama
Kapsamlı bir istatistiksel analiz sistemi geliştirin. Sistem, descriptive statistics, inferential statistics, hypothesis testing ve regression analysis yapacak.

### Gereksinimler
- Çoklu veri setleri oluşturun
- Descriptive statistics hesaplayın
- Parametrik ve non-parametrik testler uygulayın
- Regression analysis yapın
- Confidence intervals hesaplayın

### Template Kod

```python
import numpy as np
import pandas as pd
from scipy import stats
import matplotlib.pyplot as plt

# Seed ayarlama
np.random.seed(42)

# ===== ÇOKLU VERİ SETLERİ OLUŞTURMA =====
n_samples = 500

# 1. Normal dağılımlı veri setleri
group_a = np.random.normal(100, 15, n_samples)
group_b = np.random.normal(105, 18, n_samples)
group_c = np.random.normal(95, 12, n_samples)

# 2. Exponential dağılımlı veri
exp_data = np.random.exponential(2, n_samples)

# 3. Mixed distribution data
mixed_data = np.concatenate([
    np.random.normal(50, 5, n_samples//2),
    np.random.normal(80, 8, n_samples//2)
])

# 4. Time series data
time_series = np.cumsum(np.random.normal(0, 1, n_samples)) + 100

# 5. Paired data (before/after)
before = np.random.normal(75, 10, n_samples)
after = before + np.random.normal(5, 3, n_samples)  # Treatment effect

# 6. Categorical data
categories = np.random.choice(['Low', 'Medium', 'High'], n_samples, p=[0.3, 0.5, 0.2])
category_values = np.random.normal(100, 20, n_samples)

# 7. Regression data
x_reg = np.random.uniform(0, 100, n_samples)
y_reg = 2 * x_reg + 10 + np.random.normal(0, 15, n_samples)

print(f"Veri setleri oluşturuldu:")
print(f"Group A: mean={np.mean(group_a):.2f}, std={np.std(group_a):.2f}")
print(f"Group B: mean={np.mean(group_b):.2f}, std={np.std(group_b):.2f}")
print(f"Group C: mean={np.mean(group_c):.2f}, std={np.std(group_c):.2f}")

# ===== BURADA KODUNUZ BAŞLIYOR =====

# 1. Descriptive statistics (tüm gruplar için)
# Hint: Mean, median, mode, std, variance, skewness, kurtosis

# 2. Normality tests (Shapiro-Wilk, Anderson-Darling)
# Hint: Her grup için normality testi uygulayın

# 3. Homogeneity of variance tests (Levene, Bartlett)
# Hint: Gruplar arası variance eşitliğini test edin

# 4. One-way ANOVA ve post-hoc tests
# Hint: Tukey HSD testi uygulayın

# 5. T-tests (independent ve paired)
# Hint: Group A vs Group B ve before vs after

# 6. Non-parametric tests (Mann-Whitney, Kruskal-Wallis)
# Hint: Normal dağılım varsayımı olmayan durumlar için

# 7. Correlation analysis (Pearson, Spearman, Kendall)
# Hint: Farklı correlation türlerini karşılaştırın

# 8. Linear regression analysis
# Hint: x_reg ve y_reg için regression yapın

# 9. Confidence intervals hesaplama
# Hint: Mean, proportion ve regression coefficients için

# 10. Effect size hesaplama (Cohen's d, eta-squared)
# Hint: Test sonuçlarının pratik önemini değerlendirin

# 11. Power analysis
# Hint: Sample size hesaplamaları yapın

# 12. Multiple comparisons correction (Bonferroni, FDR)
# Hint: Type I error kontrolü
```


### Beklenen Çıktılar
- Descriptive statistics tablosu
- Normality test sonuçları
- ANOVA ve post-hoc test sonuçları
- T-test sonuçları ve effect sizes
- Correlation matrix ve p-values
- Regression analysis sonuçları
- Confidence intervals tablosu
- Statistical power analizi
- Multiple comparisons correction sonuçları

---

## Ödev 5: Optimizasyon ve Simülasyon Sistemi

### Açıklama
Kapsamlı bir optimizasyon ve simülasyon sistemi geliştirin. Sistem, Monte Carlo simülasyonları, optimizasyon algoritmaları ve sensitivity analysis yapacak.

### Gereksinimler
- Monte Carlo simülasyonları yapın
- Gradient descent optimizasyonu uygulayın
- Sensitivity analysis yapın
- Constraint optimization çözün
- Stochastic processes simüle edin

### Template Kod

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import minimize
from scipy.stats import norm, uniform

# Seed ayarlama
np.random.seed(42)

# ===== OPTIMIZASYON PROBLEMLERİ TANIMLAMA =====

# 1. Rosenbrock function (test function)
def rosenbrock(x):
    """Rosenbrock function: f(x,y) = (1-x)^2 + 100(y-x^2)^2"""
    return (1 - x[0])**2 + 100 * (x[1] - x[0]**2)**2

# 2. Himmelblau function
def himmelblau(x):
    """Himmelblau function: f(x,y) = (x^2 + y - 11)^2 + (x + y^2 - 7)^2"""
    return (x[0]**2 + x[1] - 11)**2 + (x[0] + x[1]**2 - 7)**2

# 3. Portfolio optimization function
def portfolio_risk(weights, returns):
    """Portfolio risk (variance) hesaplama"""
    cov_matrix = np.cov(returns.T)
    return weights.T @ cov_matrix @ weights

def portfolio_return(weights, returns):
    """Portfolio return hesaplama"""
    return np.sum(weights * np.mean(returns, axis=0))

# 4. Manufacturing cost function
def manufacturing_cost(params):
    """Manufacturing cost function: C = a*x^2 + b*y + c*z^3"""
    x, y, z = params
    a, b, c = 2, 3, 1
    return a*x**2 + b*y + c*z**3

# Test data oluşturma
n_assets = 5
n_days = 252
returns_data = np.random.normal(0.001, 0.02, (n_days, n_assets))

print(f"Optimizasyon problemleri tanımlandı")
print(f"Portfolio data shape: {returns_data.shape}")

# ===== BURADA KODUNUZ BAŞLIYOR =====

# 1. Gradient descent implementasyonu
# Hint: Rosenbrock function için gradient descent yazın

# 2. Monte Carlo integration
# Hint: Pi sayısını Monte Carlo ile hesaplayın

# 3. Portfolio optimization (Markowitz)
# Hint: Risk-return trade-off optimizasyonu

# 4. Constraint optimization
# Hint: Manufacturing cost minimization with constraints

# 5. Global optimization (random search, simulated annealing)
# Hint: Himmelblau function için global minimum bulun

# 6. Sensitivity analysis
# Hint: Parameter sensitivity hesaplayın

# 7. Stochastic processes simulation
# Hint: Random walk, Brownian motion simüle edin

# 8. Bootstrap sampling ve confidence intervals
# Hint: Portfolio returns için bootstrap CI hesaplayın

# 9. Multi-objective optimization
# Hint: Risk ve return arasında Pareto optimal çözümler

# 10. Robust optimization
# Hint: Uncertainty altında robust çözümler

# 11. Time series optimization
# Hint: Moving average parameters optimization

# 12. Neural network weight optimization (basit)
# Hint: Simple neural network için gradient descent
```


### Beklenen Çıktılar
- Gradient descent convergence grafiği
- Monte Carlo integration sonuçları
- Portfolio efficient frontier
- Constraint optimization sonuçları
- Global optimization convergence
- Sensitivity analysis heatmap
- Stochastic process simülasyonları
- Bootstrap confidence intervals
- Multi-objective optimization Pareto front
- Robust optimization sonuçları
- Time series optimization grafikleri
- Neural network training curves

---

## Ödev Değerlendirme Kriterleri

### Her Ödev İçin:
1. **Kod Kalitesi** (20%): Temiz, okunabilir, modüler kod
2. **Doğruluk** (30%): Matematiksel hesaplamaların doğruluğu
3. **Kapsamlılık** (25%): Tüm gereksinimlerin karşılanması
4. **Analiz Derinliği** (15%): Sonuçların yorumlanması
5. **Görselleştirme** (10%): Etkili grafikler ve tablolar

### Bonus Puanlar:
- Ek özellikler ekleme
- Performans optimizasyonu
- Yaratıcı çözümler
- Dokümantasyon kalitesi

### Teslim Formatı:
- Jupyter notebook (.ipynb)
- Markdown açıklamalar
- Kod yorumları
- Sonuç analizleri
- Görselleştirmeler

Her ödev, NumPy'ın farklı yönlerini test eder ve gerçek dünya uygulamalarını simüle eder. Ödevler zorluk seviyesi artacak şekilde sıralanmıştır.
