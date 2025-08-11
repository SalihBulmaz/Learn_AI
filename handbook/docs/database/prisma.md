# Node.js Prisma Rehberi
## STK Üye Yönetim ve Rapor Platformu Örneği

Bu rehber, Prisma ORM'yi PostgreSQL veritabanı ile kullanarak bir STK (Sivil Toplum Kuruluşu) üye yönetim ve rapor platformu geliştirme sürecini adım adım anlatmaktadır.

## Prisma Nedir?

Prisma, modern veritabanı işlemleri için tasarlanmış bir ORM (Object-Relational Mapping) aracıdır. Veritabanı şemasını kod ile yönetmenizi, tip güvenli sorgular yazmanızı ve veritabanı migrasyonlarını kolayca yapmanızı sağlar.

### Temel Bileşenler

1. **Prisma Schema**: Veritabanı yapısını tanımlayan dosya (`schema.prisma`)
2. **Prisma Client**: Otomatik üretilen veritabanı istemcisi
3. **Prisma Migrate**: Veritabanı şema değişikliklerini yöneten araç
4. **Prisma Studio**: Veritabanı verilerini görsel olarak yöneten araç

## Kurulum ve Başlangıç

### 1. Proje Kurulumu

```bash
npm init -y
npm install prisma @prisma/client
npm install -D prisma
```

### 2. Prisma Başlatma

```bash
npx prisma init
```

Bu komut şunları oluşturur:
- `prisma/schema.prisma` dosyası
- `.env` dosyası

### 3. Veritabanı Bağlantısı (.env)

```env
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/stk_platform"
```

## Schema Tanımlama

### Temel Schema Dosyası (schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// STK Kuruluşu
model Organization {
  id          Int      @id @default(autoincrement())
  name        String   @db.VarChar(255)
  description String?  @db.Text
  email       String   @unique @db.VarChar(255)
  phone       String?  @db.VarChar(20)
  address     String?  @db.Text
  website     String?  @db.VarChar(255)
  foundedAt   DateTime @map("founded_at")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // İlişkiler
  members     Member[]
  projects    Project[]
  donations   Donation[]
  reports     Report[]

  @@map("organizations")
}

// Üyeler
model Member {
  id             Int            @id @default(autoincrement())
  firstName      String         @map("first_name") @db.VarChar(100)
  lastName       String         @map("last_name") @db.VarChar(100)
  email          String         @unique @db.VarChar(255)
  phone          String?        @db.VarChar(20)
  birthDate      DateTime?      @map("birth_date")
  address        String?        @db.Text
  membershipType MembershipType @default(REGULAR) @map("membership_type")
  joinDate       DateTime       @default(now()) @map("join_date")
  isActive       Boolean        @default(true) @map("is_active")
  organizationId Int            @map("organization_id")
  createdAt      DateTime       @default(now()) @map("created_at")
  updatedAt      DateTime       @updatedAt @map("updated_at")

  // İlişkiler
  organization      Organization        @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  donations         Donation[]
  projectAssignments ProjectAssignment[]
  activities        ActivityLog[]

  @@index([organizationId])
  @@index([email])
  @@map("members")
}

// Üyelik Tipleri
enum MembershipType {
  REGULAR    // Düzenli Üye
  VOLUNTEER  // Gönüllü
  BOARD      // Yönetim Kurulu
  HONORARY   // Onursal Üye

  @@map("membership_type")
}

// Projeler
model Project {
  id             Int           @id @default(autoincrement())
  title          String        @db.VarChar(255)
  description    String        @db.Text
  startDate      DateTime      @map("start_date")
  endDate        DateTime?     @map("end_date")
  budget         Decimal       @db.Decimal(15, 2)
  status         ProjectStatus @default(PLANNING)
  organizationId Int           @map("organization_id")
  createdAt      DateTime      @default(now()) @map("created_at")
  updatedAt      DateTime      @updatedAt @map("updated_at")

  // İlişkiler
  organization Organization        @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  assignments  ProjectAssignment[]
  donations    Donation[]
  reports      Report[]

  @@index([organizationId])
  @@index([status])
  @@map("projects")
}

