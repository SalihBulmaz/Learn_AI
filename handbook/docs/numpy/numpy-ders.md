# 1. Ay 2. Hafta - NumPy ile Matematiksel İşlemler ve Array Manipülasyonu

## 🎯 Bu Haftanın Hedefleri
- NumPy'ın veri bilimindeki kritik rolünü anlamak
- N-boyutlu array yapılarını kavramak ve kullanmak
- Vectorized işlemlerin gücünü deneyimlemek
- İstatistiksel analiz için temel araçları öğrenmek
- Pandas ile NumPy entegrasyonunu keşfetmek

---

## 📚 NumPy'ye Giriş: Bilimsel Hesaplamanın Temeli

### NumPy Nedir ve Neden Bu Kadar Kritik?

NumPy (Numerical Python), Python'da bilimsel hesaplama için geliştirilmiş temel kütüphanedir. Adeta Python'un matematiksel beyni gibi düşünebiliriz. Pandas'ın bile altında NumPy çalışır.

**NumPy'ın Dünyayı Değiştiren Özellikleri:**

**1. N-Boyutlu Array (ndarray) Yapısı**
NumPy'ın kalbi ndarray'dir. Bu, Python listelerinden çok daha güçlü ve hızlı bir veri yapısıdır. Neden?

- **Homojen Veri**: Tüm elemanlar aynı tipte olmalı (int32, float64 vs.)
- **Contiguous Memory**: Veriler bellekte peş peşe saklanır
- **Vectorization**: Tek komutla tüm array'e işlem uygulanabilir
- **Broadcasting**: Farklı boyutlardaki array'leri matematiksel işlemlerde kullanabilme

**2. C Seviyesinde Performans**
NumPy'ın alt yapısı C ve Fortran ile yazılmıştır. Bu, Python kodunun C hızında çalışması anlamına gelir.

```python
import numpy as np
import time

# Python listesi ile işlem
python_list = list(range(1000000))
start_time = time.time()
python_result = [x * 2 for x in python_list]
python_time = time.time() - start_time
print(f"Python listesi ile işlem süresi: {python_time:.4f} saniye")

# NumPy array ile işlem
numpy_array = np.arange(1000000)
start_time = time.time()
numpy_result = numpy_array * 2
numpy_time = time.time() - start_time
print(f"NumPy array ile işlem süresi: {numpy_time:.4f} saniye")
print(f"NumPy {python_time/numpy_time:.1f}x daha hızlı!")
```


Bu örnek neden NumPy'ın bu kadar önemli olduğunu gösterir. Büyük veri setlerinde bu hız farkı hayati önem taşır.

### Python Listesi vs NumPy Array: Derinlemesine Karşılaştırma

**Python Listesi Yapısı:**

```python
# Python listesi oluşturma
python_list = [1, 2, 3, 4, 5]
print(f"Python listesi: {python_list}")
print(f"Liste elemanının tipi: {type(python_list[0])}")
print(f"Listenin tipi: {type(python_list)}")

# Python listesi esnektir ama yavaştır
mixed_list = [1, "merhaba", 3.14, True]
print(f"Karışık liste: {mixed_list}")
```


**NumPy Array Yapısı:**

```python
import numpy as np

# NumPy array oluşturma
numpy_array = np.array([1, 2, 3, 4, 5])
print(f"NumPy array: {numpy_array}")
print(f"Array elemanının tipi: {numpy_array.dtype}")
print(f"Array'in tipi: {type(numpy_array)}")
print(f"Array'in boyutu: {numpy_array.shape}")
print(f"Array'in boyut sayısı: {numpy_array.ndim}")
```


**Neden NumPy Array'ler Daha Hızlı?**

1. **Memory Layout**: Python listesinde her eleman ayrı bir object'tir ve bellekte dağınık şekilde saklanır. NumPy array'de tüm veriler peş peşe saklanır.

2. **Type Homogeneity**: Tüm elemanlar aynı tipte olduğu için, her elemana erişim aynı sürede olur.

3. **Vectorized Operations**: Döngü kullanmak yerine, tüm array'e aynı anda işlem uygulanır.

```python
# Memory efficiency karşılaştırması
import sys

python_list = [1, 2, 3, 4, 5] * 1000
numpy_array = np.array([1, 2, 3, 4, 5] * 1000)

print(f"Python listesi memory kullanımı: {sys.getsizeof(python_list)} bytes")
print(f"NumPy array memory kullanımı: {numpy_array.nbytes} bytes")
print(f"NumPy {sys.getsizeof(python_list) / numpy_array.nbytes:.1f}x daha az memory kullanıyor")
```


---

## 🏗️ NumPy Array Oluşturma Yöntemleri

### 1. Temel Array Oluşturma Yöntemleri

**Python Listesinden Array Oluşturma:**

```python
# 1D array oluşturma
liste_1d = [1, 2, 3, 4, 5]
array_1d = np.array(liste_1d)
print(f"1D Array: {array_1d}")
print(f"Shape: {array_1d.shape}")  # (5,) - 5 elemanlı 1D array

# 2D array oluşturma (matrix)
liste_2d = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
array_2d = np.array(liste_2d)
print(f"2D Array:\n{array_2d}")
print(f"Shape: {array_2d.shape}")  # (3, 3) - 3x3 matrix

# 3D array oluşturma
liste_3d = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
array_3d = np.array(liste_3d)
print(f"3D Array:\n{array_3d}")
print(f"Shape: {array_3d.shape}")  # (2, 2, 2) - 2x2x2 tensor
```


**Veri Tipi Kontrolü ve Dönüştürme:**

```python
# Farklı veri tipleri ile array oluşturma
int_array = np.array([1, 2, 3], dtype=np.int32)
float_array = np.array([1, 2, 3], dtype=np.float64)
bool_array = np.array([True, False, True], dtype=np.bool_)

print(f"Integer array: {int_array}, dtype: {int_array.dtype}")
print(f"Float array: {float_array}, dtype: {float_array.dtype}")
print(f"Boolean array: {bool_array}, dtype: {bool_array.dtype}")

# Veri tipi dönüştürme
float_to_int = float_array.astype(np.int32)
print(f"Float'tan int'e dönüştürülen: {float_to_int}")
```


