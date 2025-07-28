# 🐼 Pandas Eğitimi - 5 Zorlayıcı Ödev

Bu ödevler, Pandas eğitim materyalinde öğrenilen tüm konuları kapsamlı bir şekilde test etmek için tasarlanmıştır. Her ödev farklı zorluk seviyesinde ve farklı Pandas becerilerini sınar.

---

## 📊 Ödev 1: Karmaşık Veri Manipülasyonu ve Analizi

### Görev Açıklaması
Bir teknoloji şirketinin çalışan verilerini analiz edeceksiniz. Bu ödevde veri okuma, temizleme, filtreleme, gruplama ve ileri seviye manipülasyon tekniklerini kullanacaksınız.

### Yapmanız Gerekenler
1. 200 çalışanlık rastgele veri seti oluşturun
2. Veriye bilinçli eksiklikler ve tutarsızlıklar ekleyin
3. Çoklu koşullu filtreler uygulayın
4. Karmaşık gruplama ve agregasyon işlemleri yapın
5. Performans bazlı ranking sistemi oluşturun

```python
import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# Pandas ayarları
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', 50)

# Rastgele seed ayarla
np.random.seed(42)
random.seed(42)

# BURADAN KODUNUZ BAŞLIYOR
# ========================

# 1. 200 çalışanlık veri seti oluşturun (şu sütunlarla):
#    - Çalışan_ID, Ad, Soyad, Yaş, Departman, Pozisyon, İşe_Başlama_Tarihi
#    - Maaş, Prim, Performans_Puanı, Eğitim_Seviyesi, Şehir, Deneyim_Yılı

# 2. Veri setine şu eksiklikleri/tutarsızlıkları ekleyin:
#    - %15 oranında eksik Performans_Puanı değerleri
#    - %10 oranında eksik Prim değerleri  
#    - Bazı çalışanların yaşları deneyim yılından küçük (mantıksız)
#    - Bazı maaş değerleri negatif
#    - Aynı çalışanın 2-3 farklı kaydı (duplikasyonlar)

# 3. Veri temizleme işlemleri yapın:
#    - Eksik verileri uygun yöntemlerle doldurun
#    - Mantıksız yaş/deneyim verilerini düzeltin
#    - Negatif maaşları pozitif yapın
#    - Duplikasyonları temizleyin

# 4. Şu karmaşık filtreleme işlemlerini yapın:
#    - 30 yaş altı VE (yüksek performanslı VEYA 3+ yıl deneyimli) çalışanları bulun
#    - Ortalama maaştan %20 fazla kazanan ama düşük performanslı çalışanları listeleyin
#    - Her departmanda en az 2 yıl deneyimli ve lisans üstü eğitimli çalışan sayısını bulun

# 5. Gruplama ve agregasyon:
#    - Departman ve şehir bazında ortalama maaş, max prim, min yaş hesaplayın
#    - Eğitim seviyesine göre performans ortalamaları
#    - Yaş gruplarına (20-30, 30-40, 40-50, 50+) göre departman dağılımı

# 6. İleri seviye işlemler:
#    - Her çalışan için "Maaş_Yüzdesi" (departman ortalamasına göre) hesaplayın
#    - "Potansiyel_Değeri" = (Performans * Deneyim) / (Yaş/10) formülü ile hesaplayın
#    - Departman içinde performans sıralaması yapın (rank)

# 7. Özel rapor oluşturun:
#    - En yüksek potansiyelli 20 çalışanı listeleyin
#    - Departman bazında maaş artışı önerisi hesaplayın
#    - Risk altındaki çalışanları (düşük performans + yüksek maaş) tespit edin
```


---

## 📊 Ödev 2: Zaman Serisi ve Çoklu Veri Seti Analizi

### Görev Açıklaması
Bir e-ticaret şirketinin satış verilerini analiz edeceksiniz. Bu ödevde zaman bazlı analizler, çoklu DataFrame birleştirme işlemleri ve trend analizleri yapacaksınız.

### Yapmanız Gerekenler
1. 3 farklı veri seti oluşturun (Satışlar, Ürünler, Müşteriler)
2. Veri setlerini farklı yöntemlerle birleştirin
3. Zaman bazlı analizler yapın
4. Karmaşık pivot tablolar oluşturun

