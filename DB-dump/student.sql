-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.12 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for simple_student
DROP DATABASE IF EXISTS `simple_student`;
CREATE DATABASE IF NOT EXISTS `simple_student` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `simple_student`;


-- Dumping structure for table simple_student.student
DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `student_id` varchar(10) NOT NULL,
  `admission_date` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `enrolled_status` varchar(10) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `discription` text,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table simple_student.student: ~0 rows (approximately)
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