### 2. Özel Array Oluşturma Fonksiyonları

**Sıfır ve Bir Matrisleri:**

```python
# Sıfır matrisi oluşturma
zeros_1d = np.zeros(5)  # 1D array, 5 adet sıfır
zeros_2d = np.zeros((3, 4))  # 3x4 sıfır matrisi
print(f"Zeros 1D: {zeros_1d}")
print(f"Zeros 2D:\n{zeros_2d}")

# Bir matrisi oluşturma
ones_1d = np.ones(4)
ones_2d = np.ones((2, 3))
print(f"Ones 1D: {ones_1d}")
print(f"Ones 2D:\n{ones_2d}")

# Belirli bir değerle dolu matrix
full_array = np.full((3, 3), 7)  # 3x3 matrix, tüm değerler 7
print(f"Full array (7 ile dolu):\n{full_array}")
```


**Aralık ve Dizi Oluşturma:**

```python
# arange() - Python'un range() fonksiyonuna benzer
arange_array = np.arange(0, 10, 2)  # 0'dan 10'a kadar, 2'şer artan
print(f"Arange array: {arange_array}")

# linspace() - Belirli aralıkta eşit boşluklarla sayılar
linspace_array = np.linspace(0, 1, 11)  # 0 ile 1 arasında 11 eşit parça
print(f"Linspace array: {linspace_array}")

# logspace() - Logaritmik aralıkta sayılar
logspace_array = np.logspace(0, 2, 5)  # 10^0'dan 10^2'ye kadar 5 sayı
print(f"Logspace array: {logspace_array}")
```


**Rastgele Sayı Üretme:**

```python
# Rastgele sayı üretimi için seed ayarlama (tekrarlanabilir sonuçlar)
np.random.seed(42)

# 0 ile 1 arasında rastgele sayılar
random_uniform = np.random.random((2, 3))
print(f"Random uniform [0,1):\n{random_uniform}")

# Belirli aralıkta rastgele tam sayılar
random_integers = np.random.randint(1, 100, (3, 3))
print(f"Random integers [1,100):\n{random_integers}")

# Normal dağılımdan rastgele sayılar (Gaussian)
random_normal = np.random.normal(0, 1, (2, 4))  # ortalama=0, std=1
print(f"Random normal (Gaussian):\n{random_normal}")
```


### 3. Özel Matrisler

**Birim Matrix (Identity Matrix):**

```python
# Birim matrix - köşegen elemanları 1, diğerleri 0
identity_3x3 = np.eye(3)
print(f"3x3 Birim Matrix:\n{identity_3x3}")

# Diagonal matrix - sadece köşegen elemanları belirtilen değerler
diagonal_matrix = np.diag([1, 2, 3, 4])
print(f"Diagonal Matrix:\n{diagonal_matrix}")
```


**Eye ve Diag Fonksiyonlarının Kullanım Alanları:**
- **Identity Matrix**: Linear algebra işlemlerinde, özellikle matrix çarpımlarında
- **Diagonal Matrix**: Covariance matrisleri, feature scaling işlemlerinde
- **Machine Learning**: Neural network'lerde weight initialization için

---

## 📐 Array Özellikleri ve Manipülasyon

### Array Özelliklerini Anlama

**Temel Özellikler:**

```python
# Örnek 3D array oluşturalım
sample_array = np.random.randint(0, 100, (2, 3, 4))
print(f"Sample array:\n{sample_array}")

print(f"\n=== ARRAY ÖZELLİKLERİ ===")
print(f"Shape (boyutlar): {sample_array.shape}")  # (2, 3, 4)
print(f"Ndim (boyut sayısı): {sample_array.ndim}")  # 3
print(f"Size (toplam eleman sayısı): {sample_array.size}")  # 2*3*4 = 24
print(f"Dtype (veri tipi): {sample_array.dtype}")  # int64 (sistemə göre değişir)
print(f"Itemsize (her elemanın byte boyutu): {sample_array.itemsize}")
print(f"Nbytes (toplam byte kullanımı): {sample_array.nbytes}")
```


**Shape Kavramını Derinlemesine Anlama:**

```python
# Shape tuple'ını parçalayalım
height, width, depth = sample_array.shape
print(f"Height (yükseklik): {height}")
print(f"Width (genişlik): {width}")
print(f"Depth (derinlik): {depth}")

# Her boyuttaki eleman sayıları
print(f"İlk boyutta {height} adet {width}x{depth} matrix var")
print(f"Her matrix {width} satır ve {depth} sütundan oluşuyor")
```


### Array Yeniden Şekillendirme (Reshaping)

**Reshape İşlemi:**

```python
# 1D array'i farklı şekillere dönüştürme
original_array = np.arange(12)  # [0, 1, 2, ..., 11]
print(f"Original 1D array: {original_array}")

# 2D'ye dönüştürme
reshaped_2d = original_array.reshape(3, 4)  # 3 satır, 4 sütun
print(f"3x4 Matrix:\n{reshaped_2d}")

reshaped_2d_alt = original_array.reshape(4, 3)  # 4 satır, 3 sütun
print(f"4x3 Matrix:\n{reshaped_2d_alt}")

# 3D'ye dönüştürme
reshaped_3d = original_array.reshape(2, 2, 3)  # 2x2x3 tensor
print(f"2x2x3 Tensor:\n{reshaped_3d}")
```


**Reshape Kuralları ve İpuçları:**

```python
# Reshape'te toplam eleman sayısı korunmalı
print(f"Original size: {original_array.size}")
print(f"Reshaped size: {reshaped_2d.size}")
print(f"Aynı mı? {original_array.size == reshaped_2d.size}")

# -1 kullanarak otomatik boyut hesaplama
auto_reshaped = original_array.reshape(3, -1)  # 3 satır, sütun sayısını otomatik hesapla
print(f"Auto reshaped (3, -1):\n{auto_reshaped}")

# Flatten - array'i 1D'ye dönüştürme
flattened = reshaped_2d.flatten()
print(f"Flattened array: {flattened}")
```