```python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import calendar

# Pandas ayarları
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', 20)

# BURADAN KODUNUZ BAŞLIYOR
# ========================

# 1. Üç adet veri seti oluşturun:

# a) SATIŞLAR tablosu (1000 satış kaydı):
#    - Satış_ID, Müşteri_ID, Ürün_ID, Tarih, Miktar, Birim_Fiyat
#    - Tarih aralığı: Son 2 yıl
#    - Bazı ay/günlerde satış yoğunluğu daha fazla olsun

# b) ÜRÜNLER tablosu (50 ürün):
#    - Ürün_ID, Ürün_Adı, Kategori, Maliyet, Stok_Durumu
#    - Kategoriler: Elektronik, Giyim, Ev, Spor, Kitap

# c) MÜŞTERİLER tablosu (200 müşteri):
#    - Müşteri_ID, Ad, Soyad, Yaş, Şehir, Kayıt_Tarihi, Müşteri_Segmenti
#    - Segmentler: Premium, Standart, Bronze

# 2. Veri birleştirme işlemleri:
#    - Tüm tabloları birleştirerek ana veri setini oluşturun
#    - Inner, Left, Right join farklarını gösterin
#    - Birleştirme sonrası eksik verileri analiz edin

# 3. Zaman bazlı analizler:
#    - Aylık satış trendlerini hesaplayan
#    - Haftanın günlerine göre satış dağılımını bulan
#    - Yılın hangi aylarında hangi kategoriler daha çok satıldığını analiz eden
#    - Önceki ay ile karşılaştırmalı büyüme oranları hesaplayan

# 4. Karmaşık pivot tablolar:
#    - Kategori/Ay bazında toplam satış tutarı
#    - Müşteri segmenti/Şehir bazında ortalama satış miktarı  
#    - Ürün/Müşteri yaş grubu bazında satış performansı

# 5. İleri seviye zaman analizleri:
#    - Rolling window (3 aylık) hareketli ortalamalar
#    - Mevsimsel satış paternlerini tespit etme
#    - Yılın aynı dönemlerini karşılaştırma (YoY analizi)

# 6. Müşteri analizi:
#    - Müşteri bazında CLV (Customer Lifetime Value) hesaplama
#    - En sadık müşterileri (tekrar satın alma oranı) bulma
#    - Churn riski taşıyan müşterileri tespit etme (uzun süredir alışveriş yapmayan)

# 7. Özel metrikler:
#    - Her kategorinin toplam satıştaki payını hesaplama
#    - Ürün bazında karlılık analizi (satış fiyatı - maliyet)
#    - Şehir bazında pazarlama etkinliği skorları

# 8. Rapor ve görselleştirme hazırlığı:
#    - Executive summary tablosu oluşturun
#    - En önemli 10 bulguyu özetleyin
#    - Aksiyon önerileri listeleyin
```


---

## 📊 Ödev 3: Finansal Veri Analizi ve Risk Değerlendirmesi

### Görev Açıklaması
Bir bankanın kredi portföyünü analiz edeceksiniz. Bu ödevde finansal metriklerin hesaplanması, risk sınıflandırması ve karmaşık koşullu işlemler yapacaksınız.

### Yapmanız Gerekenler
1. Kredi portföy verisi oluşturun
2. Risk skorları hesaplayan
3. Portföy analizleri yapın
4. Stres testleri uygulayın

