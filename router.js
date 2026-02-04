const { Router, Response } = require("pepesan");
const BotController = require("./controller/BotController");
const f = require("./utils/Formatter");

const router = new Router();

// Keyword angka menu utama
router.keyword("1", [BotController, "tentangBPS"]);
router.keyword("2", [BotController, "perpustakaan"]);
router.keyword("3", [BotController, "konsultasi"]);
router.keyword("4", [BotController, "rekomendasiSektoral"]);
router.keyword("5", [BotController, "faq"]);
router.keyword("6", [BotController, "janjitemu"]);
router.keyword("7", [BotController, "pengaduan"]);
router.keyword("8", [BotController, "selesaimenu"]);

router.keyword("21", [BotController, "publikasi"]);
router.keyword("22", [BotController, "datasatistik"]);

router.keyword("221", [BotController, "statistikSosial"]);
router.keyword("222", [BotController, "statistikEkonomi"]);
router.keyword("223", [BotController, "statistikLingkungan"]);

// Submenu Statistik Sosial (Statistik Demografi dan Sosial)
router.keyword("2211", [BotController, "sosialKependudukan"]);
router.keyword("2212", [BotController, "sosialTenagaKerja"]);
router.keyword("2213", [BotController, "sosialPendidikan"]);
router.keyword("2214", [BotController, "sosialKesehatan"]);
router.keyword("2215", [BotController, "sosialKonsumsi"]);
router.keyword("2216", [BotController, "sosialPerlindungan"]);
router.keyword("2217", [BotController, "sosialPemukiman"]);
router.keyword("2218", [BotController, "sosialKriminal"]);
router.keyword("2219", [BotController, "sosialBudaya"]);
router.keyword("22110", [BotController, "sosialPolitik"]);
router.keyword("22111", [BotController, "sosialWaktu"]);

// Submenu Statistik Ekonomi
router.keyword("2221", [BotController, "ekonomiMakro"]);
router.keyword("2222", [BotController, "ekonomiNeraca"]);
router.keyword("2223", [BotController, "ekonomiBisnis"]);
router.keyword("2224", [BotController, "ekonomiSektoral"]);
router.keyword("2225", [BotController, "ekonomiKeuanganPublik"]);
router.keyword("2226", [BotController, "ekonomiPerdagangan"]);
router.keyword("2227", [BotController, "ekonomiHarga"]);
router.keyword("2228", [BotController, "ekonomiTenagaKerja"]);
router.keyword("2229", [BotController, "ekonomiIptek"]);
router.keyword("22210", [BotController, "ekonomiPertanian"]);
router.keyword("22211", [BotController, "ekonomiEnergi"]);
router.keyword("22212", [BotController, "ekonomiIndustri"]);
router.keyword("22213", [BotController, "ekonomiTransportasi"]);
router.keyword("22214", [BotController, "ekonomiPariwisata"]);
router.keyword("22215", [BotController, "ekonomiFinansial"]);

// Submenu Statistik Lingkungan & Multidomain
router.keyword("2231", [BotController, "lingkungan"]);
router.keyword("2232", [BotController, "regionalAreaKecil"]);
router.keyword("2233", [BotController, "multiDomain"]);
router.keyword("2234", [BotController, "bukuTahunan"]);
router.keyword("2235", [BotController, "kemiskinanLintasSektor"]);
router.keyword("2236", [BotController, "genderKhusus"]);
router.keyword("2237", [BotController, "masyarakatInformasi"]);
router.keyword("2238", [BotController, "globalisasi"]);
router.keyword("2239", [BotController, "mdgs"]);
router.keyword("22310", [BotController, "berkelanjutan"]);
router.keyword("22311", [BotController, "kewirausahaan"]);

// FAQ (Pertanyaan yang Sering Diajukan)
router.keyword("51", [BotController, "faqApaItuBPS"]);
router.keyword("52", [BotController, "faqLayananBPS"]);
router.keyword("53", [BotController, "faqAksesData"]);
router.keyword("54", [BotController, "faqBiayaData"]);
router.keyword("55", [BotController, "faqKepahiangDalamAngka"]);
router.keyword("56", [BotController, "faqPerbedaanSensus"]);
router.keyword("57", [BotController, "faqPerbedaanData"]);
router.keyword("58", [BotController, "faqTidakMenemukanData"]);
router.keyword("59", [BotController, "faqPenggunaanData"]);
router.keyword("510", [BotController, "faqLowonganMagang"]);
router.keyword("511", [BotController, "faqKonsultasi"]);

// Menu lain
router.keyword("Buat Janji", [BotController, "hubungiPetugas2"]);
router.keyword("Tanya PeTik", [BotController, "hubungiPetugas"]);
router.keyword("menu", [BotController, "menu"]);
router.keyword("selesai konsultasi", [BotController, "selesai"]);
router.keyword("selesai janji", [BotController, "selesai2"]);

// Fallback
router.keyword("*", [BotController, "introduction"]);
module.exports = router;