// Proje Durumları
enum ProjectStatus {
  PLANNING     // Planlama
  ACTIVE       // Aktif
  COMPLETED    // Tamamlandı
  CANCELLED    // İptal Edildi
  ON_HOLD      // Beklemede

  @@map("project_status")
}

// Proje Atamaları
model ProjectAssignment {
  id        Int                    @id @default(autoincrement())
  memberId  Int                    @map("member_id")
  projectId Int                    @map("project_id")
  role      ProjectAssignmentRole
  joinDate  DateTime               @default(now()) @map("join_date")
  leaveDate DateTime?              @map("leave_date")
  isActive  Boolean                @default(true) @map("is_active")

  // İlişkiler
  member  Member  @relation(fields: [memberId], references: [id], onDelete: Cascade)
  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@unique([memberId, projectId])
  @@index([projectId])
  @@map("project_assignments")
}

// Proje Görev Rolleri
enum ProjectAssignmentRole {
  LEADER      // Proje Lideri
  COORDINATOR // Koordinatör
  VOLUNTEER   // Gönüllü
  CONSULTANT  // Danışman

  @@map("project_assignment_role")
}

// Bağışlar
model Donation {
  id             Int           @id @default(autoincrement())
  amount         Decimal       @db.Decimal(15, 2)
  currency       String        @default("TRY") @db.VarChar(3)
  donationType   DonationType  @map("donation_type")
  description    String?       @db.Text
  donationDate   DateTime      @default(now()) @map("donation_date")
  isRecurring    Boolean       @default(false) @map("is_recurring")
  memberId       Int?          @map("member_id")
  organizationId Int           @map("organization_id")
  projectId      Int?          @map("project_id")
  createdAt      DateTime      @default(now()) @map("created_at")
  updatedAt      DateTime      @updatedAt @map("updated_at")

  // İlişkiler
  member       Member?      @relation(fields: [memberId], references: [id], onDelete: SetNull)
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  project      Project?     @relation(fields: [projectId], references: [id], onDelete: SetNull)

  @@index([organizationId])
  @@index([donationDate])
  @@index([memberId])
  @@map("donations")
}

// Bağış Tipleri
enum DonationType {
  CASH        // Nakit
  BANK_TRANSFER // Banka Havalesi
  CREDIT_CARD // Kredi Kartı
  IN_KIND     // Ayni Bağış
  VOLUNTEER_TIME // Gönüllü Zamanı

  @@map("donation_type")
}

// Raporlar
model Report {
  id             Int        @id @default(autoincrement())
  title          String     @db.VarChar(255)
  content        String     @db.Text
  reportType     ReportType @map("report_type")
  reportPeriod   String     @map("report_period") @db.VarChar(50) // "2024-Q1", "2024-01", vb.
  organizationId Int        @map("organization_id")
  projectId      Int?       @map("project_id")
  createdBy      String     @map("created_by") @db.VarChar(255)
  createdAt      DateTime   @default(now()) @map("created_at")
  updatedAt      DateTime   @updatedAt @map("updated_at")

  // İlişkiler
  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  project      Project?     @relation(fields: [projectId], references: [id], onDelete: SetNull)

  @@index([organizationId])
  @@index([reportType])
  @@index([reportPeriod])
  @@map("reports")
}

// Rapor Tipleri
enum ReportType {
  MONTHLY    // Aylık Rapor
  QUARTERLY  // Çeyreklik Rapor
  ANNUAL     // Yıllık Rapor
  PROJECT    // Proje Raporu
  FINANCIAL  // Mali Rapor
  ACTIVITY   // Faaliyet Raporu

  @@map("report_type")
}