```python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Pandas ayarları ve fonksiyonlar
pd.set_option('display.max_columns', None)
pd.set_option('display.precision', 2)

# BURADAN KODUNUZ BAŞLIYOR
# ========================

# 1. KREDİ PORTFÖYÜ verisi oluşturun (500 kredi):
#    - Kredi_ID, Müşteri_ID, Kredi_Tutarı, Faiz_Oranı, Vade_Ay
#    - Açılış_Tarihi, Aylık_Ödeme, Kalan_Bakiye, Gecikme_Günü
#    - Müşteri_Yaş, Gelir, Kredi_Skoru, Teminat_Türü, İl

# 2. Risk faktörleri ekleyin:
#    - %20 kredide 0-30 gün gecikme
#    - %10 kredide 30+ gün gecikme  
#    - %5 kredide 90+ gün gecikme (NPL)
#    - Bazı müşterilerin geliri aylık ödemeden düşük (tutarsızlık)

# 3. Finansal metriklerin hesaplanması:
#    - DTI (Debt to Income): Aylık ödeme / Aylık gelir
#    - LTV (Loan to Value): Kredi tutarı / Teminat değeri (teminat varsa)
#    - Kalan vade hesaplama
#    - Toplam faiz maliyeti hesaplama

# 4. Risk sınıflandırması oluşturun:
#    - A (Düşük Risk): Kredi skoru 750+, DTI<30%, gecikme yok
#    - B (Orta Risk): Kredi skoru 650-749, DTI 30-40%, hafif gecikme
#    - C (Yüksek Risk): Kredi skoru 550-649, DTI 40-50%, orta gecikme  
#    - D (Çok Yüksek Risk): Kredi skoru <550, DTI>50%, ağır gecikme

# 5. Portföy analizleri:
#    - Risk sınıfına göre portföy dağılımı
#    - İl bazında ortalama kredi tutarı ve risk dağılımı
#    - Vade gruplarına göre (0-12, 13-24, 25-36, 36+ ay) performans analizi
#    - Faiz oranı bantlarına göre gecikme oranları

# 6. Gelişmiş risk metrikleri:
#    - Vintage analizi: Açılış ayına göre performans takibi
#    - Migration analizi: Risk sınıfları arası geçişler simülasyonu
#    - Concentration risk: En büyük 10 kredinin portföy payı
#    - Early warning indicators: Risk artışı sinyalleri

# 7. Stres testleri uygulayın:
#    - Senaryo 1: Faiz oranları %50 artarsa
#    - Senaryo 2: İşsizlik oranı %100 artarsa (gelir %20 azalır)
#    - Senaryo 3: Teminat değerleri %30 düşerse
#    - Her senaryo için risk sınıfı değişimlerini hesaplayın

# 8. Özel analizler:
#    - Optimal portföy ağırlıkları önerisi
#    - Risk-return optimizasyonu
#    - Yeni kredi verme kriterleri önerisi
#    - Mevcut portföyden çıkarılması gereken krediler

# 9. Regulatör raporları:
#    - Basel kriterlerine göre sermaye gereksinimi
#    - NPL (Non-Performing Loans) oranı
#    - Provision ihtiyacı hesaplama
#    - Portföy kalitesi trend analizi

# 10. Kapsamlı özet raporu:
#     - Executive summary
#     - Key risk indicators (KRI)
#     - Action items ve öneriler
#     - Monitoring dashboard metrics
```


---

## 📊 Ödev 4: Eğitim Kurumu Performans Analizi

### Görev Açıklaması
Bir üniversitenin akademik verilerini analiz edeceksiniz. Bu ödevde karmaşık string işlemleri, çok seviyeli indeksleme, ve eğitim metrikleri hesaplayacaksınız.

### Yapmanız Gerekenler
1. Öğrenci, ders ve not verilerini oluşturun
2. Akademik performans metrikleri hesaplayan
3. Karmaşık string işlemleri yapın
4. Çok seviyeli analizler gerçekleştirin