**Transpose İşlemi:**

```python
# Matrix'in satır ve sütunlarını değiştirme
matrix = np.array([[1, 2, 3], [4, 5, 6]])
print(f"Original matrix (2x3):\n{matrix}")

# Transpose işlemi
transposed = matrix.T  # veya matrix.transpose()
print(f"Transposed matrix (3x2):\n{transposed}")

# 3D array'lerde transpose
array_3d = np.random.randint(0, 10, (2, 3, 4))
print(f"3D array shape: {array_3d.shape}")
transposed_3d = array_3d.transpose(2, 0, 1)  # Boyutları yeniden sıralama
print(f"Transposed 3D shape: {transposed_3d.shape}")
```


---

## 🎯 Array İndeksleme ve Dilimleme

### Temel İndeksleme

**1D Array İndeksleme:**

```python
# 1D array oluşturma
arr_1d = np.array([10, 20, 30, 40, 50])
print(f"1D Array: {arr_1d}")

# Tek eleman erişimi
print(f"İlk eleman (index 0): {arr_1d[0]}")
print(f"Son eleman (index -1): {arr_1d[-1]}")
print(f"Üçüncü eleman (index 2): {arr_1d[2]}")

# Dilimleme (slicing)
print(f"İlk üç eleman: {arr_1d[:3]}")
print(f"Son iki eleman: {arr_1d[-2:]}")
print(f"Ortadaki elemanlar: {arr_1d[1:4]}")
print(f"İkişer atlayarak: {arr_1d[::2]}")
```


**2D Array İndeksleme:**

```python
# 2D array oluşturma
arr_2d = np.array([[1, 2, 3, 4],
                   [5, 6, 7, 8],
                   [9, 10, 11, 12]])
print(f"2D Array:\n{arr_2d}")

# Tek eleman erişimi - [satır, sütun]
print(f"[0,0] pozisyonundaki eleman: {arr_2d[0, 0]}")  # 1
print(f"[1,2] pozisyonundaki eleman: {arr_2d[1, 2]}")  # 7
print(f"[2,-1] pozisyonundaki eleman: {arr_2d[2, -1]}")  # 12

# Satır erişimi
print(f"İlk satır: {arr_2d[0]}")  # [1, 2, 3, 4]
print(f"Son satır: {arr_2d[-1]}")  # [9, 10, 11, 12]

# Sütun erişimi
print(f"İlk sütun: {arr_2d[:, 0]}")  # [1, 5, 9]
print(f"Son sütun: {arr_2d[:, -1]}")  # [4, 8, 12]
```


### Gelişmiş Dilimleme Teknikleri

**2D Array'de Alt Matrisler:**

```python
# Alt matrix seçimi
print(f"Sol üst 2x2 matrix:\n{arr_2d[:2, :2]}")
# Çıktı: [[1, 2],
#         [5, 6]]

print(f"Sağ alt 2x2 matrix:\n{arr_2d[1:, 2:]}")
# Çıktı: [[7, 8],
#         [11, 12]]

print(f"Ortadaki elemanlar:\n{arr_2d[1:, 1:3]}")
# Çıktı: [[6, 7],
#         [10, 11]]

# İkişer atlayarak seçim
print(f"İkişer atlayarak seçim:\n{arr_2d[::2, ::2]}")
# Çıktı: [[1, 3],
#         [9, 11]]
```


**Boolean İndeksleme:**

```python
# Boolean mask oluşturma
mask = arr_2d > 6
print(f"6'dan büyük elemanlar için mask:\n{mask}")

# Boolean mask ile filtreleme
filtered_elements = arr_2d[mask]
print(f"6'dan büyük elemanlar: {filtered_elements}")

# Koşullu değer değiştirme
arr_copy = arr_2d.copy()
arr_copy[arr_copy > 6] = 999
print(f"6'dan büyük elemanlar 999 yapıldı:\n{arr_copy}")
```


**Fancy İndeksleme:**

```python
# Belirli satırları seçme
selected_rows = arr_2d[[0, 2]]  # 0. ve 2. satırlar
print(f"0. ve 2. satırlar:\n{selected_rows}")

# Belirli pozisyonları seçme
row_indices = [0, 1, 2]
col_indices = [1, 2, 3]
selected_elements = arr_2d[row_indices, col_indices]
print(f"Belirli pozisyonlardan elemanlar: {selected_elements}")
# [arr_2d[0,1], arr_2d[1,2], arr_2d[2,3]] = [2, 7, 12]
```


---

## ➕ Matematiksel İşlemler ve Vectorization

### Element-wise İşlemler

**Temel Aritmetik İşlemler:**

```python
# İki array oluşturalım
arr1 = np.array([1, 2, 3, 4])
arr2 = np.array([5, 6, 7, 8])

print(f"Array 1: {arr1}")
print(f"Array 2: {arr2}")

# Element-wise işlemler
print(f"Toplama: {arr1 + arr2}")  # [6, 8, 10, 12]
print(f"Çıkarma: {arr2 - arr1}")  # [4, 4, 4, 4]
print(f"Çarpma: {arr1 * arr2}")  # [5, 12, 21, 32]
print(f"Bölme: {arr2 / arr1}")  # [5.0, 3.0, 2.33, 2.0]
print(f"Üs alma: {arr1 ** 2}")  # [1, 4, 9, 16]
print(f"Mod alma: {arr2 % arr1}")  # [0, 0, 1, 0]
```


**Scalar İşlemler (Broadcasting):**

```python
# Array ile scalar işlemler
print(f"Array + 10: {arr1 + 10}")  # [11, 12, 13, 14]
print(f"Array * 3: {arr1 * 3}")   # [3, 6, 9, 12]
print(f"Array / 2: {arr1 / 2}")   # [0.5, 1.0, 1.5, 2.0]
```


**Matrix İşlemleri:**

