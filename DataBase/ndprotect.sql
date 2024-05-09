-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 09 mai 2024 à 15:21
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ndprotect`
--

-- --------------------------------------------------------

--
-- Structure de la table `antiraid`
--

CREATE TABLE `antiraid` (
  `guildId` varchar(255) DEFAULT NULL,
  `antibot` varchar(255) NOT NULL DEFAULT 'on',
  `antiwebhook` varchar(255) NOT NULL DEFAULT 'on',
  `antiban` varchar(255) NOT NULL DEFAULT 'on',
  `antichannel` varchar(255) NOT NULL DEFAULT 'on',
  `antirole` varchar(255) NOT NULL DEFAULT 'on',
  `antiguild` varchar(255) NOT NULL DEFAULT 'on',
  `antiperm` varchar(255) NOT NULL DEFAULT 'on',
  `antispam` varchar(255) NOT NULL DEFAULT 'on',
  `antispamchannel` varchar(255) NOT NULL DEFAULT '[]',
  `antijoin` varchar(255) NOT NULL DEFAULT 'on',
  `antijoinlimite` varchar(255) NOT NULL DEFAULT '10',
  `antilink` varchar(255) DEFAULT 'on',
  `antilinkchannel` varchar(255) NOT NULL DEFAULT '[]',
  `antiinvite` varchar(255) NOT NULL DEFAULT 'on',
  `antiinvitechannel` varchar(255) NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bienvenue`
--

CREATE TABLE `bienvenue` (
  `guildId` varchar(255) DEFAULT NULL,
  `bvn` varchar(255) NOT NULL DEFAULT 'on',
  `bvnRole` varchar(255) NOT NULL DEFAULT '[]',
  `ghostping` varchar(255) NOT NULL DEFAULT 'on',
  `ghostpingchannel` varchar(255) NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bot`
--

CREATE TABLE `bot` (
  `guildId` varchar(255) DEFAULT NULL,
  `prefix` varchar(255) NOT NULL DEFAULT '.',
  `whitelist` varchar(255) NOT NULL DEFAULT '[]',
  `raidmode` varchar(255) NOT NULL DEFAULT 'off'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `logs`
--

CREATE TABLE `logs` (
  `guildId` varchar(255) DEFAULT NULL,
  `channelAntiraid` varchar(255) DEFAULT NULL,
  `channelMods` varchar(255) DEFAULT NULL,
  `channelMember` varchar(255) DEFAULT NULL,
  `channelGuild` varchar(255) DEFAULT NULL,
  `channelMessage` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `prevname`
--

CREATE TABLE `prevname` (
  `userId` varchar(255) DEFAULT NULL,
  `prevname` varchar(255) NOT NULL DEFAULT '[]',
  `timestamp` varchar(255) NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rolereact`
--

CREATE TABLE `rolereact` (
  `guildId` varchar(255) DEFAULT NULL,
  `channelId` varchar(255) DEFAULT NULL,
  `emoji` varchar(255) DEFAULT NULL,
  `messageId` varchar(255) DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilitaire`
--

CREATE TABLE `utilitaire` (
  `guildId` varchar(255) DEFAULT NULL,
  `developer` varchar(255) DEFAULT NULL,
  `staff` varchar(255) DEFAULT NULL,
  `partner` varchar(255) DEFAULT NULL,
  `bughunter1` varchar(255) DEFAULT NULL,
  `bughunter2` varchar(255) DEFAULT NULL,
  `hypesquad` varchar(255) DEFAULT NULL,
  `h1` varchar(255) DEFAULT NULL,
  `h2` varchar(255) DEFAULT NULL,
  `h3` varchar(255) DEFAULT NULL,
  `premium` varchar(255) DEFAULT NULL,
  `activedev` varchar(255) DEFAULT NULL,
  `certifiedmod` varchar(255) DEFAULT NULL,
  `rolestatut` varchar(255) DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `channelboost` varchar(255) DEFAULT NULL,
  `statutrole` varchar(255) NOT NULL DEFAULT 'on',
  `badgerole` varchar(255) NOT NULL DEFAULT 'on',
  `boost` varchar(255) NOT NULL DEFAULT 'on'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