// Aktivite Logları
model ActivityLog {
  id           Int      @id @default(autoincrement())
  memberId     Int      @map("member_id")
  activityType String   @map("activity_type") @db.VarChar(100)
  description  String   @db.Text
  createdAt    DateTime @default(now()) @map("created_at")

  // İlişkiler
  member Member @relation(fields: [memberId], references: [id], onDelete: Cascade)

  @@index([memberId])
  @@index([activityType])
  @@index([createdAt])
  @@map("activity_logs")
}
```

## Veritabanı İşlemleri

### 1. Migration Oluşturma

```bash
npx prisma migrate dev --name init
```

Bu komut:
- SQL migration dosyası oluşturur
- Veritabanında tabloları oluşturur
- Prisma Client'ı günceller

### 2. Oluşturulan SQL Yapısı

Migration sonrasında PostgreSQL'de oluşan tablolar:

```sql
-- Organizations Tablosu
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    website VARCHAR(255),
    founded_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Members Tablosu
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    birth_date DATE,
    address TEXT,
    membership_type membership_type DEFAULT 'REGULAR',
    join_date TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_members_organization_id ON members(organization_id);
CREATE INDEX idx_members_email ON members(email);
```

### 3. Prisma Studio ile Veritabanı Yönetimi

```bash
npx prisma studio
```

Bu komut web tabanlı veritabanı yönetim arayüzünü açar.

## SQL Sorguları ve Prisma Karşılıkları

### Temel CRUD İşlemleri

#### 1. Kayıt Ekleme

**SQL:**
```sql
INSERT INTO members (first_name, last_name, email, organization_id)
VALUES ('Ahmet', 'Yılmaz', 'ahmet@example.com', 1);
```

**Prisma:**
```javascript
const newMember = await prisma.member.create({
  data: {
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet@example.com',
    organizationId: 1
  }
});
```

#### 2. Kayıt Sorgulama

**SQL:**
```sql
SELECT m.*, o.name as organization_name 
FROM members m
JOIN organizations o ON m.organization_id = o.id
WHERE m.is_active = true
ORDER BY m.created_at DESC
LIMIT 10;
```

**Prisma:**
```javascript
const activeMembers = await prisma.member.findMany({
  where: { isActive: true },
  include: { organization: true },
  orderBy: { createdAt: 'desc' },
  take: 10
});
```

#### 3. Kayıt Güncelleme

**SQL:**
```sql
UPDATE members 
SET membership_type = 'VOLUNTEER', updated_at = NOW()
WHERE id = 1;
```

**Prisma:**
```javascript
const updatedMember = await prisma.member.update({
  where: { id: 1 },
  data: { membershipType: 'VOLUNTEER' }
});
```

### Kompleks Sorgular

#### 1. Grup Bazında Özet Raporu

**SQL:**
```sql
SELECT 
    o.name as organization_name,
    COUNT(m.id) as total_members,
    COUNT(CASE WHEN m.is_active = true THEN 1 END) as active_members,
    SUM(d.amount) as total_donations
FROM organizations o
LEFT JOIN members m ON o.id = m.organization_id
LEFT JOIN donations d ON o.id = d.organization_id
GROUP BY o.id, o.name
ORDER BY total_donations DESC;
```

**Prisma:**
```javascript
const organizationStats = await prisma.organization.findMany({
  select: {
    name: true,
    _count: {
      members: true
    },
    members: {
      where: { isActive: true },
      select: { id: true }
    },
    donations: {
      select: {
        amount: true
      }
    }
  }
});

// Sonuçları işleme
const processedStats = organizationStats.map(org => ({
  organizationName: org.name,
  totalMembers: org._count.members,
  activeMembers: org.members.length,
  totalDonations: org.donations.reduce((sum, d) => sum + d.amount, 0)
}));
```

#### 2. Proje Bazında Detaylı Rapor

**SQL:**
```sql
SELECT 
    p.title,
    p.status,
    COUNT(DISTINCT pa.member_id) as team_size,
    SUM(d.amount) as project_donations,
    AVG(EXTRACT(DAYS FROM (COALESCE(p.end_date, NOW()) - p.start_date))) as duration_days