```python
# 2D array'ler ile işlemler
matrix1 = np.array([[1, 2], [3, 4]])
matrix2 = np.array([[5, 6], [7, 8]])

print(f"Matrix 1:\n{matrix1}")
print(f"Matrix 2:\n{matrix2}")

# Element-wise çarpım
print(f"Element-wise çarpım:\n{matrix1 * matrix2}")

# Matrix çarpımı (dot product)
print(f"Matrix çarpımı (dot):\n{np.dot(matrix1, matrix2)}")
print(f"Matrix çarpımı (@):\n{matrix1 @ matrix2}")  # Python 3.5+
```


### Karşılaştırma İşlemleri

**Element-wise Karşılaştırmalar:**

```python
arr = np.array([1, 5, 3, 8, 2])
print(f"Array: {arr}")

# Karşılaştırma işlemleri Boolean array döner
print(f"5'ten büyük: {arr > 5}")  # [False, False, False, True, False]
print(f"3'e eşit: {arr == 3}")   # [False, False, True, False, False]
print(f"4'ten küçük: {arr < 4}") # [True, False, True, False, True]

# Boolean array'leri birleştirme
print(f"3'ten büyük VE 6'dan küçük: {(arr > 3) & (arr < 6)}")
print(f"2'ye eşit VEYA 8'e eşit: {(arr == 2) | (arr == 8)}")
```


### Universal Functions (ufuncs)

**Matematiksel Fonksiyonlar:**

```python
# Trigonometrik fonksiyonlar
angles = np.array([0, np.pi/6, np.pi/4, np.pi/3, np.pi/2])
print(f"Açılar (radyan): {angles}")
print(f"Sin değerleri: {np.sin(angles)}")
print(f"Cos değerleri: {np.cos(angles)}")
print(f"Tan değerleri: {np.tan(angles)}")

# Exponential ve logaritma fonksiyonları
numbers = np.array([1, 2, 3, 4, 5])
print(f"e^x: {np.exp(numbers)}")
print(f"log(x): {np.log(numbers)}")
print(f"log10(x): {np.log10(numbers)}")
print(f"sqrt(x): {np.sqrt(numbers)}")
```


**Aggregate Fonksiyonlar:**

```python
# İstatistiksel fonksiyonlar
data = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(f"Data:\n{data}")

print(f"Toplam (sum): {np.sum(data)}")
print(f"Ortalama (mean): {np.mean(data)}")
print(f"Medyan (median): {np.median(data)}")
print(f"Standart sapma (std): {np.std(data)}")
print(f"Varyans (var): {np.var(data)}")
print(f"Minimum: {np.min(data)}")
print(f"Maksimum: {np.max(data)}")

# Axis parametresi ile boyut bazlı işlemler
print(f"Satır bazlı toplam (axis=1): {np.sum(data, axis=1)}")  # [6, 15, 24]
print(f"Sütun bazlı toplam (axis=0): {np.sum(data, axis=0)}")  # [12, 15, 18]
```


---

## 📊 İstatistiksel Analiz ve Agregasyon

### Temel İstatistiksel Ölçüler

**Merkezi Eğilim Ölçüleri:**

```python
# Örnek veri seti oluşturalım - öğrenci notları
np.random.seed(42)
student_grades = np.random.normal(75, 15, 100)  # ortalama 75, std 15, 100 öğrenci
print(f"İlk 10 öğrenci notu: {student_grades[:10]}")

# Merkezi eğilim ölçüleri
mean_grade = np.mean(student_grades)
median_grade = np.median(student_grades)
print(f"Ortalama not: {mean_grade:.2f}")
print(f"Medyan not: {median_grade:.2f}")

# Mode hesaplama (NumPy'da doğrudan yok, en sık görülen değer)
unique_values, counts = np.unique(student_grades.astype(int), return_counts=True)
mode_grade = unique_values[np.argmax(counts)]
print(f"Mod (en sık not): {mode_grade}")
```


**Dağılım Ölçüleri:**

```python
# Yayılım ölçüleri
std_grade = np.std(student_grades)
var_grade = np.var(student_grades)
range_grade = np.max(student_grades) - np.min(student_grades)

print(f"Standart sapma: {std_grade:.2f}")
print(f"Varyans: {var_grade:.2f}")
print(f"Ranj (max-min): {range_grade:.2f}")

# Percentile hesaplamaları
percentiles = np.percentile(student_grades, [25, 50, 75, 90, 95])
print(f"25. percentile: {percentiles[0]:.2f}")
print(f"50. percentile (medyan): {percentiles[1]:.2f}")
print(f"75. percentile: {percentiles[2]:.2f}")
print(f"90. percentile: {percentiles[3]:.2f}")
print(f"95. percentile: {percentiles[4]:.2f}")
```


### Çok Boyutlu Veri Analizi

**2D Array'lerde İstatistikler:**

```python
# Örnek: Farklı sınıfların farklı derslerdeki notları
# Satırlar: sınıflar, Sütunlar: dersler (Mat, Fen, Türkçe, İngilizce)
class_grades = np.random.randint(60, 100, (5, 4))
print(f"Sınıf notları (5 sınıf, 4 ders):\n{class_grades}")

# Genel istatistikler
print(f"Genel ortalama: {np.mean(class_grades):.2f}")

# Sınıf bazlı istatistikler (axis=1 - satırlar boyunca)
class_averages = np.mean(class_grades, axis=1)
print(f"Sınıf ortalamaları: {class_averages}")

# Ders bazlı istatistikler (axis=0 - sütunlar boyunca)
subject_averages = np.mean(class_grades, axis=0)
print(f"Ders ortalamaları: {subject_averages}")

# En iyi ve en kötü performans
best_class = np.argmax(class_averages)
worst_class = np.argmin(class_averages)
print(f"En başarılı sınıf: {best_class + 1} (ortalama: {class_averages[best_class]:.2f})")
print(f"En düşük sınıf: {worst_class + 1} (ortalama: {class_averages[worst_class]:.2f})")
```


**Korelasyon Analizi:**

