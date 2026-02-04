const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");

const allowedSessions = new Set();

const axios = require("axios"); // Tambahkan di atas

async function logToSheet({ name, number, menu }) {
  try {
    await axios.post("https://script.google.com/macros/s/AKfycbziT53eMvlQ-yHB8rGzq6W9hkJIUNpzUScaQ0rg3y834ZOeW6UM2cE_ENAwJjMBinQ/exec", {
      name,
      number,
      menu
    });
  } catch (e) {
    console.error("[LOGGING ERROR]", e.message);
  }
}

module.exports = class BotController extends Controller {

  async replyWithFooter(text) {
    return this.reply(`${text}\n\n${f("footer")}`);
  }

  async introduction(request) {
    const user = request.number;
    console.log("[INTRODUCTION] From:", user);

    if (allowedSessions.has(user)) return;

    const text = `*Halo, Sahabat Data!*\n\nSelamat datang di *Tikko*\n(Tanya Statistik Kepahiang Online) — Layanan chatbot resmi dari BPS Kabupaten Kepahiang.\n\nKetik *MENU* untuk melihat daftar layanan.`;
    return this.replyWithFooter(text);
  }


  async menu(request) {
    const user = request.number;
    if (allowedSessions.has(user)) return;

    const daftarMenu = [
      f("menu.tentangBPS"),
      f("menu.perpustakaan"),
      f("menu.konsultasi"),
      f("menu.rekomendasiSektoral"),
      f("menu.faq"),
      f("menu.janjitemu"),
      f("menu.pengaduan"),
      f("menu.selesaimenu")
    ];

    return this.replyWithFooter(`📋 *Menu Layanann Tikko*\n\nSilakan pilih layanan dengan mengetik sesuai menu yang tersedia.\nContoh : *1*\n\n${daftarMenu.map((m, i) => `*${i + 1}*. ${m}`).join("\n")}`);
  }

  async tentangBPS(request) {
  const user = request.number;
  if (allowedSessions.has(user)) return;

  return this.replyWithFooter(`🏢 *Tentang BPS Kabupaten Kepahiang*

Badan Pusat Statistik Kabupaten Kepahiang adalah instansi resmi yang menyajikan data statistik terpercaya untuk masyarakat dan pemerintah daerah.

*Alamat Kantor:*
Komplek Perkantoran Pemda, Desa Pelangkian, Kecamatan Kepahiang, Kabupaten Kepahiang, Bengkulu.
🔗 https://maps.app.goo.gl/2kJenAzWUaQCsxvC8

untuk *Layanan tatap muka*, kunjungi kantor kami pada:  
Hari  : Senin–Jumat  
Jam Pelayanan : 08.00-15.00 WIB
`);
}


  async perpustakaan(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

    const daftarSubmenu = [f("menu.publikasi"), f("menu.datasatistik")];
    return this.replyWithFooter(`📚 *Layanan Perpustakaan BPS Kabupaten Kepahiang*\n\nSilakan pilih layanan dengan mengetik sesuai menu yang tersedia.\nContoh : *21*\n\n${daftarSubmenu.map((m, i) => `*${21 + i}*. ${m}`).join("\n")}
    `)}

  async publikasi(request) {
    const user = request.number;
    if (allowedSessions.has(user)) return;
    return this.replyWithFooter(`📚 Publikasi Statistik BPS Kabupaten Kepahiang

Berikut beberapa publikasi terbaru yang paling sering diakses:

1. Kabupaten Kepahiang Dalam Angka 2025
🔗 https://s.bps.go.id/KepahiangDalamAngka2025
2. Indeks Pembangunan Manusia 2023
🔗 https://s.bps.go.id/IPMKepahiang2025
3. Indikator Strategis Kabupaten Kepahiang 2023
🔗 https://s.bps.go.id/IndikatorStartegisKepahiang2023

Lihat semua publikasi dan unduh versi lengkapnya di:
https://kepahiangkab.bps.go.id/id/publication

────────────
📌 Belum menemukan data yang dicari?
Ketik *2* untuk melihat pilihan *Layanan Perpustakaan* lainnya.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`);
  }

  async datasatistik(request) {
    const user = request.number;
    if (allowedSessions.has(user)) return;
    const submenu = [f("menu.statistikSosial"), f("menu.statistikEkonomi"), f("menu.statistikLingkungan")];
    return this.replyWithFooter(`📊 *Data Statistik Berdasarkan Kategori*\n\nSilakan pilih kategori dengan mengetik sesuai menu yang tersedia.\nContoh : *221*\n\n${submenu.map((m, i) => `*22${i + 1}*. ${m}`).join("\n")}`);
  }

  async statistikSosial(request) {
    const user = request.number;
    if (allowedSessions.has(user)) return;
  const submenu = [
    "Kependudukan dan Migrasi",
    "Tenaga Kerja",
    "Pendidikan",
    "Kesehatan",
    "Konsumsi dan Pendapatan",
    "Perlindungan Sosial",
    "Pemukiman dan Perumahan",
    "Hukum dan Kriminal",
    "Budaya",
    "Aktivitas Politik dan Komunitas Lainnya",
    "Penggunaan Waktu"
  ];

  return this.replyWithFooter(
    `📊 *Statistik Demografi dan Sosial*\n\nSilakan pilih sub kategori dengan mengetik sesuai menu yang tersedia.\nContoh : *2211*\n\n${submenu.map((m, i) => `*221${i + 1}*. ${m}`).join("\n")}
    
────────────
📌 Belum menemukan subkategori yang sesuai?
Ketik 22 untuk kembali ke daftar kategori Data Statistik.`
  );
}

async sosialKependudukan(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `👨‍👩‍👧 *Statistik Kependudukan dan Migrasi*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=519

────────────
📌 Belum menemukan data yang dicari?
Ketik *221* untuk kembali ke daftar sub kategori data *Statistik Demografi dan Sosial*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async sosialTenagaKerja(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `💼 *Statistik Tenaga Kerja*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=520

────────────
📌 Belum menemukan data yang dicari?
Ketik *221* untuk kembali ke daftar sub kategori data *Statistik Demografi dan Sosial*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async sosialPendidikan(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🎓 *Statistik Pendidikan*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=521

────────────
📌 Belum menemukan data yang dicari?
Ketik *221* untuk kembali ke daftar sub kategori data *Statistik Demografi dan Sosial*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async sosialKesehatan(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🏥 *Statistik Kesehatan*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=522

────────────
📌 Belum menemukan data yang dicari?
Ketik *221* untuk kembali ke daftar sub kategori data *Statistik Demografi dan Sosial*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async sosialKonsumsi(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🛒 *Statistik Konsumsi dan Pendapatan*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=523

────────────
📌 Belum menemukan data yang dicari?
Ketik *221* untuk kembali ke daftar sub kategori data *Statistik Demografi dan Sosial*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async sosialPerlindungan(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🤝 *Statistik Perlindungan Sosial*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=524

────────────
📌 Belum menemukan data yang dicari?
Ketik *221* untuk kembali ke daftar sub kategori data *Statistik Demografi dan Sosial*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async sosialPemukiman(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🏘 *Statistik Pemukiman dan Perumahan*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=525

────────────
📌 Belum menemukan data yang dicari?
Ketik *221* untuk kembali ke daftar sub kategori data *Statistik Demografi dan Sosial*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async sosialKriminal(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `⚖️ *Statistik Hukum dan Kriminal*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=526

────────────
📌 Belum menemukan data yang dicari?
Ketik *221* untuk kembali ke daftar sub kategori data *Statistik Demografi dan Sosial*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async sosialBudaya(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🎭 *Statistik Budaya*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=527

────────────
📌 Belum menemukan data yang dicari?
Ketik *221* untuk kembali ke daftar sub kategori data *Statistik Demografi dan Sosial*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async sosialPolitik(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🗳 *Statistik Politik dan Komunitas*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=528

────────────
📌 Belum menemukan data yang dicari?
Ketik *221* untuk kembali ke daftar sub kategori data *Statistik Demografi dan Sosial*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async sosialWaktu(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `⏱ *Statistik Penggunaan Waktu*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=529

────────────
📌 Belum menemukan data yang dicari?
Ketik *221* untuk kembali ke daftar sub kategori data *Statistik Demografi dan Sosial*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}


  async statistikEkonomi(request) {
    const user = request.number;
    if (allowedSessions.has(user)) return;
  const submenu = [
    "Statistik Makroekonomi",
    "Neraca Ekonomi",
    "Statistik Bisnis",
    "Statistik Sektoral",
    "Keuangan Pemerintah & Statistik Publik",
    "Perdagangan & Neraca Pembayaran",
    "Harga-Harga",
    "Biaya Tenaga Kerja",
    "IPTEK & Inovasi",
    "Pertanian, Kehutanan, Perikanan",
    "Energi",
    "Pertambangan, Manufaktur, Konstruksi",
    "Transportasi",
    "Pariwisata",
    "Perbankan & Finansial"
  ];

  return this.replyWithFooter(`📊 *Data Statistik Ekonomi*\n\nSilakan pilih sub kategori dengan mengetik sesuai menu yang tersedia.\nContoh : *2221*\n\n${submenu.map((m, i) => `*222${i + 1}*. ${m}`).join("\n")}
  
    
────────────
📌 Belum menemukan subkategori yang sesuai?
Ketik 22 untuk kembali ke daftar kategori Data Statistik.`);
}

async ekonomiMakro(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `📈 *Statistik Ekonomi Makro*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=530

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiNeraca(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `📊 *Statistik Neraca dan Produk Domestik Regional Bruto (PDRB)*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=531

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiBisnis(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🏢 *Statistik Usaha dan Bisnis*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=532

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiSektoral(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🏭 *Statistik Sektoral Ekonomi*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=533

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiKeuanganPublik(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `💰 *Statistik Keuangan Publik*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=534

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiPerdagangan(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🛍 *Statistik Perdagangan*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=535

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiHarga(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `💹 *Statistik Harga dan Inflasi*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=536

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiTenagaKerja(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `👷‍♂️ *Statistik Ekonomi Tenaga Kerja*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=537

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiIptek(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🔬 *Statistik Ekonomi Ilmu Pengetahuan dan Teknologi*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=538

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiPertanian(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🌾 *Statistik Ekonomi Pertanian*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=557

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiEnergi(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `⚡ *Statistik Ekonomi Energi*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=558

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiIndustri(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🏭 *Statistik Industri*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=559

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiTransportasi(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🚚 *Statistik Transportasi*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=560

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiPariwisata(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🌴 *Statistik Pariwisata*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=561

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async ekonomiFinansial(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🏦 *Statistik Finansial dan Perbankan*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=562

────────────
📌 Belum menemukan data yang dicari?
Ketik *222* untuk kembali ke daftar sub kategori data *Statistik Ekonomi*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}


  async statistikLingkungan(request) {
    const user = request.number;
    if (allowedSessions.has(user)) return;
  const submenu = [
    "Lingkungan",
    "Statistik Regional & Area Kecil",
    "Statistik & Indikator Multi-Domain",
    "Buku Tahunan & Ringkasan Sejenis",
    "Kondisi Tempat Tinggal, Kemiskinan, dan Sosial Lintas Sektor",
    "Gender & Kelompok Populasi Khusus",
    "Masyarakat Informasi",
    "Globalisasi",
    "Indikator MDGs",
    "Perkembangan Berkelanjutan",
    "Kewirausahaan"
  ];

  return this.replyWithFooter(`📊 *Data Statistik Lingkungan Hidup & Multi-domain*\n\nSilakan pilih sub kategori dengan mengetik sesuai menu yang tersedia.\nContoh : *2231*\n\n${submenu.map((m, i) => `*223${i + 1}*. ${m}`).join("\n")}
    
────────────
📌 Belum menemukan subkategori yang sesuai?
Ketik 22 untuk kembali ke daftar kategori Data Statistik.`);
}

async lingkungan(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🌿 *Statistik Lingkungan Hidup*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=539

────────────
📌 Belum menemukan data yang dicari?
Ketik *223* untuk kembali ke daftar sub kategori data *Statistik Lingkungan & Multidomain*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async regionalAreaKecil(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🗺 *Statistik Wilayah dan Area Kecil*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=540

────────────
📌 Belum menemukan data yang dicari?
Ketik *223* untuk kembali ke daftar sub kategori data *Statistik Lingkungan & Multidomain*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async multiDomain(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `📚 *Statistik Multidomain dan Integratif*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=541

────────────
📌 Belum menemukan data yang dicari?
Ketik *223* untuk kembali ke daftar sub kategori data *Statistik Lingkungan & Multidomain*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async bukuTahunan(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `📖 *Buku Tahunan Statistik*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=542

────────────
📌 Belum menemukan data yang dicari?
Ketik *223* untuk kembali ke daftar sub kategori data *Statistik Lingkungan & Multidomain*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async kemiskinanLintasSektor(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🤝 *Statistik Kemiskinan Lintas Sektor*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=563

────────────
📌 Belum menemukan data yang dicari?
Ketik *223* untuk kembali ke daftar sub kategori data *Statistik Lingkungan & Multidomain*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async genderKhusus(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🚺 *Statistik Gender dan Kelompok Khusus*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=564

────────────
📌 Belum menemukan data yang dicari?
Ketik *223* untuk kembali ke daftar sub kategori data *Statistik Lingkungan & Multidomain*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async masyarakatInformasi(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `📱 *Statistik Masyarakat Informasi*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=565

────────────
📌 Belum menemukan data yang dicari?
Ketik *223* untuk kembali ke daftar sub kategori data *Statistik Lingkungan & Multidomain*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async globalisasi(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🌐 *Statistik Globalisasi*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=566

────────────
📌 Belum menemukan data yang dicari?
Ketik *223* untuk kembali ke daftar sub kategori data *Statistik Lingkungan & Multidomain*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async mdgs(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `📌 *Statistik Tujuan Pembangunan Milenium (MDGs)*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=567

────────────
📌 Belum menemukan data yang dicari?
Ketik *223* untuk kembali ke daftar sub kategori data *Statistik Lingkungan & Multidomain*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}

async berkelanjutan(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🌱 *Statistik Tujuan Pembangunan Berkelanjutan (TPB/SDGs)*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=568

────────────
📌 Belum menemukan data yang dicari?
Ketik *223* untuk kembali ke daftar sub kategori data *Statistik Lingkungan & Multidomain*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
 );
}

async kewirausahaan(request) {
  const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Perpustakaan"
  });
  return this.replyWithFooter(
    `🚀 *Statistik Kewirausahaan*

📊 Lihat data lengkap:
https://kepahiangkab.bps.go.id/id/statistics-table?subject=569

────────────
📌 Belum menemukan data yang dicari?
Ketik *223* untuk kembali ke daftar sub kategori data *Statistik Lingkungan & Multidomain*.

✅ Sudah selesai?
Ketik *8* untuk menutup sesi layanan.`
  );
}


  async konsultasi(request) {
  const user = request.number;
  if (allowedSessions.has(user)) return;

  return this.replyWithFooter (`🤝 *Layanan Konsultasi Statistik*

Ingin berkonsultasi langsung dengan petugas statistik BPS Kabupaten Kepahiang?
Ketik : *Tanya PeTik*

PeTik (Petugas Statistik) siap membantu Sahabat Data dalam berbagai hal, seperti:
- Permintaan dan pemahaman data  
- Interpretasi hasil statistik  
- Penjelasan metadata  
- Metode pengumpulan dan analisis  
- Proses penyusunan hingga penyajian data statistik

apabila Sahabat Data ingin berkonsultasi secara daring langsung melalui BPS Pusat, silakan akses:  
🔗 https://konsultasi.bps.go.id`);
}

  async rekomendasiSektoral(request) {
     const user = request.number;
  const name = request.name;
  const number = request.number;
  if (allowedSessions.has(user)) return;

  await logToSheet({
    name,
    number,
    menu: "Layanan Romantik"
  });
    return this.replyWithFooter(`📄 *Rekomendasi Kegiatan Statistik Sektoral*

Sahabat Data dari instansi pemerintah yang akan melakukan survei atau pengumpulan data statistik?  
Pastikan kegiatanmu memiliki *rekomendasi resmi* dari BPS melalui sistem *ROMANTIK* ya!

🔗 Ajukan langsung di:  
https://s.bps.go.id/RekomendasiStatistikKepahiang

🛠️ *Prosedur Singkat*  
1. Buka Website Romantik  
2. Unggah rancangan kegiatan & isi formulir  
3. Tunggu proses verifikasi oleh Diskominfo & BPS  
4. Jika sesuai, surat rekomendasi akan terbit maksimal *3 hari* setelah dinyatakan layak

📘 Buku Pedoman  
https://drive.google.com/file/d/1O7AhB1zW96o5nFTN3rO6dE1Tudbu0x1O/view

🎥 Video Panduan  
https://www.youtube.com/watch?v=Oy4IT2-K8Yw&t=3s

────────────
✅ Sudah selesai?  
Ketik *8* untuk menutup sesi layanan.`);
;
  }

  async faq(request) {
  const user = request.number;
  if (allowedSessions.has(user)) return;

  return this.replyWithFooter(`❓ *Pertanyaan yang Sering Diajukan (FAQ)*

Silakan ketik angka sesuai pertanyaan berikut untuk melihat jawabannya.  
Contoh: *51*

*51*. Apa itu BPS dan apa tugasnya?  
*52*. Apa saja layanan yang disediakan BPS?  
*53*. Bagaimana cara mendapatkan data dari BPS?  
*54*. Berapa biaya untuk permintaan data di BPS?  
*55*. Apa itu publikasi 'Kepahiang Dalam Angka'?  
*56*. Apa bedanya Sensus, Survei, dan Registrasi?  
*57*. Kenapa data saya berbeda dengan data BPS?  
*58*. Tidak menemukan data yang dicari?  
*59*. Apakah data BPS boleh digunakan untuk tugas, laporan, atau publikasi?  
*510*. Apakah BPS membuka lowongan kerja, magang, atau kunjungan edukasi?  
*511*. Apakah bisa konsultasi langsung dengan petugas statistik?

────────────
📌 *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
}


async faqApaItuBPS(request) {
  const user = request.number;
  if (allowedSessions.has(user)) return;
return this.replyWithFooter(`🏢 *Apa itu BPS dan apa tugasnya?*

BPS (Badan Pusat Statistik) adalah Lembaga Pemerintah Nonkementerian yang bertanggung jawab langsung kepada Presiden, dibentuk berdasarkan UU No. 16 Tahun 1997 tentang Statistik

🔎 Sesuai UU tersebut, tugas utama BPS mencakup:
- Menyelenggarakan statistik dasar (oleh BPS), statistik sektoral (oleh instansi), dan statistik khusus (oleh masyarakat atau lembaga lain).
- Menyediakan data statistik terpercaya bagi pemerintah dan masyarakat.
- Membina, mengembangkan metodologi, serta meningkatkan sistem statistik nasional.
- Menyebarluaskan hasil statistik melalui *Berita Resmi Statistik (BRS)* secara terbuka dan berkala.

📖 Info selengkapnya dapat dibaca di:  
🔗 https://ppid.bps.go.id/app/konten/0000/Profil-BPS.html

────────────  
✅ *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
}

async faqLayananBPS(request) {
  const user = request.number;
  if (allowedSessions.has(user)) return;
  return this.replyWithFooter(`📌 *Apa saja layanan yang disediakan BPS?*

BPS menyediakan berbagai layanan statistik untuk mendukung kebutuhan data masyarakat, instansi pemerintah, akademisi, hingga pelaku usaha. Di antaranya:

1. *Layanan Perpustakaan Statistik*  
Menyediakan akses terhadap publikasi statistik dalam bentuk cetak maupun digital. Layanan ini dapat diakses langsung di kantor BPS atau melalui situs resmi.
👉 Ketik *2* untuk mengakses Layanan Perpustakaan.

2. *Layanan Konsultasi Statistik*  
Melayani konsultasi langsung dengan petugas statistik, baik terkait pencarian data, pemahaman metadata, metode statistik, dan sebagainya. Konsultasi dapat dilakukan secara luring atau daring.
👉 Ketik *3* untuk mengakses Layanan Konsultasi.

3. *Layanan Rekomendasi Kegiatan Statistik (Romantik)*  
Diberikan kepada instansi pemerintah yang akan melaksanakan pengumpulan data. Rekomendasi ini memastikan kegiatan sesuai standar statistik nasional dan tidak tumpang tindih.
👉 Ketik *4* untuk mengakses layanan Romantik.

4. *Layanan Produk Statistik Berbayar*  
Merupakan layanan data yang bersifat sangat rinci atau customized. Layanan ini hanya tersedia di tingkat *BPS Provinsi* atau *BPS Pusat*, dan tidak dilayani di BPS Kabupaten/Kota.
⚠️ Catatan: BPS Kabupaten Kepahiang *tidak melayani* produk berbayar ini secara langsung.

🔗 Informasi lebih lengkap mengenai layanan BPS dapat diakses melalui:  
https://pst.bps.go.id

────────────  
✅ *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
}

async faqAksesData(request) {
   const user = request.number;
  if (allowedSessions.has(user)) return;
  return this.replyWithFooter(`📊 *Bagaimana cara mendapatkan data dari BPS?*

Sahabat Data dapat memperoleh data statistik dari BPS melalui beberapa cara berikut:

1. 🌐 *Melalui Website Resmi*  
Akses berbagai publikasi, data tabel, infografis, dan berita resmi statistik melalui:  
🔗 https://www.bps.go.id  
🔗 https://kepahiangkab.bps.go.id (khusus BPS Kabupaten Kepahiang)  

Untuk memudahkan pencarian berdasarkan kategori pustaka tertentu, Sahabat Data dapat menggunakan menu TikKo:  
👉 Ketik *2* untuk membuka layanan *Perpustakaan Statistik*.

2. 🤝 *Konsultasi Statistik*  
Jika bingung memilih data yang sesuai, Sahabat Data dapat berkonsultasi langsung dengan petugas kami.  
👉 Ketik *3* untuk menggunakan layanan *Konsultasi Statistik*.

3. 🏢 *Berkunjung langsung ke Kantor BPS*  
Sahabat Data juga dapat mengunjungi langsung kantor BPS Kabupaten Kepahiang.  
Untuk kemudahan layanan, disarankan membuat janji temu terlebih dahulu.  
👉 Ketik *6* untuk membuat janji kunjungan.

────────────  
✅ *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
}

async faqBiayaData(request) {
     const user = request.number;
  if (allowedSessions.has(user)) return;
  return this.replyWithFooter(`💰 *Berapa biaya untuk permintaan data di BPS?*

Seluruh layanan statistik BPS dapat diakses secara *GRATIS* oleh masyarakat.  
Sahabat Data dapat mengunduh publikasi, melihat tabel statistik, berkonsultasi, ataupun mengajukan rekomendasi statistik tanpa dipungut biaya.

────────────  
✅ *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
}

async faqKepahiangDalamAngka(request) {
  const user = request.number;
  if (allowedSessions.has(user)) return;
  return this.replyWithFooter(`📘 *Apa itu publikasi “Kepahiang Dalam Angka”?*

_Kepahiang Dalam Angka_ (KDA) adalah publikasi statistik tahunan yang diterbitkan oleh BPS Kabupaten Kepahiang. Publikasi ini menyajikan berbagai data penting tentang kondisi wilayah Kabupaten Kepahiang, seperti:

- Jumlah penduduk  
- Pendidikan dan kesehatan  
- Pertanian, perdagangan, dan industri  
- Transportasi, inflasi, dan lain-lain

KDA sangat berguna untuk kebutuhan perencanaan, evaluasi pembangunan, penelitian, penyusunan laporan, dan pengambilan keputusan berbasis data.

Sahabat Data dapat mengakses publikasi ini secara gratis melalui tautan berikut:  
🔗 https://s.bps.go.id/KepahiangDalamAngka2025

────────────  
✅ *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
}

async faqPerbedaanSensus(request) {
  const user = request.number;
  if (allowedSessions.has(user)) return;
  return this.replyWithFooter(`📊 *Apa bedanya Sensus, Survei, dan Registrasi?*

📌 *Sensus*  
Kegiatan pendataan menyeluruh terhadap seluruh penduduk atau objek lainnya di suatu wilayah. Dilakukan secara berkala oleh BPS, seperti *Sensus Penduduk* (10 tahun sekali) dan *Sensus Pertanian* (10 tahun sekali).

📌 *Survei*  
Pendataan terhadap sebagian populasi (sampel) untuk mewakili keseluruhan. Survei dilakukan lebih sering dan fokus pada topik tertentu, misalnya *Survei Angkatan Kerja Nasional (Sakernas)*.

📌 *Registrasi*  
Pencatatan administratif yang dilakukan secara terus-menerus oleh instansi tertentu, misalnya pencatatan kelahiran, kematian, dan pernikahan oleh Dinas Dukcapil.

➡️ Ketiga metode ini saling melengkapi untuk menyajikan data statistik yang akurat dan komprehensif.

────────────  
✅ *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
}

async faqPerbedaanData(request) {
    const user = request.number;
  if (allowedSessions.has(user)) return;
  return this.replyWithFooter(`📊 *Kenapa data saya berbeda dengan data BPS?*

Perbedaan data bisa terjadi karena beberapa faktor berikut:

1️⃣ **Perbedaan definisi dan konsep**  
BPS menggunakan definisi, klasifikasi, dan konsep statistik yang baku dan sesuai standar nasional maupun internasional.

2️⃣ **Waktu dan periode pengumpulan data**  
Perbedaan waktu survei atau publikasi bisa menyebabkan hasil yang tidak sama.

3️⃣ **Sumber data yang berbeda**  
BPS mengumpulkan data dari berbagai sumber: sensus, survei, dan kompilasi produk administrasi. Jika data Anda berasal dari sumber non-BPS, wajar bila terjadi perbedaan.

4️⃣ **Unit analisis yang tidak sama**  
Misalnya, data tingkat desa tentu berbeda dibanding data tingkat kabupaten.

🧩 *Solusi:*  
Sebaiknya bandingkan data sejenis dari sumber yang sama. Jika Sahabat Data butuh penjelasan lebih lanjut, silakan ketik *3* untuk konsultasi langsung.

────────────  
✅ *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
}

async faqTidakMenemukanData(request) {
    const user = request.number;
  if (allowedSessions.has(user)) return;
  return this.replyWithFooter(`🔍 *Tidak menemukan data yang dicari?*

Tenang, Sahabat Data! Jika data yang dicari belum ditemukan di website BPS, Anda bisa mencoba langkah-langkah berikut:

1. *Periksa kembali kategori dan tahun data.*  
Gunakan fitur pencarian atau jelajahi menu publikasi dan tabel data statistik.
Jika ingin menelusuri data melalui TikKo, silakan ketik *2* untuk membuka *Layanan Perpustakaan*.

2. *Gunakan layanan konsultasi statistik.*  
Ingin bertanya langsung secara online? Ketik *3*.  
Jika ingin datang langsung ke kantor, buat janji temu terlebih dahulu dengan mengetik *6*.

────────────  
✅ *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
}

async faqPenggunaanData(request) {
      const user = request.number;
  if (allowedSessions.has(user)) return;
  return this.replyWithFooter(`📚 *Apakah data BPS boleh digunakan untuk tugas, laporan, atau publikasi ilmiah?*

Tentu saja boleh, Sahabat Data!  
Data yang dipublikasikan oleh BPS bersifat _open data_ dan dapat digunakan untuk berbagai keperluan seperti:

- Tugas sekolah/kuliah
- Laporan kerja
- Penelitian akademik
- Artikel atau publikasi ilmiah

Namun, mohon tetap mencantumkan *sumber data* dengan benar, misalnya:  
📌 *Sumber: BPS Kabupaten Kepahiang, 2025*

Hal ini penting untuk menjaga keakuratan dan kepercayaan terhadap data.

────────────  
✅ *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
}

async faqLowonganMagang(request) {
        const user = request.number;
  if (allowedSessions.has(user)) return;
  return this.replyWithFooter(`🧑‍💼 *Apakah BPS membuka lowongan kerja, magang, atau kunjungan edukatif?*

📌 *Lowongan Kerja:*  
BPS membuka rekrutmen CPNS secara nasional melalui platform resmi:  
🔗 https://sscasn.bkn.go.id  
Pengumuman resmi juga diumumkan di website BPS:  
🔗 https://www.bps.go.id

📌 *Magang dan Kunjungan Edukasi:*  
BPS Kabupaten Kepahiang dapat mempertimbangkan permohonan magang atau kunjungan edukatif dari sekolah maupun perguruan tinggi, *tergantung kebijakan, kapasitas, dan kebutuhan kantor*.  
Silakan ajukan surat permohonan resmi ke email kantor atau datang langsung untuk informasi lebih lanjut.

────────────  
✅ *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
}

async faqKonsultasi(request) {
  const user = request.number;
  if (allowedSessions.has(user)) return;
  return this.replyWithFooter(`🤝 *Apakah bisa konsultasi langsung dengan petugas statistik?*

Tentu bisa, Sahabat Data!  
BPS Kabupaten Kepahiang menyediakan layanan konsultasi statistik secara gratis untuk masyarakat, akademisi, dan instansi.

Anda dapat berkonsultasi terkait:
- Interpretasi data dan statistik resmi  
- Penjelasan konsep dan metadata  
- Teknik pengumpulan dan analisis data  
- Pemanfaatan data untuk laporan, penelitian, atau kebijakan

📍 Konsultasi dapat dilakukan dengan dua cara:
1️⃣ *Daring* melalui menu layanan konsultasi — silakan ketik *3*  
2️⃣ *Langsung di kantor* — untuk kemudahan, silakan buat janji temu terlebih dahulu dengan mengetik *6*

────────────  
✅ *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
}


  async janjitemu(request) {
    const user = request.number;
    if (allowedSessions.has(user)) return;
    return this.replyWithFooter(`📅 *Janji Temu Pelayanan Statistik*

Untuk membuat janji temu, silakan koordinasikan terlebih dahulu dengan PeTik (Petugas Statistik) BPS Kabupaten Kepahiang.

Ketik : *Buat Janji* 
untuk memulai proses koordinasi.`);
  }

  async pengaduan(request) {
    const user = request.number;
    if (allowedSessions.has(user)) return;
    return this.replyWithFooter(`📢 *Layanan Pengaduan*

Apabila Sahabat Data mengalami atau mengetahui hal yang tidak sesuai dengan standar pelayanan BPS, seperti:

• Perekrutan mitra statistik yang tidak transparan  
• Layanan statistik yang dipungut biaya (padahal semestinya gratis)  
• Praktik gratifikasi, korupsi, kolusi, atau penyalahgunaan kekuasaan  
• Pelayanan yang tidak profesional atau merugikan publik

Silakan sampaikan laporan Anda secara resmi melalui kanal nasional:
🔗 https://www.lapor.go.id

Kami menjamin kerahasiaan identitas pelapor dan menindaklanjuti setiap laporan sesuai ketentuan yang berlaku.

📌 Mari bersama jaga integritas dan kualitas pelayanan publik!

────────────  
✅ *Sudah selesai?*  
Ketik *8* untuk menutup sesi layanan.`);
  }

  async selesaimenu(request) {
    const user = request.number;
    if (allowedSessions.has(user)) return;
    await this.replyWithFooter(`🎉 *Terima Kasih telah menggunakan layanan Tikko!*

Kami harap informasi yang Anda peroleh bermanfaat.

Untuk membantu kami meningkatkan layanan dan menyediakan data yang lebih sesuai kebutuhan Sahabat Data, silakan isi *Survei Kebutuhan Data* melalui tautan berikut:
🔗 https://s.bps.go.id/SKD2025_1708

Sampai jumpa di layanan berikutnya!`);
    
  }

  async hubungiPetugas(request) {
    const userNumber = request.number;
    const userName = request.name;
    const petugasNumber = "62895413640333"; // Tanpa @c.us, pepesan handle otomatis

    console.log("[HUBUNGI PETUGAS] Permintaan dari:", userNumber);

    // 1. Balas ke user
    await this.reply(`🙏 *Terima kasih telah menghubungi PeTik (Petugas Statistik).*
Mohon tunggu sebentar, Sahabat Data sedang dihubungkan dengan petugas statistik yang bertugas.`);

    // 2. Kirim ke petugas
    try {
      await this.send(petugasNumber, [
         `*Permintaan Konsultasi Statistik*
  👤 Nama  : *${userName}*
  📱 Nomor : ${userNumber}
  
  Pengguna memerlukan bantuan terkait statistik melalui *Tikko*.
  Mohon segera ditindaklanjuti melalui WA Web.`
      ]);
      console.log("[HUBUNGI PETUGAS] Notifikasi berhasil dikirim.");
    } catch (err) {
      console.error("[HUBUNGI PETUGAS] Gagal kirim ke petugas:", err);
    }

    // 3. Tambahkan ke sesi aktif agar tidak di-auto-reply
    allowedSessions.add(request.number);
    console.log("[HUBUNGI PETUGAS] Sesi aktif sekarang:", [...allowedSessions]);
  }

  async hubungiPetugas2(request) {
    const userNumber = request.number;
    const userName = request.name;
    const petugasNumber = "62895366006564"; // Tanpa @c.us, pepesan handle otomatis

    console.log("[HUBUNGI PETUGAS] Permintaan dari:", userNumber);

    // 1. Balas ke user
    await this.reply(`🙏 *Terima kasih telah menghubungi PeTik (Petugas Statistik).*
Mohon tunggu sebentar, Sahabat Data sedang dihubungkan dengan petugas statistik yang bertugas.`);
await this.reply(`📅 *Sembari menunggu petugas*, mohon informasikan beberapa hal berikut untuk penjadwalan janji temu:

1️⃣ *Nama lengkap* :  
2️⃣ *Keperluan janji temu* :  
3️⃣ *Hari, tanggal, dan jam yang diinginkan* :
   (contoh: Selasa, 16 Juli 2025, pukul 10.00 WIB)

Silakan balas dengan format lengkap agar kami dapat menjadwalkan janji temu Anda.`);

    // 2. Kirim ke petugas
    try {
      await this.send(petugasNumber, [
         `📅 *Permintaan Janji Temu Statistik*
  👤 Nama  : *${userName}*
  📱 Nomor : ${userNumber}
  
  Pengguna mengajukan janji temu melalui *Tikko*.,
  Mohon bantu konfirmasi waktu dan keperluan layanan melalui WA Web.`
      ]);
      console.log("[HUBUNGI PETUGAS] Notifikasi berhasil dikirim.");
    } catch (err) {
      console.error("[HUBUNGI PETUGAS] Gagal kirim ke petugas:", err);
    }

    // 3. Tambahkan ke sesi aktif agar tidak di-auto-reply
    allowedSessions.add(request.number);
    console.log("[HUBUNGI PETUGAS] Sesi aktif sekarang:", [...allowedSessions]);

    return "Kamu telah terhubung ke petugas.";
  }


  async selesai(request) {
  const from = request.number;
  const name = request.name;
  const number = request.number;

  // Hapus dari sesi konsultasi agar bisa auto-reply lagi
  const wasInSession = allowedSessions.delete(from);
  console.log("[SELESAI] Autoreply diaktifkan kembali untuk:", from);

  if (wasInSession) {

  await logToSheet({
    name,
    number,
    menu: "Layanan Konsultasi"
  });

    return `✅ *Sesi konsultasi telah ditutup.*

Terima kasih, *Sahabat Data*, atas percakapannya bersama PeTik (Petugas Statistik). 

Untuk membantu kami meningkatkan kualitas layanan dan penyediaan data, mohon luangkan waktu untuk mengisi *Survei Kebutuhan Data* melalui tautan berikut:
🔗 https://s.bps.go.id/SKD2025_1708

Tikko kini kembali ke mode auto-reply dan siap membantu kebutuhan statistik Anda berikutnya.`;

  } else {
    return `ℹ️ *Saat ini tidak ada sesi konsultasi yang aktif.*

Tikko sudah kembali ke mode auto-reply dan siap membantu kebutuhan statistik Anda berikutnya.`;
  }
}

async selesai2(request) {
  const from = request.number;

  // Hapus dari sesi konsultasi agar bisa auto-reply lagi
  const wasInSession = allowedSessions.delete(from);
  console.log("[SELESAI] Autoreply diaktifkan kembali untuk:", from);

  if (wasInSession) {
    return `✅ *Koordinasi janji temu telah selesai.*

Terima kasih, *Sahabat Data*, atas waktunya untuk berkoordinasi bersama PeTik (Petugas Statistik).

Tikko kini kembali ke mode auto-reply dan siap membantu keperluan statistik Anda berikutnya.`;

  } else {
    return `ℹ️ *Saat ini tidak ada sesi koordinasi janji temu yang aktif.*

Tikko sudah kembali ke mode auto-reply dan siap membantu kebutuhan statistik Anda berikutnya.`;
  }
}

};