FROM projects p
LEFT JOIN project_assignments pa ON p.id = pa.project_id AND pa.is_active = true
LEFT JOIN donations d ON p.id = d.project_id
WHERE p.organization_id = 1
GROUP BY p.id, p.title, p.status
ORDER BY project_donations DESC;
```

**Prisma:**
```javascript
const projectReport = await prisma.project.findMany({
  where: { organizationId: 1 },
  select: {
    title: true,
    status: true,
    startDate: true,
    endDate: true,
    assignments: {
      where: { isActive: true },
      select: { memberId: true }
    },
    donations: {
      select: { amount: true }
    }
  }
});
```

## İlişki (Relation) Yönetimi

### 1. One-to-Many İlişkiler

```prisma
// Bir kuruluşun birden fazla üyesi olabilir
model Organization {
  id      Int      @id @default(autoincrement())
  name    String
  members Member[] // One-to-many
}

model Member {
  id             Int          @id @default(autoincrement())
  name           String
  organizationId Int
  organization   Organization @relation(fields: [organizationId], references: [id])
}
```

### 2. Many-to-Many İlişkiler

```prisma
// Üyeler birden fazla projeye atanabilir, projeler birden fazla üyeye sahip olabilir
model Member {
  id          Int                 @id @default(autoincrement())
  assignments ProjectAssignment[]
}

model Project {
  id          Int                 @id @default(autoincrement())
  assignments ProjectAssignment[]
}