```python
import pandas as pd
import numpy as np
import string
import random

# Pandas ayarları
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', 15)

# BURADAN KODUNUZ BAŞLIYOR
# ========================

# 1. ÜÇ FARKLI VERİ SETİ oluşturun:

# a) ÖĞRENCİLER (800 öğrenci):
#    - Öğrenci_No (ÜNİV-FAK-BÖLÜM-NUMARA formatında), Ad, Soyad
#    - Doğum_Tarihi, Cinsiyet, Şehir, Burs_Durumu, Kayıt_Yılı
#    - Fakülte, Bölüm, Sınıf, E-posta (ad.soyad@universite.edu.tr)

# b) DERSLER (120 ders):
#    - Ders_Kodu (FAK123 formatında), Ders_Adı, Kredi, Zorunlu_Seçmeli
#    - Fakülte, Bölüm, Dönem, Öğretim_Üyesi, Kontenjan

# c) NOTLAR (5000 not kaydı):
#    - Öğrenci_No, Ders_Kodu, Vize, Final, Büt, Devam_Durumu
#    - Akademik_Yıl, Dönem, Geçme_Durumu

# 2. Veri kalitesi sorunları ekleyin:
#    - Öğrenci e-postalarında Türkçe karakter sorunları
#    - Ders adlarında tutarsız büyük/küçük harf kullanımı
#    - Bazı notlarda 0-100 dışı değerler
#    - Öğrenci numaralarında format hataları
#    - Eksik vize/final notları

# 3. String işlemleri ve veri temizleme:
#    - E-posta adreslerini standartlaştırın (türkçe karakter > ingilizce)
#    - Ders adlarını title case yapın
#    - Öğrenci numaralarını doğru formata getirin
#    - Hatalı not değerlerini düzeltin veya çıkarın

# 4. Akademik metrikleri hesaplayın:
#    - Her öğrenci için GPA (Grade Point Average) hesaplama
#    - Kredi ağırlıklı not ortalaması
#    - Dönem bazında başarı oranları
#    - Bölüm/fakülte genel başarı durumu

# 5. Karmaşık analizler:
#    - Çok seviyeli indeks kullanarak (Fakülte > Bölüm > Sınıf) analiz
#    - Her dersin geçme/kalma oranları
#    - Öğretim üyesi bazında ders başarı karşılaştırması
#    - Burs durumunun akademik başarıya etkisi

# 6. Trend analizleri:
#    - Yıllar içinde bölüm başarı trendleri
#    - Dönem bazında not ortalaması değişimleri
#    - Mezuniyet süresi analizleri (normal sürede mezun olanlar)
#    - Drop-out risk analizi

# 7. İleri seviye metrikleri:
#    - Student Success Index = (GPA * Devam_Oranı * Kredi_Yükü) / Dönem_Sayısı
#    - Department Efficiency Score = Mezun_Sayısı / (Öğretim_Üyesi_Sayısı * Ortalama_Süre)
#    - Course Difficulty Index = (1 - Geçme_Oranı) * Ortalama_Çalışma_Saati
#    - Academic Risk Score = GPA durumu + devam + finansal durum bileşenleri

# 8. Özel raporlamalar:
#    - Her bölüm için academic dashboard oluşturun
#    - Risk altındaki öğrencileri tespit edin
#    - En başarılı/başarısız dersleri listeleyin
#    - Fakülte karşılaştırmalı performans raporu

# 9. String pattern analizleri:
#    - E-posta domain analizleri
#    - Öğrenci adlarında en sık kullanılan isimler
#    - Ders kodlarından fakülte/bölüm eşleştirmeleri
#    - Şehir verilerindeki yazım hatalarını düzeltme

# 10. Kapsamlı akademik rapor:
#     - Üniversite genel durumu
#     - Bölüm bazında öneriler
#     - Risk altındaki alanlar
#     - İyileştirme önerileri
#     - KPI dashboard metrikleri
```


---

## 📊 Ödev 5: Entegre Veri Analizi ve İleri Seviye Pandas

### Görev Açıklaması
Bu son ödevde tüm öğrenilen Pandas tekniklerini kullanarak kapsamlı bir business intelligence projesi gerçekleştireceksiniz. Çok kaynaklı veri entegrasyonu, makine öğrenmesi hazırlığı ve otomatik rapor üretimi yapacaksınız.

### Yapmanız Gerekenler
1. 5 farklı veri kaynağını entegre edin
2. Makine öğrenmesi için veri hazırlayın
3. Otomatik rapor üretim sistemi kurun
4. Performance optimization uygulayın