```python
# Korelasyon matrisi hesaplama
correlation_matrix = np.corrcoef(class_grades.T)  # Transpose gerekli
print(f"Dersler arası korelasyon matrisi:\n{correlation_matrix}")

# Derslerin birbirleriyle ilişkisi
subjects = ['Matematik', 'Fen', 'Türkçe', 'İngilizce']
print(f"\nDersler arası korelasyonlar:")
for i in range(len(subjects)):
    for j in range(i+1, len(subjects)):
        corr = correlation_matrix[i, j]
        print(f"{subjects[i]} - {subjects[j]}: {corr:.3f}")
```


### Conditional Statistics (Koşullu İstatistikler)

**Koşullu Analiz:**

```python
# Başarılı öğrenciler (75 üzeri) analizi
high_achievers = student_grades[student_grades >= 75]
low_achievers = student_grades[student_grades < 75]

print(f"Toplam öğrenci sayısı: {len(student_grades)}")
print(f"Başarılı öğrenci sayısı (75+): {len(high_achievers)}")
print(f"Başarılı öğrenci oranı: {len(high_achievers)/len(student_grades)*100:.1f}%")

print(f"Başarılı öğrencilerin ortalaması: {np.mean(high_achievers):.2f}")
print(f"Başarısız öğrencilerin ortalaması: {np.mean(low_achievers):.2f}")

# Notlara göre kategorilendirme
grade_categories = np.select(
    [student_grades >= 90, student_grades >= 80, student_grades >= 70, student_grades >= 60],
    ['A', 'B', 'C', 'D'],
    default='F'
)

unique_grades, grade_counts = np.unique(grade_categories, return_counts=True)
print(f"\nNot dağılımı:")
for grade, count in zip(unique_grades, grade_counts):
    print(f"Harf notu {grade}: {count} öğrenci ({count/len(student_grades)*100:.1f}%)")
```


---

## 🔄 Broadcasting: NumPy'ın Süper Gücü

### Broadcasting Kavramı

Broadcasting, NumPy'ın en güçlü özelliklerinden biridir. Farklı boyutlardaki array'leri matematiksel işlemlerde kullanabilmemizi sağlar.

**Temel Broadcasting Örnekleri:**

```python
# Scalar ile array işlemi (basit broadcasting)
arr = np.array([1, 2, 3, 4])
result = arr + 10  # 10, her elemana eklenir
print(f"Array + scalar: {result}")

# 1D array ile 2D array işlemi
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])
vector = np.array([10, 20, 30])

# Vector her satıra eklenir
broadcast_result = matrix + vector
print(f"Matrix + vector broadcasting:\n{broadcast_result}")
```


**Broadcasting Kuralları:**

```python
print("=== BROADCASTING KURALLARI ===")
print("1. Array'ler sağdan başlayarak boyut boyut karşılaştırılır")
print("2. İki boyut uyumludur eğer:")
print("   - Eşitse")
print("   - Biri 1 ise")
print("   - Biri eksikse (None)")

# Örnekler
a = np.array([[1, 2, 3]])  # Shape: (1, 3)
b = np.array([[1], [2], [3]])  # Shape: (3, 1)
c = a + b  # Sonuç: (3, 3)
print(f"(1,3) + (3,1) = (3,3):\n{c}")

# Daha karmaşık örnek
matrix_3d = np.random.randint(0, 10, (2, 3, 4))  # Shape: (2, 3, 4)
vector_2d = np.random.randint(0, 5, (3, 4))      # Shape: (3, 4)
result_3d = matrix_3d + vector_2d  # Broadcasting: (2, 3, 4)
print(f"3D matrix shape: {matrix_3d.shape}")
print(f"2D vector shape: {vector_2d.shape}")
print(f"Result shape: {result_3d.shape}")
```


**Gerçek Dünya Broadcasting Örneği:**

```python
# Örnek: Farklı şehirlerdeki farklı ürünlerin satış verileri
# Satırlar: şehirler, Sütunlar: ürünler
sales_data = np.array([[100, 150, 200],  # İstanbul
                       [80, 120, 180],   # Ankara  
                       [90, 140, 190]])  # İzmir

# KDV oranları (ürün bazında)
tax_rates = np.array([0.18, 0.08, 0.25])  # %18, %8, %25

# Broadcasting ile KDV hesaplama
sales_with_tax = sales_data * (1 + tax_rates)
print(f"KDV'li satış verileri:\n{sales_with_tax}")

# Şehir bazında indirim (her şehre farklı indirim)
city_discounts = np.array([[0.1], [0.15], [0.05]])  # %10, %15, %5

# İndirimli fiyatlar
discounted_sales = sales_with_tax * (1 - city_discounts)
print(f"İndirimli satış verileri:\n{discounted_sales}")
```


---

## 🧮 Linear Algebra İşlemleri

### Temel Matrix İşlemleri

**Matrix Çarpımı ve Özellikleri:**

```python
# Matrix tanımlamaları
A = np.array([[1, 2],
              [3, 4]])
B = np.array([[5, 6],
              [7, 8]])

print(f"Matrix A:\n{A}")
print(f"Matrix B:\n{B}")

# Matrix çarpımı (farklı yöntemler)
dot_product = np.dot(A, B)
matmul_product = A @ B
print(f"A @ B (matrix çarpımı):\n{dot_product}")

# Element-wise çarpım ile karşılaştırma
element_wise = A * B
print(f"A * B (element-wise):\n{element_wise}")

# Matrix transpozesi
A_transpose = A.T
print(f"A transpose:\n{A_transpose}")
```


**Determinant ve Inverse:**

```python
# Linear algebra fonksiyonları için linalg modülü
from numpy.linalg import det, inv, eig

# Determinant hesaplama
det_A = det(A)
print(f"A'nın determinantı: {det_A}")

# Matrix inverse (ters matrix)
if det_A != 0:  # Determinant 0 değilse inverse mevcut
    A_inverse = inv(A)
    print(f"A'nın inverse'i:\n{A_inverse}")
    
    # Doğrulama: A * A^(-1) = I (birim matrix)
    identity_check = A @ A_inverse
    print(f"A @ A^(-1) (birim matrix olmalı):\n{identity_check}")
else:
    print("Matrix tekil (singular), inverse'i yok")
```


