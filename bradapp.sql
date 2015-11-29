-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 29, 2015 at 04:52 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bradapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
`id` int(11) NOT NULL,
  `ttb` int(6) NOT NULL,
  `comment` varchar(250) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `submitted_by` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `ttb`, `comment`, `timestamp`, `submitted_by`) VALUES
(1, 123456, 'This is a test', '2015-11-18 19:44:00', 'Joe R'),
(2, 123456, 'This is another test', '2015-11-18 19:44:04', 'CJ Curtin'),
(3, 234567, 'This is an example of a longer comment.  I am the very model of a modern major general.  This is a no failed activation zone.  Starbucks is coming to an end.  I wonder how many characters this will be.', '2015-11-19 15:50:12', 'Joe Rasmussen'),
(4, 123456, 'This is an example of a longer comment.  I am the very model of a modern major general.  This is a no failed activation zone.  Starbucks is coming to an end.  I wonder how many characters this will be.', '2015-11-19 15:55:28', 'Michael Funches'),
(5, 234567, 'Yet Another Test', '2015-11-19 22:53:38', 'Joe Rasmussen'),
(6, 123456, 'More Tests', '2015-11-20 02:05:34', ''),
(7, 234567, 'Test 2', '2015-11-20 02:07:20', ''),
(8, 123456, 'Another test.', '2015-11-20 04:00:38', ''),
(9, 123456, 'Add another comment', '2015-11-20 06:42:39', ''),
(10, 123456, 'Test, test', '2015-11-20 21:37:15', 'Joe Rasmussen'),
(11, 123456, 'jjj', '2015-11-20 21:38:08', 'jjj'),
(12, 123456, 'Joe Rasmussen', '2015-11-23 20:53:06', 'Joe Rasmussen'),
(13, 548754, 'Test', '2015-11-24 19:33:30', 'Joe'),
(14, 548754, 'Second test', '2015-11-24 19:34:56', 'Joe Rasmussen'),
(15, 548754, 'Third time is a charm', '2015-11-24 19:36:04', 'Joe R'),
(16, 548754, 'And again', '2015-11-24 19:37:15', 'Joe R'),
(17, 123456, 'Test 814', '2015-11-24 19:45:07', 'Joe R');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE IF NOT EXISTS `tickets` (
  `ttb` int(6) NOT NULL,
  `eon` int(6) NOT NULL,
  `ops_console` int(7) NOT NULL,
  `company_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `submitted_by` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sla_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `owner` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `domintl` varchar(13) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `supporting` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `issue_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `closed` varchar(3) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'no',
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`ttb`, `eon`, `ops_console`, `company_name`, `submitted_by`, `sla_start`, `owner`, `domintl`, `supporting`, `issue_info`, `closed`, `updated`) VALUES
(123456, 12345, 1234567, 'Verizon', 'Joe Rasmussen', '2015-11-02 04:31:52', 'Brad Heritage', 'Domestic', 'Giancarlo Bonino', 'Down T1', 'no', '2015-11-24 19:22:47'),
(234567, 234567, 2345678, 'AT&T', 'Brad Heritage', '2015-11-02 04:32:08', 'Joe Rasmussen', 'International', 'Stan Bailey', 'Low AT&T Cradlepoint Speeds', 'no', '2015-11-24 19:22:51'),
(345678, 159485, 9536547, 'Starbucks', 'Joe Rasmussen', '2015-11-19 22:59:23', 'Daniel Lerner', 'Domestic', 'Matt Rodriguez', 'Granite Blows Goats', 'no', '2015-11-24 16:57:54'),
(548754, 459845, 1369845, 'Level 3 Communications', 'Joe Rasmussen', '2015-11-24 16:53:56', 'Brad Heritage', 'International', 'Michael Funches', 'Test Case 57', 'no', '2015-11-24 16:58:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
 ADD PRIMARY KEY (`id`), ADD KEY `ttb` (`ttb`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
 ADD PRIMARY KEY (`ttb`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
ADD CONSTRAINT `ttb` FOREIGN KEY (`ttb`) REFERENCES `tickets` (`ttb`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