```python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

# Pandas optimizasyon ayarları
pd.set_option('display.max_columns', None)
pd.set_option('display.precision', 3)
pd.set_option('mode.chained_assignment', None)

# BURADAN KODUNUZ BAŞLIYOR
# ========================

# 1. BEŞ FARKLI VERİ KAYNAĞINI OLUŞTURUN:

# a) SATIŞ VERİLERİ (2000 kayıt):
#    - Transaction_ID, Müşteri_ID, Ürün_ID, Tarih, Miktar, Fiyat
#    - Kanal (Online/Mağaza/Telefon), Kampanya_ID, İndirim_Oranı

# b) MÜŞTERİ DEMOGRAFİSİ (500 müşteri):
#    - Müşteri_ID, Yaş, Cinsiyet, Şehir, Gelir_Seviyesi, Meslek
#    - Kayıt_Tarihi, Son_Aktivite, Tercih_Edilen_Kanal

# c) ÜRÜN KATALOĞu (200 ürün):
#    - Ürün_ID, Ürün_Adı, Kategori, Alt_Kategori, Marka, Maliyet
#    - Tedarikçi, Stok_Seviyesi, Minimum_Stok, Lead_Time

# d) KAMPANYA VERİLERİ (50 kampanya):
#    - Kampanya_ID, Kampanya_Adı, Başlangıç_Tarihi, Bitiş_Tarihi
#    - Hedef_Segment, Bütçe, Kanal, ROI_Hedefi

# e) WEB TRAFİK VERİLERİ (5000 oturum):
#    - Session_ID, Müşteri_ID, Tarih, Sayfa_Görüntüleme, Süre
#    - Kaynak (Google/Facebook/Direct), Cihaz_Türü, Dönüşüm

# 2. VERİ KALİTESİ SORUNLARI EKLEYIN:
#    - Her veri setinde %15-20 eksik veri
#    - Çakışan ID'ler farklı formatlarda (string/int)
#    - Tarih formatları farklı
#    - Tutarsız kategori isimlendirmeleri
#    - Outlier değerler

# 3. İLERİ SEVİYE VERİ TEMİZLEME:
#    - Tüm veri tiplerini optimize edin (category, datetime, int32 vb.)
#    - Memory usage'ı minimize edin
#    - Outlier detection ve treatment uygulayın
#    - Data quality report oluşturun

# 4. KARMAŞIK VERİ ENTEGRASYONu:
#    - 5 tabloyu master dataset'e dönüştürün
#    - Join performansını optimize edin
#    - Feature engineering uygulayın (RFM, CLV, churn risk vb.)

# 5. İLERİ SEVİYE ANALİTİK METRİKLER:
#    - Customer Lifetime Value (CLV) hesaplama
#    - RFM analizi (Recency, Frequency, Monetary)
#    - Market basket analizi
#    - Cohort analizi
#    - Churn prediction features
#    - Seasonality detection

# 6. MAKİNE ÖĞRENMESİ HAZIRLIĞI:
#    - Categorical encoding (one-hot, label, target)
#    - Feature scaling ve normalization
#    - Train/test/validation split
#    - Feature selection metrikleri
#    - Missing value imputation strategies

# 7. PERFORMANCE OPTİMİZASYONU:
#    - Vectorization kullanarak apply() fonksiyonlarını optimize edin
#    - Memory efficient operations
#    - Chunk processing için büyük veri simülasyonu
#    - Query optimization

# 8. OTOMATİK RAPOR ÜRETİM SİSTEMİ:
#    - Parametrik rapor fonksiyonları oluşturun
#    - Executive dashboard metrics
#    - Anomaly detection ve alerting
#    - Automated insights generation

# 9. İŞ ZEKASI METRİKLERİ:
#    - KPI tracking dashboard
#    - Trend analysis ve forecasting hazırlığı
#    - Segment profiling
#    - Channel attribution modeling
#    - Campaign effectiveness measurement

# 10. KAPSAMLI FONKSİYON KÜTÜPHANESİ:
#     - Reusable analysis functions
#     - Data validation functions  
#     - Automated testing functions
#     - Export functions (Excel, CSV, JSON)
#     - Error handling ve logging

# 11. FİNAL DELİVERABLES:
#     - Complete data pipeline
#     - Business intelligence summary
#     - Model-ready dataset
#     - Performance benchmarks
#     - Recommendations ve next steps

# ÖNEMLİ: Bu ödev, gerçek bir veri bilimi projesinin 
# tüm aşamalarını simüle etmektedir. Code quality,
# performance ve business value odaklı çözümler üretin.
```


---

## 🎯 Değerlendirme Kriterleri

Her ödev için aşağıdaki kriterler değerlendirilecektir:

### Teknik Beceriler (60%)
- Pandas metodlarının doğru kullanımı
- Code efficiency ve optimization
- Veri kalitesi kontrolü
- Error handling

### Analitik Düşünce (25%)
- Problem çözme yaklaşımı
- İş değeri yaratan insights
- Trend ve pattern tespiti
- Actionable recommendations

### Kod Kalitesi (15%)
- Clean code principles
- Documentation ve comments
- Modular yapı
- Reproducibility

### Bonus Puanlar
- Creative solutions (+5%)
- Performance optimizations (+5%)
- Advanced techniques (+5%)

---

## 📝 Teslim Formatı

Her ödev için şunları teslim edin:

1. **Jupyter Notebook** - Tüm kodlar ve analizler
2. **Veri dosyaları** - Oluşturulan CSV/Excel dosyaları  
3. **README.md** - Proje açıklaması ve çalıştırma talimatları
4. **Summary Report** - Ana bulgular ve öneriler

**Başarılar! 🚀 Bu ödevler Pandas becerilerinizi bir üst seviyeye taşıyacak!**