**Eigenvalues ve Eigenvectors:**

```python
# Eigenvalue ve eigenvector hesaplama
eigenvalues, eigenvectors = eig(A)
print(f"Eigenvalues: {eigenvalues}")
print(f"Eigenvectors:\n{eigenvectors}")

# Eigenvalue/eigenvector doğrulaması
for i in range(len(eigenvalues)):
    λ = eigenvalues[i]
    v = eigenvectors[:, i]
    
    # A*v = λ*v olmalı
    left_side = A @ v
    right_side = λ * v
    print(f"Eigenvalue {i+1} doğrulaması:")
    print(f"A @ v = {left_side}")
    print(f"λ @ v = {right_side}")
    print(f"Eşit mi? {np.allclose(left_side, right_side)}")
```


### Daha Karmaşık Linear Algebra

**Matrix Norm ve Rank:**

```python
# Matrix normları
from numpy.linalg import norm, matrix_rank

# Frobenius norm (tüm elemanların karelerinin toplamının karekökü)
frobenius_norm = norm(A, 'fro')
print(f"Frobenius norm: {frobenius_norm}")

# Matrix rank (bağımsız satır/sütun sayısı)
rank_A = matrix_rank(A)
print(f"Matrix rank: {rank_A}")

# Condition number (matrix'in numerik kararlılığı)
cond_A = np.linalg.cond(A)
print(f"Condition number: {cond_A}")
```


**SVD (Singular Value Decomposition):**

```python
# SVD ayrıştırması
U, S, Vt = np.linalg.svd(A)
print(f"U matrix:\n{U}")
print(f"Singular values: {S}")
print(f"V transpose:\n{Vt}")

# SVD'den orijinal matrix'i geri elde etme
A_reconstructed = U @ np.diag(S) @ Vt
print(f"Reconstructed A:\n{A_reconstructed}")
print(f"Orijinal ile aynı mı? {np.allclose(A, A_reconstructed)}")
```


---

## 🔗 Pandas ile NumPy Entegrasyonu

### DataFrame'den NumPy Array'e Dönüşüm

**Temel Dönüşümler:**

```python
import pandas as pd

# Örnek DataFrame oluşturma
data = {
    'Ad': ['Ali', 'Ayşe', 'Mehmet', 'Fatma'],
    'Yaş': [25, 30, 35, 28],
    'Maaş': [5000, 6500, 7200, 5800],
    'Deneyim': [2, 5, 8, 3]
}
df = pd.DataFrame(data)
print(f"DataFrame:\n{df}")

# Sadece numerik sütunları NumPy array'e çevirme
numeric_columns = ['Yaş', 'Maaş', 'Deneyim']
numpy_array = df[numeric_columns].values
print(f"NumPy array shape: {numpy_array.shape}")
print(f"NumPy array:\n{numpy_array}")

# Tek sütunu array'e çevirme
age_array = df['Yaş'].to_numpy()
print(f"Yaş array'i: {age_array}")
```


**NumPy ile DataFrame Analizi:**

```python
# NumPy fonksiyonlarını DataFrame'de kullanma
print(f"Yaş ortalaması: {np.mean(numpy_array[:, 0]):.2f}")
print(f"Maaş medyanı: {np.median(numpy_array[:, 1]):.2f}")
print(f"Deneyim standart sapması: {np.std(numpy_array[:, 2]):.2f}")

# Correlation matrix hesaplama
correlation_matrix = np.corrcoef(numpy_array.T)
print(f"Korelasyon matrisi:\n{correlation_matrix}")

# DataFrame'e geri dönüştürme
correlation_df = pd.DataFrame(correlation_matrix, 
                            columns=numeric_columns, 
                            index=numeric_columns)
print(f"Korelasyon DataFrame:\n{correlation_df}")
```


### NumPy ile Feature Engineering

**Yeni Özellikler Oluşturma:**

```python
# Maaş ve deneyim verilerini kullanarak yeni özellikler
salary_array = numpy_array[:, 1]  # Maaş sütunu
experience_array = numpy_array[:, 2]  # Deneyim sütunu

# Birim deneyim başına maaş
salary_per_experience = salary_array / (experience_array + 1)  # +1 to avoid division by zero
print(f"Birim deneyim başına maaş: {salary_per_experience}")

# Maaş kategorileri (quantile-based)
salary_quartiles = np.percentile(salary_array, [25, 50, 75])
salary_categories = np.select(
    [salary_array <= salary_quartiles[0],
     salary_array <= salary_quartiles[1], 
     salary_array <= salary_quartiles[2]],
    ['Düşük', 'Orta', 'Yüksek'],
    default='Çok Yüksek'
)
print(f"Maaş kategorileri: {salary_categories}")

# Yeni özellikleri DataFrame'e ekleme
df['Maaş_Per_Deneyim'] = salary_per_experience
df['Maaş_Kategorisi'] = salary_categories
print(f"Güncellenmiş DataFrame:\n{df}")
```


**Normalization ve Scaling:**

```python
# Min-Max normalization (0-1 arasına sıkıştırma)
def min_max_normalize(array):
    return (array - np.min(array)) / (np.max(array) - np.min(array))

# Z-score normalization (standard normal distribution)
def z_score_normalize(array):
    return (array - np.mean(array)) / np.std(array)

# Maaş verilerini normalize etme
salary_minmax = min_max_normalize(salary_array)
salary_zscore = z_score_normalize(salary_array)

print(f"Orijinal maaşlar: {salary_array}")
print(f"Min-Max normalize: {salary_minmax}")
print(f"Z-score normalize: {salary_zscore}")

# Tüm numerik verileri normalize etme
normalized_data = np.zeros_like(numpy_array, dtype=float)
for i in range(numpy_array.shape[1]):
    normalized_data[:, i] = z_score_normalize(numpy_array[:, i])

print(f"Tüm veriler normalize edildi:\n{normalized_data}")
```


---

## 🎲 İleri Seviye NumPy Konuları

### Random Number Generation

**Çeşitli Dağılımlardan Örnekleme:**