model ProjectAssignment {
  memberId  Int
  projectId Int
  role      String
  
  member  Member  @relation(fields: [memberId], references: [id])
  project Project @relation(fields: [projectId], references: [id])
  
  @@id([memberId, projectId])
}
```

### 3. Self İlişkiler

```prisma
// Üyeler arasında mentor-mentee ilişkisi
model Member {
  id       Int      @id @default(autoincrement())
  mentorId Int?
  mentor   Member?  @relation("MentorMentee", fields: [mentorId], references: [id])
  mentees  Member[] @relation("MentorMentee")
}
```

## DBML Dönüştürme

### DBML Nedir?

DBML (Database Markup Language), veritabanı şemalarını görsel olarak temsil etmek için kullanılan bir işaretleme dilidir.

### Prisma'dan DBML'ye Dönüştürme

#### 1. Gerekli Paketi Yükleme

```bash
npm install -D prisma-dbml-generator
```

#### 2. Schema'ya Generator Ekleme

```prisma
generator dbml {
  provider = "prisma-dbml-generator"
  output   = "./dbml"
}
```

#### 3. DBML Oluşturma

```bash
npx prisma generate
```

#### 4. Oluşturulan DBML Dosyası Örneği

```dbml
Table organizations {
  id int [pk, increment]
  name varchar(255) [not null]
  description text
  email varchar(255) [unique, not null]
  phone varchar(20)
  address text
  website varchar(255)
  founded_at timestamp [not null]
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Table members {
  id int [pk, increment]
  first_name varchar(100) [not null]
  last_name varchar(100) [not null]
  email varchar(255) [unique, not null]
  phone varchar(20)
  birth_date date
  address text
  membership_type membership_type [default: 'REGULAR']
  join_date timestamp [default: `now()`]
  is_active boolean [default: true]
  organization_id int [ref: > organizations.id]
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Table projects {
  id int [pk, increment]
  title varchar(255) [not null]
  description text [not null]
  start_date timestamp [not null]
  end_date timestamp
  budget decimal(15,2) [not null]
  status project_status [default: 'PLANNING']
  organization_id int [ref: > organizations.id]
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Table project_assignments {
  id int [pk, increment]
  member_id int [ref: > members.id]
  project_id int [ref: > projects.id]
  role project_assignment_role [not null]
  join_date timestamp [default: `now()`]
  leave_date timestamp
  is_active boolean [default: true]
}

Table donations {
  id int [pk, increment]
  amount decimal(15,2) [not null]
  currency varchar(3) [default: 'TRY']
  donation_type donation_type [not null]
  description text
  donation_date timestamp [default: `now()`]
  is_recurring boolean [default: false]
  member_id int [ref: > members.id]
  organization_id int [ref: > organizations.id]
  project_id int [ref: > projects.id]
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Enum membership_type {
  REGULAR
  VOLUNTEER
  BOARD
  HONORARY
}

Enum project_status {
  PLANNING
  ACTIVE
  COMPLETED
  CANCELLED
  ON_HOLD
}
```

### DBML'den Diagram Oluşturma

#### 1. dbdiagram.io Kullanımı

- DBML dosyasının içeriğini kopyalayın
- https://dbdiagram.io sitesine gidin
- Kodu yapıştırın
- Otomatik olarak ER diagram oluşur

#### 2. CLI ile PNG/SVG Export

```bash
npm install -g @dbml/cli
dbml2sql schema.dbml --postgres
```

## Pratik Örnekler ve İpuçları

### 1. Veritabanı Seed (Tohum) Verisi

`prisma/seed.js` dosyası:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Kuruluş oluştur
  const org = await prisma.organization.create({
    data: {
      name: 'Çevre Koruma Derneği',
      email: 'info@cevredernek.org',
      description: 'Çevre koruma alanında faaliyet gösteren STK',
      foundedAt: new Date('2020-01-01'),
      website: 'https://cevredernek.org'
    }
  });

  // Üyeler oluştur
  const members = await prisma.member.createMany({
    data: [
      {
        firstName: 'Ayşe',
        lastName: 'Kaya',
        email: 'ayse@example.com',
        membershipType: 'BOARD',
        organizationId: org.id
      },
      {
        firstName: 'Mehmet',
        lastName: 'Demir',
        email: 'mehmet@example.com',
        membershipType: 'VOLUNTEER',
        organizationId: org.id
      }
    ]
  });

  console.log('Tohum veri oluşturuldu');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

### 2. Faydalı Prisma Komutları

```bash
# Veritabanını sıfırla
npx prisma db push --force-reset

# Schema'dan SQL oluştur
npx prisma db pull

# Mevcut veritabanından schema oluştur
npx prisma db pull

# Client'ı yeniden oluştur
npx prisma generate

# Formatla
npx prisma format
```

### 3. Raw SQL Sorguları

Karmaşık sorgular için raw SQL kullanabilirsiniz:

```javascript
// Ham SQL sorgusu
const result = await prisma.$queryRaw`
  SELECT 
    DATE_TRUNC('month', donation_date) as month,
    SUM(amount) as monthly_total
  FROM donations 
  WHERE organization_id = ${orgId}
  GROUP BY DATE_TRUNC('month', donation_date)
  ORDER BY month;
`;

// Parametreli sorgu
const memberStats = await prisma.$queryRaw`
  SELECT 
    membership_type,
    COUNT(*) as member_count,
    AVG(EXTRACT(YEAR FROM AGE(birth_date))) as avg_age
  FROM members 
  WHERE organization_id = ${organizationId}
  GROUP BY membership_type;
`;
```

### 4. Transaction İşlemleri

```javascript
// İşlem (Transaction) örneği
const transferDonation = await prisma.$transaction(async (tx) => {
  // Bağışı oluştur
  const donation = await tx.donation.create({
    data: {
      amount: 1000,
      donationType: 'BANK_TRANSFER',
      organizationId: orgId,
      memberId: memberId
    }
  });

  // Aktivite logu ekle
  await tx.activityLog.create({
    data: {
      memberId: memberId,
      activityType: 'DONATION',
      description: `${donation.amount} TL bağış yapıldı`
    }
  });

  return donation;
});
```

## Sonuç

Bu rehber, Prisma ORM'nin temel özelliklerini STK üye yönetim platformu örneği üzerinden göstermiştir. Prisma'nın güçlü yanları:

- **Tip güvenliği**: Otomatik tip üretimi
- **Kolay migration**: Veritabanı değişikliklerini takip etme
- **İlişki yönetimi**: Karmaşık ilişkileri basit syntax ile tanımlama
- **Raw SQL desteği**: Karmaşık sorgular için ham SQL kullanabilme
- **Görsel araçlar**: Prisma Studio ve DBML dönüştürme

Bu temel bilgiler ile PostgreSQL veritabanı kullanan Node.js projelerinizde Prisma'yı etkili şekilde kullanabilirsiniz.