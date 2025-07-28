# 1. Ay 1. Hafta - Pandas ile Veri Manipülasyonu

## 🎯 Bu Haftanın Hedefleri
- Pandas kütüphanesinin temellerini öğrenmek
- CSV dosyalarını okuma, yazma ve temel işlemler yapabilmek
- Veri temizleme ve filtreleme tekniklerini kavramak
- DataFrame ve Series yapılarını etkili kullanabilmek

## 📚 Teorik Bilgiler

### Pandas Nedir?
Pandas (Python Data Analysis Library), veri analizi ve manipülasyonu için geliştirilmiş güçlü bir Python kütüphanesidir. İki ana veri yapısı sunar:
- **Series**: Tek boyutlu etiketli veri yapısı (Excel'deki bir sütun gibi)
- **DataFrame**: İki boyutlu etiketli veri yapısı (Excel tablosu gibi)

### Neden Pandas?
- Excel'den çok daha hızlı ve güçlü
- Büyük veri setleriyle çalışabilir (milyonlarca satır)
- Gelişmiş veri temizleme ve dönüştürme araçları
- Diğer Python kütüphaneleri ile mükemmel entegrasyon

---

## 🛠️ Kurulum ve Başlangıç

```python
# Gerekli kütüphaneleri import etme
import pandas as pd
import numpy as np

# Pandas versiyonunu kontrol etme
print(f"Pandas versiyonu: {pd.__version__}")

# Görüntüleme ayarları (opsiyonel)
pd.set_option('display.max_columns', None)  # Tüm sütunları göster
pd.set_option('display.width', None)        # Genişlik limiti kaldır
pd.set_option('display.max_colwidth', 50)   # Sütun genişliği max 50 karakter
```


---

## 📊 1. Gün - Pandas Temelleri ve Veri Yapıları

### Series Oluşturma ve Temel İşlemler

```python
# Series oluşturma - Liste ile
sehirler = pd.Series(['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'])
print("Şehirler Series'i:")
print(sehirler)
print(f"Veri tipi: {type(sehirler)}")

# Series oluşturma - Dictionary ile
nufus = pd.Series({
    'İstanbul': 15519267,
    'Ankara': 5663322,
    'İzmir': 4367251,
    'Bursa': 3147818,
    'Antalya': 2619832
})
print("\nNüfus Series'i:")
print(nufus)

# Series'ten belirli değerlere erişim
print(f"\nİstanbul nüfusu: {nufus['İstanbul']:,}")
print(f"İlk 3 şehir:\n{nufus.head(3)}")
print(f"Son 2 şehir:\n{nufus.tail(2)}")

# Temel istatistiksel bilgiler
print(f"\nToplam nüfus: {nufus.sum():,}")
print(f"Ortalama nüfus: {nufus.mean():,.0f}")
print(f"En kalabalık şehir: {nufus.max():,}")
print(f"En az nüfuslu şehir: {nufus.min():,}")
```


### DataFrame Oluşturma

```python
# Dictionary ile DataFrame oluşturma
sehir_bilgileri = {
    'Şehir': ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'],
    'Nüfus': [15519267, 5663322, 4367251, 3147818, 2619832],
    'Bölge': ['Marmara', 'İç Anadolu', 'Ege', 'Marmara', 'Akdeniz'],
    'Plaka_Kodu': [34, 6, 35, 16, 7],
    'Denize_Kıyısı': [True, False, True, False, True]
}

df = pd.DataFrame(sehir_bilgileri)
print("Şehir Bilgileri DataFrame:")
print(df)
print(f"\nDataFrame şekli: {df.shape}")  # (satır, sütun)
print(f"Sütun isimleri: {list(df.columns)}")
print(f"Index: {list(df.index)}")
```


### Temel DataFrame Bilgileri

```python
# DataFrame hakkında genel bilgi
print("DataFrame Hakkında Genel Bilgi:")
print(df.info())

print("\nTemel İstatistikler:")
print(df.describe())

print("\nVeri Tipleri:")
print(df.dtypes)

print("\nNüfus sütununun benzersiz değer sayısı:")
print(df['Nüfus'].nunique())

print("\nBölgelerin benzersiz değerleri:")
print(df['Bölge'].unique())
```


---

## 📊 2. Gün - Veri Okuma ve Yazma İşlemleri

### CSV Dosyası Oluşturma ve Okuma

```python
# Önce bir CSV dosyası oluşturalım
sample_data = {
    'Ad': ['Ahmet', 'Ayşe', 'Mehmet', 'Fatma', 'Ali', 'Zeynep'],
    'Yaş': [25, 30, 35, 28, 32, 27],
    'Şehir': ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'İstanbul'],
    'Maaş': [5000, 6500, 7200, 5800, 6200, 5500],
    'Departman': ['IT', 'HR', 'IT', 'Muhasebe', 'IT', 'HR']
}

df_sample = pd.DataFrame(sample_data)

# CSV dosyasına kaydetme
df_sample.to_csv('calisanlar.csv', index=False, encoding='utf-8')
print("CSV dosyası oluşturuldu: calisanlar.csv")

# CSV dosyasını okuma
df_read = pd.read_csv('calisanlar.csv', encoding='utf-8')
print("\nCSV dosyasından okunan veri:")
print(df_read)
```


### Farklı Okuma Seçenekleri

```python
# CSV okuma seçenekleri
# Belirli sütunları okuma
df_selected = pd.read_csv('calisanlar.csv', usecols=['Ad', 'Yaş', 'Maaş'])
print("Seçili sütunlar:")
print(df_selected)

# Belirli satırları okuma (nrows parametresi)
df_limited = pd.read_csv('calisanlar.csv', nrows=3)
print("\nİlk 3 satır:")
print(df_limited)

# Index sütunu belirleme
df_indexed = pd.read_csv('calisanlar.csv', index_col='Ad')
print("\nAd sütunu index olarak:")
print(df_indexed)
```


### Excel Dosyası İşlemleri

```python
# Excel dosyasına kaydetme
df_sample.to_excel('calisanlar.xlsx', index=False)
print("Excel dosyası oluşturuldu: calisanlar.xlsx")

# Excel dosyasını okuma
try:
    df_excel = pd.read_excel('calisanlar.xlsx')
    print("\nExcel dosyasından okunan veri:")
    print(df_excel.head())
except ImportError:
    print("Excel okuma için 'openpyxl' kütüphanesi gerekli: pip install openpyxl")
```


---

## 📊 3. Gün - Veri Seçimi ve Filtreleme

### Sütun Seçimi

```python
# Çalışanlar verisini kullanarak devam edelim
df = pd.read_csv('calisanlar.csv')

# Tek sütun seçimi (Series döner)
yaşlar = df['Yaş']
print("Yaşlar (Series):")
print(yaşlar)
print(f"Tip: {type(yaşlar)}")

# Tek sütun seçimi (DataFrame döner)
yaşlar_df = df[['Yaş']]
print("\nYaşlar (DataFrame):")
print(yaşlar_df)
print(f"Tip: {type(yaşlar_df)}")

# Birden fazla sütun seçimi
kişi_bilgileri = df[['Ad', 'Yaş', 'Şehir']]
print("\nKişi bilgileri:")
print(kişi_bilgileri)
```


### Satır Seçimi

```python
# Index ile satır seçimi
print("İlk satır (iloc ile):")
print(df.iloc[0])  # Series döner

print("\nİlk satır (DataFrame olarak):")
print(df.iloc[[0]])  # DataFrame döner

# Birden fazla satır seçimi
print("\nİlk 3 satır:")
print(df.iloc[0:3])

# Son satır
print("\nSon satır:")
print(df.iloc[-1])

# Belirli satırlar
print("\n1. ve 3. satırlar:")
print(df.iloc[[0, 2]])
```


### Koşullu Filtreleme

```python
# Tek koşul ile filtreleme
genç_çalışanlar = df[df['Yaş'] < 30]
print("30 yaşından küçük çalışanlar:")
print(genç_çalışanlar)

# Büyüktür koşulu
yüksek_maaşlı = df[df['Maaş'] > 6000]
print("\n6000'den fazla maaş alanlar:")
print(yüksek_maaşlı)

# String koşulu
istanbul_çalışanları = df[df['Şehir'] == 'İstanbul']
print("\nİstanbul'da çalışanlar:")
print(istanbul_çalışanları)

# İçerme koşulu (isin)
it_hr_çalışanları = df[df['Departman'].isin(['IT', 'HR'])]
print("\nIT ve HR departmanlarında çalışanlar:")
print(it_hr_çalışanları)
```


### Birden Fazla Koşul

```python
# VE (AND) koşulu
genç_ve_yüksek_maaşlı = df[(df['Yaş'] < 30) & (df['Maaş'] > 5500)]
print("Genç ve yüksek maaşlı çalışanlar:")
print(genç_ve_yüksek_maaşlı)

# VEYA (OR) koşulu
istanbul_veya_ankara = df[(df['Şehir'] == 'İstanbul') | (df['Şehir'] == 'Ankara')]
print("\nİstanbul veya Ankara'da çalışanlar:")
print(istanbul_veya_ankara)

# DEĞİL (NOT) koşulu
it_olmayan = df[~(df['Departman'] == 'IT')]
print("\nIT departmanında olmayan çalışanlar:")
print(it_olmayan)

# Karmaşık koşul
karmaşık_filtre = df[
    (df['Yaş'] >= 25) & 
    (df['Yaş'] <= 32) & 
    (df['Maaş'] > 5000) & 
    (df['Departman'].isin(['IT', 'HR']))
]
print("\nKarmaşık filtre sonucu:")
print(karmaşık_filtre)
```


---

## 📊 4. Gün - Veri Temizleme ve Eksik Veri İşleme

### Eksik Veri Oluşturma ve Tespit Etme

```python
# Eksik veriler içeren DataFrame oluşturma
import numpy as np

eksik_veri = {
    'Ad': ['Ahmet', 'Ayşe', 'Mehmet', None, 'Ali', 'Zeynep'],
    'Yaş': [25, None, 35, 28, 32, 27],
    'Şehir': ['İstanbul', 'Ankara', None, 'Bursa', 'Antalya', 'İstanbul'],
    'Maaş': [5000, 6500, 7200, None, 6200, 5500],
    'Email': ['ahmet@email.com', None, 'mehmet@email.com', 'fatma@email.com', None, 'zeynep@email.com']
}

df_eksik = pd.DataFrame(eksik_veri)
print("Eksik veriler içeren DataFrame:")
print(df_eksik)

# Eksik verileri tespit etme
print("\nEksik veri kontrolü (isnull):")
print(df_eksik.isnull())

print("\nEksik veri sayısı (sütunlara göre):")
print(df_eksik.isnull().sum())

print("\nEksik veri yüzdesi:")
print((df_eksik.isnull().sum() / len(df_eksik)) * 100)

# Eksik veri olan satırları gösterme
print("\nEksik veri içeren satırları:")
eksik_satirlar = df_eksik[df_eksik.isnull().any(axis=1)]
print(eksik_satirlar)
```


### Eksik Veri İşleme Yöntemleri

```python
# 1. Eksik verileri silme
print("1. Eksik verileri silme:")

# Herhangi bir sütunda eksik veri olan satırları silme
df_temiz1 = df_eksik.dropna()
print(f"Orijinal satır sayısı: {len(df_eksik)}")
print(f"Temizleme sonrası: {len(df_temiz1)}")
print(df_temiz1)

# Belirli sütunlarda eksik veri olan satırları silme
df_temiz2 = df_eksik.dropna(subset=['Ad', 'Yaş'])
print(f"\nAd ve Yaş sütunlarında eksik veri olmayan satırlar: {len(df_temiz2)}")

# 2. Eksik verileri doldurma
print("\n2. Eksik verileri doldurma:")

# Sabit değer ile doldurma
df_doldurulmuş1 = df_eksik.fillna('Bilinmiyor')
print("Sabit değer ile doldurma:")
print(df_doldurulmuş1)

# Sütuna göre farklı değerler ile doldurma
doldurma_değerleri = {
    'Ad': 'İsimsiz',
    'Yaş': df_eksik['Yaş'].mean(),  # Ortalama ile
    'Şehir': 'Bilinmiyor',
    'Maaş': df_eksik['Maaş'].median(),  # Medyan ile
    'Email': 'email_yok@domain.com'
}

df_doldurulmuş2 = df_eksik.fillna(doldurma_değerleri)
print("\nSütuna göre farklı değerler ile doldurma:")
print(df_doldurulmuş2)

# İleri/geri doldurma (forward fill / backward fill)
df_ffill = df_eksik.fillna(method='ffill')  # Önceki değer ile doldur
print("\nÖnceki değer ile doldurma (forward fill):")
print(df_ffill)
```


### Tekrarlanan Verileri İşleme

```python
# Tekrarlanan veri oluşturma
tekrar_veri = {
    'Ad': ['Ahmet', 'Ayşe', 'Mehmet', 'Ahmet', 'Ali', 'Ayşe'],
    'Yaş': [25, 30, 35, 25, 32, 30],
    'Şehir': ['İstanbul', 'Ankara', 'İzmir', 'İstanbul', 'Antalya', 'Ankara']
}

df_tekrar = pd.DataFrame(tekrar_veri)
print("Tekrarlanan veriler:")
print(df_tekrar)

# Tekrarlanan satırları tespit etme
print("\nTekrarlanan satırlar:")
print(df_tekrar.duplicated())

print("\nTekrarlanan satırları gösterme:")
print(df_tekrar[df_tekrar.duplicated()])

# Tekrarlanan satırları silme
df_benzersiz = df_tekrar.drop_duplicates()
print(f"\nOrijinal satır sayısı: {len(df_tekrar)}")
print(f"Tekrarlar silinince: {len(df_benzersiz)}")
print(df_benzersiz)

# Belirli sütunlara göre tekrar kontrolü
df_benzersiz_ad = df_tekrar.drop_duplicates(subset=['Ad'])
print("\nSadece 'Ad' sütununa göre benzersiz:")
print(df_benzersiz_ad)
```


---

## 📊 5. Gün - Veri Dönüştürme ve Gruplama

### Sütun İşlemleri

```python
# Orijinal veriyi yeniden yükleyelim
df = pd.read_csv('calisanlar.csv')

# Yeni sütun ekleme
df['Yaş_Grubu'] = df['Yaş'].apply(lambda x: 'Genç' if x < 30 else 'Orta Yaş' if x < 35 else 'Olgun')
print("Yaş grubu eklendi:")
print(df)

# Maaş artışı hesaplama
df['Zam_Sonrası_Maaş'] = df['Maaş'] * 1.15  # %15 zam
print(f"\n%15 zam sonrası maaşlar:")
print(df[['Ad', 'Maaş', 'Zam_Sonrası_Maaş']])

# String işlemleri
df['Email'] = df['Ad'].str.lower() + '@company.com'
print(f"\nEmail adresleri oluşturuldu:")
print(df[['Ad', 'Email']])

# Kategorik sütun oluşturma
df['Maaş_Kategorisi'] = pd.cut(df['Maaş'], 
                               bins=[0, 5500, 6500, float('inf')], 
                               labels=['Düşük', 'Orta', 'Yüksek'])
print(f"\nMaaş kategorileri:")
print(df[['Ad', 'Maaş', 'Maaş_Kategorisi']])
```


### Gruplama İşlemleri

```python
# Departmana göre gruplama
print("Departmana göre gruplama:")
dept_grupları = df.groupby('Departman')

# Her departmanın ortalama maaşı
print("\nDepartmanların ortalama maaşları:")
print(dept_grupları['Maaş'].mean())

# Her departmanın çalışan sayısı
print("\nDepartmanların çalışan sayıları:")
print(dept_grupları.size())

# Birden fazla istatistik
print("\nDepartmanların detaylı istatistikleri:")
print(dept_grupları['Maaş'].agg(['count', 'mean', 'min', 'max']))

# Şehire göre gruplama
şehir_grupları = df.groupby('Şehir')
print("\nŞehirlere göre ortalama yaş:")
print(şehir_grupları['Yaş'].mean().sort_values(ascending=False))

# Birden fazla sütuna göre gruplama
karmaşık_grup = df.groupby(['Şehir', 'Departman'])
print("\nŞehir ve departmana göre gruplama:")
print(karmaşık_grup['Maaş'].mean())
```


### Pivot Table İşlemleri

```python
# Pivot table oluşturma
pivot_table = df.pivot_table(
    values='Maaş',
    index='Şehir',
    columns='Departman',
    aggfunc='mean',
    fill_value=0
)
print("Pivot Table - Şehir ve Departmana göre ortalama maaşlar:")
print(pivot_table)

# Birden fazla değer ile pivot table
pivot_table2 = df.pivot_table(
    values=['Maaş', 'Yaş'],
    index='Departman',
    aggfunc={'Maaş': 'mean', 'Yaş': 'mean'}
)
print("\nDepartmanlara göre ortalama maaş ve yaş:")
print(pivot_table2)
```


---

## 📊 6. Gün - Sıralama ve İndeksleme

### Sıralama İşlemleri

```python
# Yaşa göre sıralama (artan)
yaş_sıralı = df.sort_values('Yaş')
print("Yaşa göre artan sıralama:")
print(yaş_sıralı[['Ad', 'Yaş', 'Maaş']])

# Maaşa göre sıralama (azalan)
maaş_sıralı = df.sort_values('Maaş', ascending=False)
print("\nMaaşa göre azalan sıralama:")
print(maaş_sıralı[['Ad', 'Yaş', 'Maaş']])

# Birden fazla sütuna göre sıralama
çoklu_sıralama = df.sort_values(['Departman', 'Maaş'], ascending=[True, False])
print("\nDepartman (artan) ve Maaş (azalan) sıralaması:")
print(çoklu_sıralama[['Ad', 'Departman', 'Maaş']])

# Index'e göre sıralama
index_sıralı = df.sort_index()
print("\nIndex'e göre sıralama:")
print(index_sıralı.head())
```


### İndeksleme İşlemleri

```python
# Index'i değiştirme
df_new_index = df.set_index('Ad')
print("Ad sütunu index olarak ayarlandı:")
print(df_new_index.head())

# Index ile erişim
print(f"\nAhmet'in bilgileri:")
print(df_new_index.loc['Ahmet'])

# Çoklu index oluşturma
df_multi_index = df.set_index(['Departman', 'Ad'])
print("\nÇoklu index (Departman, Ad):")
print(df_multi_index)

# Çoklu index ile erişim
print(f"\nIT departmanındaki Ahmet'in bilgileri:")
print(df_multi_index.loc[('IT', 'Ahmet')])

# Index'i sıfırlama
df_reset = df_new_index.reset_index()
print("\nIndex sıfırlandı:")
print(df_reset.head())
```


---

## 📊 7. Gün - Pratik Uygulama ve Proje

### Kapsamlı Veri Analizi Projesi

```python
# Daha büyük bir veri seti oluşturalım
import random
np.random.seed(42)  # Tekrarlanabilir sonuçlar için

# 100 çalışan verisi oluşturma
n_çalışan = 100
çalışan_verileri = {
    'Çalışan_ID': range(1, n_çalışan + 1),
    'Ad': [f'Çalışan_{i}' for i in range(1, n_çalışan + 1)],
    'Yaş': np.random.randint(22, 65, n_çalışan),
    'Departman': np.random.choice(['IT', 'HR', 'Muhasebe', 'Pazarlama', 'Satış'], n_çalışan),
    'Şehir': np.random.choice(['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'], n_çalışan),
    'Deneyim_Yılı': np.random.randint(0, 20, n_çalışan),
    'Maaş': np.random.randint(4000, 12000, n_çalışan),
    'Performans_Puanı': np.random.randint(60, 100, n_çalışan)
}

büyük_df = pd.DataFrame(çalışan_verileri)

# Bazı eksik veriler ekleyelim
eksik_indeksler = np.random.choice(büyük_df.index, size=10, replace=False)
büyük_df.loc[eksik_indeksler, 'Performans_Puanı'] = np.nan

print("Büyük veri seti oluşturuldu:")
print(f"Veri seti boyutu: {büyük_df.shape}")
print(büyük_df.head())

# Veriyi CSV'ye kaydetme
büyük_df.to_csv('sirket_verileri.csv', index=False)
```


### Veri Analizi Adımları

```python
# 1. Veri keşfi
print("=== VERİ KEŞFİ ===")
print(f"Veri seti boyutu: {büyük_df.shape}")
print(f"Sütun isimleri: {list(büyük_df.columns)}")
print(f"Veri tipleri:\n{büyük_df.dtypes}")
print(f"\nEksik veri sayısı:\n{büyük_df.isnull().sum()}")

# 2. Temel istatistikler
print("\n=== TEMEL İSTATİSTİKLER ===")
print(büyük_df.describe())

# 3. Eksik verileri işleme
print("\n=== EKSİK VERİ İŞLEME ===")
büyük_df['Performans_Puanı'].fillna(büyük_df['Performans_Puanı'].mean(), inplace=True)
print(f"Eksik veriler doldurulduktan sonra: {büyük_df.isnull().sum()}")

# 4. Departman analizi
print("\n=== DEPARTMAN ANALİZİ ===")
dept_analiz = büyük_df.groupby('Departman').agg({
    'Maaş': ['count', 'mean', 'min', 'max'],
    'Yaş': 'mean',
    'Deneyim_Yılı': 'mean',
    'Performans_Puanı': 'mean'
}).round(2)
print(dept_analiz)

# 5. Şehir analizi
print("\n=== ŞEHİR ANALİZİ ===")
şehir_analiz = büyük_df.groupby('Şehir').agg({
    'Maaş': 'mean',
    'Çalışan_ID': 'count'
}).rename(columns={'Çalışan_ID': 'Çalışan_Sayısı'}).round(2)
print(şehir_analiz.sort_values('Maaş', ascending=False))

# 6. Korelasyon analizi
print("\n=== KORELASYON ANALİZİ ===")
korelasyon = büyük_df[['Yaş', 'Deneyim_Yılı', 'Maaş', 'Performans_Puanı']].corr()
print(korelasyon.round(3))

# 7. Filtreleme örnekleri
print("\n=== FİLTRELEME ÖRNEKLERİ ===")

# Yüksek performanslı çalışanlar
yüksek_performans = büyük_df[büyük_df['Performans_Puanı'] >= 90]
print(f"Yüksek performanslı çalışan sayısı: {len(yüksek_performans)}")

# IT departmanında yüksek maaşlı çalışanlar
it_yüksek_maaş = büyük_df[
    (büyük_df['Departman'] == 'IT') & 
    (büyük_df['Maaş'] > büyük_df['Maaş'].quantile(0.75))
]
print(f"IT'de yüksek maaşlı çalışan sayısı: {len(it_yüksek_maaş)}")

# 8. Sıralama ve en iyi/kötü çalışanlar
print("\n=== SIRALAMA VE RANKING ===")

# En yüksek maaşlı 5 çalışan
en_yüksek_maaş = büyük_df.nlargest(5, 'Maaş')[['Ad', 'Departman', 'Maaş', 'Performans_Puanı']]
print("En yüksek maaşlı 5 çalışan:")
print(en_yüksek_maaş)

# En yüksek performanslı 5 çalışan
en_yüksek_performans = büyük_df.nlargest(5, 'Performans_Puanı')[['Ad', 'Departman', 'Maaş', 'Performans_Puanı']]
print("\nEn yüksek performanslı 5 çalışan:")
print(en_yüksek_performans)

# 9. Pivot table analizi
print("\n=== PIVOT TABLE ANALİZİ ===")
pivot_analiz = büyük_df.pivot_table(
    values=['Maaş', 'Performans_Puanı'],
    index='Departman',
    columns='Şehir',
    aggfunc='mean',
    fill_value=0
).round(2)
print("Departman ve Şehire göre ortalama maaş ve performans:")
print(pivot_analiz)
```


### Özel Analiz Fonksiyonları

```python
# Veri analizi için özel fonksiyonlar oluşturalım

def yaş_grubu_oluştur(yaş):
    """Yaşa göre grup belirleme fonksiyonu"""
    if yaş < 25:
        return 'Genç'
    elif yaş < 35:
        return 'Orta Yaş'
    elif yaş < 50:
        return 'Orta Yaş Üstü'
    else:
        return 'Olgun'

def maaş_kategorisi_oluştur(maaş):
    """Maaşa göre kategori belirleme fonksiyonu"""
    if maaş < 5000:
        return 'Düşük'
    elif maaş < 7500:
        return 'Orta'
    elif maaş < 10000:
        return 'Yüksek'
    else:
        return 'Çok Yüksek'

def performans_değerlendirme(puan):
    """Performans puanına göre değerlendirme"""
    if puan < 70:
        return 'Gelişim Gerekli'
    elif puan < 80:
        return 'Ortalama'
    elif puan < 90:
        return 'İyi'
    else:
        return 'Mükemmel'

# Fonksiyonları uygulama
büyük_df['Yaş_Grubu'] = büyük_df['Yaş'].apply(yaş_grubu_oluştur)
büyük_df['Maaş_Kategorisi'] = büyük_df['Maaş'].apply(maaş_kategorisi_oluştur)
büyük_df['Performans_Değerlendirme'] = büyük_df['Performans_Puanı'].apply(performans_değerlendirme)

print("Yeni kategorik sütunlar eklendi:")
print(büyük_df[['Ad', 'Yaş_Grubu', 'Maaş_Kategorisi', 'Performans_Değerlendirme']].head())

# Kategorik analiz
print("\n=== KATEGORİK ANALİZ ===")
print("Yaş grubu dağılımı:")
print(büyük_df['Yaş_Grubu'].value_counts())

print("\nMaaş kategorisi dağılımı:")
print(büyük_df['Maaş_Kategorisi'].value_counts())

print("\nPerformans değerlendirme dağılımı:")
print(büyük_df['Performans_Değerlendirme'].value_counts())
```


### İleri Seviye Veri Manipülasyonu

```python
# Çoklu koşullu filtreleme ve seçim
print("\n=== İLERİ SEVİYE FİLTRELEME ===")

# Lambda fonksiyonu ile karmaşık filtreleme
yüksek_potansiyel = büyük_df[
    büyük_df.apply(lambda row: 
        (row['Yaş'] < 35) and 
        (row['Performans_Puanı'] >= 85) and 
        (row['Deneyim_Yılı'] >= 3), axis=1)
]
print(f"Yüksek potansiyelli genç çalışan sayısı: {len(yüksek_potansiyel)}")

# Quantile tabanlı analiz
print("\n=== QUANTİLE ANALİZİ ===")
maaş_quantiles = büyük_df['Maaş'].quantile([0.25, 0.5, 0.75, 0.9, 0.95])
print("Maaş dağılımı (percentile):")
for q, değer in maaş_quantiles.items():
    print(f"%{int(q*100)}: {değer:,.0f} TL")

# En yüksek %10'luk dilim
top_10_percent = büyük_df[büyük_df['Maaş'] >= büyük_df['Maaş'].quantile(0.9)]
print(f"\nEn yüksek %10'luk dilimde {len(top_10_percent)} çalışan var")

# String işlemleri ve regex
print("\n=== STRING İŞLEMLERİ ===")
# Email adresleri oluşturma
büyük_df['Email'] = (büyük_df['Ad'].str.lower().str.replace('_', '.') + 
                     '@' + 
                     büyük_df['Departman'].str.lower() + 
                     '.company.com')

print("Örnek email adresleri:")
print(büyük_df[['Ad', 'Departman', 'Email']].head())

# Sütun adlarını temizleme
büyük_df.columns = büyük_df.columns.str.lower().str.replace('_', ' ')
print(f"\nTemizlenmiş sütun adları: {list(büyük_df.columns)}")
```


### Veri Dışa Aktarma ve Raporlama

```python
# Özet rapor oluşturma
print("\n=== ÖZET RAPOR ===")

rapor = {
    'Toplam Çalışan': len(büyük_df),
    'Ortalama Yaş': büyük_df['yaş'].mean(),
    'Ortalama Maaş': büyük_df['maaş'].mean(),
    'Ortalama Deneyim': büyük_df['deneyim yılı'].mean(),
    'Ortalama Performans': büyük_df['performans puanı'].mean(),
    'En Kalabalık Departman': büyük_df['departman'].mode()[0],
    'En Kalabalık Şehir': büyük_df['şehir'].mode()[0]
}

print("Şirket Genel Durumu:")
for anahtar, değer in rapor.items():
    if isinstance(değer, (int, float)) and not isinstance(değer, bool):
        print(f"{anahtar}: {değer:.2f}")
    else:
        print(f"{anahtar}: {değer}")

# Departman bazlı detaylı rapor
dept_rapor = büyük_df.groupby('departman').agg({
    'çalışan id': 'count',
    'maaş': ['mean', 'min', 'max'],
    'yaş': 'mean',
    'performans puanı': 'mean'
}).round(2)

print("\nDepartman Bazlı Rapor:")
print(dept_rapor)

# Veriyi farklı formatlarda kaydetme
büyük_df.to_csv('analiz_sonucu.csv', index=False)
büyük_df.to_excel('analiz_sonucu.xlsx', index=False)

# Sadece özet istatistikleri kaydetme
özet_df = büyük_df.groupby('departman').agg({
    'maaş': ['count', 'mean', 'std'],
    'performans puanı': 'mean'
}).round(2)
özet_df.to_csv('departman_ozeti.csv')

print("\nDosyalar kaydedildi:")
print("- analiz_sonucu.csv")
print("- analiz_sonucu.xlsx") 
print("- departman_ozeti.csv")
```


---

## 🎯 Hafta Sonu Değerlendirmesi

### Bu Hafta Öğrendikleriniz

1. **Pandas Temelleri**
   - Series ve DataFrame yapıları
   - Veri okuma/yazma işlemleri
   - Temel indeksleme ve seçim

2. **Veri Temizleme**
   - Eksik veri tespiti ve işleme
   - Tekrarlanan veri kontrolü
   - Veri tiplerini anlama

3. **Veri Manipülasyonu**
   - Filtreleme ve koşullu seçim
   - Gruplama ve agregasyon
   - Sıralama ve indeksleme

4. **İleri Seviye İşlemler**
   - Pivot table oluşturma
   - Lambda fonksiyonları
   - String işlemleri

### Pratik Egzersizleri

```python
# EGZERSIZ 1: Kendi veri setinizi oluşturun
# 50 öğrenci bilgisi içeren bir DataFrame oluşturun:
# - Ad, Soyad, Yaş, Bölüm, Not Ortalaması, Şehir

# EGZERSIZ 2: Veri analizi yapın
# - Bölümlere göre ortalama not hesaplayan
# - En başarılı 10 öğrenciyi bulan
# - Şehirlere göre öğrenci dağılımını gösteren kod yazın

# EGZERSIZ 3: Veri temizleme
# Veri setinize bilinçli olarak eksik veriler ekleyin ve bunları farklı yöntemlerle temizleyin

print("=== HAFTA SONU EGZERSİZLERİ ===")
print("Yukarıdaki egzersizleri çözerek bu haftaki öğrendiklerinizi pekiştirin!")
```


### Gelecek Hafta Hazırlığı

```python
# Gelecek hafta için hazırlık
print("=== GELECEK HAFTA İÇİN HAZIRLIK ===")
print("Şu konuları tekrar edin:")
print("1. DataFrame oluşturma ve temel işlemler")
print("2. Filtreleme ve koşullu seçim")
print("3. Gruplama ve agregasyon")
print("4. Veri temizleme teknikleri")
print("\nGelecek hafta NumPy ile matematiksel işlemler öğreneceğiz!")
```


---

## 📚 Ek Ders Materyali

### PDF Ders Notları
Bu hafta için detaylı teorik bilgiler ve ek örnekler içeren PDF ders notlarını inceleyebilirsiniz:

- **[ders.pdf](./ders.pdf)** - Pandas ile Veri Manipülasyonu Detaylı Ders Notları
  - Teorik açıklamalar ve kavramlar
  - İleri seviye örnekler ve uygulamalar
  - Pratik alıştırmalar ve çözümler
  - Sık sorulan sorular ve cevapları

> 💡 **Öneri**: PDF dosyasını indirip çalışma sırasında yanınızda bulundurun. Özellikle karmaşık konuları tekrar etmek için faydalı olacaktır.

---

## 📖 Ek Kaynaklar ve Referanslar

### Video Eğitim Önerileri
1. **Corey Schafer - Pandas Tutorials** (YouTube)
2. **Data School - Pandas** (YouTube)
3. **Kaggle Learn - Pandas Course**

### Dokümantasyon
- [Pandas Official Documentation](https://pandas.pydata.org/docs/)
- [Pandas Cheat Sheet](https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf)

### Pratik İçin Veri Setleri
- [Kaggle Datasets](https://www.kaggle.com/datasets)
- [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/index.php)
- [TÜİK Veri Setleri](https://www.tuik.gov.tr/)

### İpuçları
- Her gün en az 1 saat pratik yapın
- Gerçek veri setleri ile çalışın
- Hata mesajlarını okuyun ve anlamaya çalışın
- Stack Overflow ve GitHub'da örnekleri inceleyin

**Başarılar! 🚀**
