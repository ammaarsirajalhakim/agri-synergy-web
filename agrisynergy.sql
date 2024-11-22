-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: agrisynergy
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detail_sawah`
--

DROP TABLE IF EXISTS `detail_sawah`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_sawah` (
  `id_lokasi` int NOT NULL AUTO_INCREMENT,
  `id_sawah` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `luas` decimal(10,2) NOT NULL,
  `jenis_tanah` varchar(255) NOT NULL,
  `hasil_panen` varchar(255) NOT NULL,
  `produksi` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  PRIMARY KEY (`id_lokasi`),
  KEY `id_sawah` (`id_sawah`),
  CONSTRAINT `detail_sawah_ibfk_1` FOREIGN KEY (`id_sawah`) REFERENCES `sawah` (`id_sawah`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_sawah`
--

LOCK TABLES `detail_sawah` WRITE;
/*!40000 ALTER TABLE `detail_sawah` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail_sawah` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dropship`
--

DROP TABLE IF EXISTS `dropship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dropship` (
  `id_dropship` int NOT NULL AUTO_INCREMENT,
  `id_produk` int NOT NULL,
  `id_user` int NOT NULL,
  `status` enum('menunggu','berhasil','batal') DEFAULT 'menunggu',
  `dropship` date NOT NULL,
  PRIMARY KEY (`id_dropship`),
  KEY `id_user` (`id_user`),
  KEY `id_produk` (`id_produk`),
  CONSTRAINT `dropship_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  CONSTRAINT `dropship_ibfk_2` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dropship`
--

LOCK TABLES `dropship` WRITE;
/*!40000 ALTER TABLE `dropship` DISABLE KEYS */;
/*!40000 ALTER TABLE `dropship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kalender`
--

DROP TABLE IF EXISTS `kalender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kalender` (
  `id_kalender` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `jenis` varchar(255) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `tanggal` date NOT NULL,
  `deskripsi` text NOT NULL,
  PRIMARY KEY (`id_kalender`),
  KEY `fk_kalender_user_id` (`id_user`),
  CONSTRAINT `fk_kalender_user_id` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kalender`
--

LOCK TABLES `kalender` WRITE;
/*!40000 ALTER TABLE `kalender` DISABLE KEYS */;
/*!40000 ALTER TABLE `kalender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keranjang`
--

DROP TABLE IF EXISTS `keranjang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keranjang` (
  `id_keranjang` int NOT NULL AUTO_INCREMENT,
  `id_produk` int NOT NULL,
  `id_user` int NOT NULL,
  `total_produk` int NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_keranjang`),
  KEY `id_user` (`id_user`),
  KEY `id_produk` (`id_produk`),
  CONSTRAINT `keranjang_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  CONSTRAINT `keranjang_ibfk_2` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keranjang`
--

LOCK TABLES `keranjang` WRITE;
/*!40000 ALTER TABLE `keranjang` DISABLE KEYS */;
/*!40000 ALTER TABLE `keranjang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `komunitas`
--

DROP TABLE IF EXISTS `komunitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `komunitas` (
  `id_komunitas` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `status` enum('like','dislike') DEFAULT NULL,
  `komen` text NOT NULL,
  PRIMARY KEY (`id_komunitas`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `komunitas_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `komunitas`
--

LOCK TABLES `komunitas` WRITE;
/*!40000 ALTER TABLE `komunitas` DISABLE KEYS */;
/*!40000 ALTER TABLE `komunitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `konsultasi`
--

DROP TABLE IF EXISTS `konsultasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `konsultasi` (
  `id_konsultasi` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `pertanyaan` text NOT NULL,
  `menjawab` text NOT NULL,
  `status` enum('buka','tutup') DEFAULT NULL,
  `tgl_masuk` date NOT NULL,
  `tgl_menjawab` date NOT NULL,
  PRIMARY KEY (`id_konsultasi`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `konsultasi_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `konsultasi`
--

LOCK TABLES `konsultasi` WRITE;
/*!40000 ALTER TABLE `konsultasi` DISABLE KEYS */;
/*!40000 ALTER TABLE `konsultasi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memesan`
--

DROP TABLE IF EXISTS `memesan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memesan` (
  `id_memesan` int NOT NULL AUTO_INCREMENT,
  `id_produk` int NOT NULL,
  `id_user` int NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `kuantitas` int NOT NULL,
  `tgl_memesan` date NOT NULL,
  `status` enum('pending','dikirim','berhasil','batal') DEFAULT 'pending',
  PRIMARY KEY (`id_memesan`),
  KEY `id_user` (`id_user`),
  KEY `id_produk` (`id_produk`),
  CONSTRAINT `memesan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  CONSTRAINT `memesan_ibfk_2` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memesan`
--

LOCK TABLES `memesan` WRITE;
/*!40000 ALTER TABLE `memesan` DISABLE KEYS */;
/*!40000 ALTER TABLE `memesan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengiriman`
--

DROP TABLE IF EXISTS `pengiriman`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengiriman` (
  `id_pengiriman` int NOT NULL AUTO_INCREMENT,
  `id_memesan` int NOT NULL,
  `status` enum('pending','berhasil','batal') DEFAULT 'pending',
  `tgl_pengiriman` date NOT NULL,
  `tgl_penerima` date NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_pengiriman`),
  KEY `id_memesan` (`id_memesan`),
  CONSTRAINT `pengiriman_ibfk_1` FOREIGN KEY (`id_memesan`) REFERENCES `memesan` (`id_memesan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengiriman`
--

LOCK TABLES `pengiriman` WRITE;
/*!40000 ALTER TABLE `pengiriman` DISABLE KEYS */;
/*!40000 ALTER TABLE `pengiriman` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produk`
--

DROP TABLE IF EXISTS `produk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produk` (
  `id_produk` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  `kuantitas` int NOT NULL,
  `deskripsi` text NOT NULL,
  `tanggal_diposting` date NOT NULL,
  `kategori` enum('hasil panen','peralatan','pertanian') DEFAULT NULL,
  PRIMARY KEY (`id_produk`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `produk_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produk`
--

LOCK TABLES `produk` WRITE;
/*!40000 ALTER TABLE `produk` DISABLE KEYS */;
/*!40000 ALTER TABLE `produk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id_review` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_produk` int NOT NULL,
  `rating` int NOT NULL,
  `koment` text NOT NULL,
  `tgl_masuk` date NOT NULL,
  PRIMARY KEY (`id_review`),
  KEY `id_user` (`id_user`),
  KEY `id_produk` (`id_produk`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riwayat_transaksi`
--

DROP TABLE IF EXISTS `riwayat_transaksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riwayat_transaksi` (
  `id_rt` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_pengiriman` int NOT NULL,
  `id_memesan` int NOT NULL,
  `metode_pembayaran` varchar(255) NOT NULL,
  PRIMARY KEY (`id_rt`),
  KEY `id_user` (`id_user`),
  KEY `id_memesan` (`id_memesan`),
  KEY `id_pengiriman` (`id_pengiriman`),
  CONSTRAINT `riwayat_transaksi_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  CONSTRAINT `riwayat_transaksi_ibfk_2` FOREIGN KEY (`id_memesan`) REFERENCES `memesan` (`id_memesan`),
  CONSTRAINT `riwayat_transaksi_ibfk_3` FOREIGN KEY (`id_pengiriman`) REFERENCES `pengiriman` (`id_pengiriman`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riwayat_transaksi`
--

LOCK TABLES `riwayat_transaksi` WRITE;
/*!40000 ALTER TABLE `riwayat_transaksi` DISABLE KEYS */;
/*!40000 ALTER TABLE `riwayat_transaksi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sawah`
--

DROP TABLE IF EXISTS `sawah`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sawah` (
  `id_sawah` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `lokasi` point NOT NULL,
  `tipe` varchar(255) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_sawah`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `sawah_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sawah`
--

LOCK TABLES `sawah` WRITE;
/*!40000 ALTER TABLE `sawah` DISABLE KEYS */;
/*!40000 ALTER TABLE `sawah` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `no_hp` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `katasandi` varchar(255) NOT NULL,
  `role` enum('petani','pembeli','ahli','admin','tengkulak') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'pembeli',
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'agrisynergy'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-22 17:05:27