```python
# Random seed ayarlama (reproducible results)
np.random.seed(123)

# Farklı dağılımlardan örnekler
normal_samples = np.random.normal(0, 1, 1000)  # Normal dağılım
uniform_samples = np.random.uniform(0, 1, 1000)  # Uniform dağılım
exponential_samples = np.random.exponential(2, 1000)  # Exponential dağılım
binomial_samples = np.random.binomial(10, 0.3, 1000)  # Binomial dağılım

print(f"Normal dağılım - ortalama: {np.mean(normal_samples):.3f}, std: {np.std(normal_samples):.3f}")
print(f"Uniform dağılım - min: {np.min(uniform_samples):.3f}, max: {np.max(uniform_samples):.3f}")
print(f"Exponential dağılım - ortalama: {np.mean(exponential_samples):.3f}")
print(f"Binomial dağılım - ortalama: {np.mean(binomial_samples):.3f}")
```


**Monte Carlo Simülasyon Örneği:**

```python
# Pi sayısını Monte Carlo yöntemi ile hesaplama
def estimate_pi(n_samples):
    # Birim kare içinde rastgele noktalar oluşturma
    x = np.random.uniform(-1, 1, n_samples)
    y = np.random.uniform(-1, 1, n_samples)
    
    # Birim çember içinde olan noktaları sayma
    inside_circle = (x**2 + y**2) <= 1
    pi_estimate = 4 * np.sum(inside_circle) / n_samples
    
    return pi_estimate

# Farklı örneklem boyutları ile pi tahmini
sample_sizes = [100, 1000, 10000, 100000]
for size in sample_sizes:
    pi_est = estimate_pi(size)
    error = abs(pi_est - np.pi)
    print(f"n={size:6d}: π ≈ {pi_est:.6f}, hata: {error:.6f}")
```


### Memory Efficiency ve Performance

**Memory Layout ve Performans:**

```python
# C-style (row-major) vs Fortran-style (column-major) order
large_array_c = np.random.random((1000, 1000))  # Default: C-style
large_array_f = np.array(large_array_c, order='F')  # Fortran-style

print(f"C-style array flags: {large_array_c.flags}")
print(f"F-style array flags: {large_array_f.flags}")

# Satır bazlı erişim performance testi
import time

def test_row_access(array, order_name):
    start_time = time.time()
    for i in range(array.shape[0]):
        _ = array[i, :].sum()
    end_time = time.time()
    print(f"{order_name} - Satır erişimi: {end_time - start_time:.4f} saniye")

def test_column_access(array, order_name):
    start_time = time.time()
    for j in range(array.shape[1]):
        _ = array[:, j].sum()
    end_time = time.time()
    print(f"{order_name} - Sütun erişimi: {end_time - start_time:.4f} saniye")

test_row_access(large_array_c, "C-style")
test_column_access(large_array_c, "C-style")
test_row_access(large_array_f, "F-style")
test_column_access(large_array_f, "F-style")
```


**View vs Copy Kavramı:**

```python
# Orijinal array
original = np.array([1, 2, 3, 4, 5])
print(f"Orijinal array: {original}")

# View oluşturma (aynı memory'yi paylaşır)
view_array = original[1:4]  # Slice işlemi view oluşturur
print(f"View array: {view_array}")

# View'i değiştirme orijinali de etkiler
view_array[0] = 999
print(f"View değiştirildi: {view_array}")
print(f"Orijinal etkilendi: {original}")

# Copy oluşturma (yeni memory alanı)
copy_array = original.copy()
copy_array[0] = 888
print(f"Copy değiştirildi: {copy_array}")
print(f"Orijinal etkilenmedi: {original}")

# View mi copy mi kontrol etme
print(f"View mi? {view_array.base is original}")
print(f"Copy mi? {copy_array.base is None}")
```


---

## 🎯 Gerçek Dünya Uygulamaları

### Finansal Analiz Örneği

**Hisse Senedi Analizi:**

```python
# Günlük hisse senedi fiyatları (simülasyon)
np.random.seed(42)
days = 252  # 1 yıl (iş günü)
initial_price = 100

# Random walk modeli ile fiyat simülasyonu
daily_returns = np.random.normal(0.001, 0.02, days)  # Günlük getiri
prices = np.zeros(days + 1)
prices[0] = initial_price

for i in range(1, days + 1):
    prices[i] = prices[i-1] * (1 + daily_returns[i-1])

print(f"Başlangıç fiyatı: ${initial_price:.2f}")
print(f"Son fiyat: ${prices[-1]:.2f}")
print(f"Toplam getiri: %{((prices[-1]/prices[0]) - 1) * 100:.2f}")

# Finansal metrikler
annual_return = np.mean(daily_returns) * 252
annual_volatility = np.std(daily_returns) * np.sqrt(252)
sharpe_ratio = annual_return / annual_volatility

print(f"Yıllık getiri: %{annual_return * 100:.2f}")
print(f"Yıllık volatilite: %{annual_volatility * 100:.2f}")
print(f"Sharpe Ratio: {sharpe_ratio:.3f}")

# Moving averages
def moving_average(prices, window):
    return np.convolve(prices, np.ones(window)/window, mode='valid')

ma_20 = moving_average(prices, 20)
ma_50 = moving_average(prices, 50)

print(f"20 günlük hareketli ortalama (son): ${ma_20[-1]:.2f}")
print(f"50 günlük hareketli ortalama (son): ${ma_50[-1]:.2f}")
```


### Görüntü İşleme Temelleri

**NumPy ile Basit Görüntü İşleme:**

```python
# Sahte bir görüntü oluşturma (grayscale)
height, width = 100, 100
image = np.random.randint(0, 256, (height, width), dtype=np.uint8)

print(f"Görüntü boyutu: {image.shape}")
print(f"Piksel değer aralığı: {np.min(image)} - {np.max(image)}")

# Histogram analizi
histogram, bin_edges = np.histogram(image, bins=256, range=(0, 256))
print(f"En sık görülen piksel değeri: {np.argmax(histogram)}")

# Görüntü filtreleme (blur effect)
def apply_blur(image, kernel_size=3):
    blurred = np.zeros_like(image)
    offset = kernel_size // 2
    
    for i in range(offset, image.shape[0] - offset):
        for j in range(offset, image.shape[1] - offset):
            # Çevredeki piksellerin ortalaması
            neighborhood = image[i-offset:i+offset+1, j-offset:j+offset+1]
            blurred[i, j] = np.mean(neighborhood)
    
    return blurred

blurred_image = apply_blur(image)
print(f"Blur filtresi uygulandı")

# Edge detection (basit gradient)
def detect_edges(image):
    # Sobel operator benzeri
    grad_x = np.diff(image, axis=1)  # Yatay gradient
    grad_y = np.diff(image, axis=0)  # Dikey gradient
    
    # Gradient magnitude
    edges = np.sqrt(grad_x[:-1, :]**2 + grad_y[:, :-1]**2)
    return edges

edges = detect_edges(image)
print(f"Edge detection tamamlandı, edge image shape: {edges.shape}")
```


### Makine Öğrenmesi Hazırlığı

**Veri Ön İşleme için NumPy:**

```python
# Örnek dataset: İris benzeri veriler
np.random.seed(42)
n_samples = 150
n_features = 4

# 3 farklı sınıf (species) için veri oluşturma
class_0 = np.random.normal([5.0, 3.5, 1.5, 0.3], [0.5, 0.3, 0.2, 0.1], (50, n_features))
class_1 = np.random.normal([6.0, 3.0, 4.0, 1.3], [0.6, 0.3, 0.4, 0.2], (50, n_features))
class_2 = np.random.normal([6.5, 3.0, 5.5, 2.0], [0.7, 0.3, 0.5, 0.3], (50, n_features))

# Tüm veriyi birleştirme
X = np.vstack([class_0, class_1, class_2])
y = np.hstack([np.zeros(50), np.ones(50), np.full(50, 2)])

print(f"Dataset shape: {X.shape}")
print(f"Labels shape: {y.shape}")

# Feature statistics
feature_names = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']
for i, name in enumerate(feature_names):
    print(f"{name}: mean={np.mean(X[:, i]):.2f}, std={np.std(X[:, i]):.2f}")

# Feature scaling (standardization)
X_scaled = (X - np.mean(X, axis=0)) / np.std(X, axis=0)
print(f"Scaled features - mean: {np.mean(X_scaled, axis=0)}")
print(f"Scaled features - std: {np.std(X_scaled, axis=0)}")

# Train-test split
def train_test_split(X, y, test_size=0.2, random_state=42):
    np.random.seed(random_state)
    n_samples = X.shape[0]
    n_test = int(n_samples * test_size)
    
    # Random indices
    indices = np.random.permutation(n_samples)
    test_indices = indices[:n_test]
    train_indices = indices[n_test:]
    
    return X[train_indices], X[test_indices], y[train_indices], y[test_indices]

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y)
print(f"Train set: {X_train.shape}, Test set: {X_test.shape}")
```


---

## 📝 Hafta Sonu Kapsamlı Projesi

### Proje: Öğrenci Performans Analiz Sistemi

**Veri Oluşturma ve Hazırlama:**

```python
# Kapsamlı öğrenci performans analizi
np.random.seed(42)

# 200 öğrenci, 6 ders
n_students = 200
subjects = ['Matematik', 'Fen', 'Türkçe', 'İngilizce', 'Tarih', 'Coğrafya']
n_subjects = len(subjects)

# Öğrenci bilgileri
student_ages = np.random.randint(15, 19, n_students)
study_hours = np.random.exponential(3, n_students)  # Haftalık çalışma saati
family_income = np.random.lognormal(10, 0.5, n_students)  # Aile geliri

# Notlar (çeşitli faktörlere bağlı)
base_grades = np.random.normal(75, 15, (n_students, n_subjects))

# Yaşın etkisi (küçük)
age_effect = (student_ages.reshape(-1, 1) - 16) * 2

# Çalışma saatinin etkisi
study_effect = np.clip(study_hours.reshape(-1, 1) * 3, 0, 20)

# Gelir etkisi (logaritmik)
income_effect = np.log(family_income).reshape(-1, 1) * 2

# Final notları hesaplama
final_grades = base_grades + age_effect + study_effect + income_effect
final_grades = np.clip(final_grades, 0, 100)  # 0-100 aralığında sınırla

print(f"Öğrenci sayısı: {n_students}")
print(f"Ders sayısı: {n_subjects}")
print(f"Not matrisi boyutu: {final_grades.shape}")
```


**İstatistiksel Analiz:**

```python
# Genel istatistikler
print("=== GENEL İSTATİSTİKLER ===")
overall_mean = np.mean(final_grades)
overall_std = np.std(final_grades)
print(f"Genel ortalama: {overall_mean:.2f}")
print(f"Genel standart sapma: {overall_std:.2f}")

# Ders bazlı analiz
print("\n=== DERS BAZLI ANALİZ ===")
subject_stats = np.array([
    np.mean(final_grades, axis=0),  # Ortalamalar
    np.std(final_grades, axis=0),   # Standart sapmalar
    np.min(final_grades, axis=0),   # Minimumlar
    np.max(final_grades, axis=0)    # Maksimumlar
]).T

for i, subject in enumerate(subjects):
    print(f"{subject:10s}: Ort={subject_stats[i,0]:.1f}, "
          f"Std={subject_stats[i,1]:.1f}, "
          f"Min={subject_stats[i,2]:.0f}, "
          f"Max={subject_stats[i,3]:.0f}")

# En başarılı ve en başarısız öğrenciler
student_averages = np.mean(final_grades, axis=1)
best_student_idx = np.argmax(student_averages)
worst_student_idx = np.argmin(student_averages)

print(f"\n=== ÖĞRENB Ci PERFORMANSI ===")
print(f"En başarılı öğrenci #{best_student_idx}: {student_averages[best_student_idx]:.2f}")
print(f"En başarısız öğrenci #{worst_student_idx}: {student_averages[worst_student_idx]:.2f}")
```

