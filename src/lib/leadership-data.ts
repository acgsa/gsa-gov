import type { CategoryLeader } from "@/templates/categoryAccents";

import photoForst from "@/assets/images/LEADERSHIP/ph-EdwardForst-Administrator-742x960_041626.jpg";
import photoLynch from "@/assets/images/LEADERSHIP/mike-lynch-150x170.jpg";
import photoJapson from "@/assets/images/LEADERSHIP/ph-SaulJapson-150x170.jpg";
import photoStanton from "@/assets/images/LEADERSHIP/ph-LauraStanton-150x170_2.jpg";
import photoGelber from "@/assets/images/LEADERSHIP/ph-MichaelGelber-150x170.jpg";
import photoAllen from "@/assets/images/LEADERSHIP/ph-LarryAllen2-150x170.jpg";
import photoShive from "@/assets/images/LEADERSHIP/ph-DavidShive-150x170.jpg";
import photoJustice from "@/assets/images/LEADERSHIP/ph-GregJustice-150x170.jpg";
import photoIngrassia from "@/assets/images/LEADERSHIP/ph-PaulIngrassia-150x170.jpg";

const GSA_PHOTO = "https://www.gsa.gov/system/files/";

/**
 * GSA senior leadership roster — shared by the Media landing page and the
 * /resources/leadership subpage.
 */
export const GSA_LEADERSHIP: CategoryLeader[] = [
  {
    name: "Edward C. Forst",
    title: "Administrator",
    initials: "EF",
    photoSrc: photoForst,
    href: "/resources/leadership",
  },
  {
    name: "Michael Lynch",
    title: "Deputy Administrator",
    initials: "ML",
    photoSrc: photoLynch,
    href: "/resources/leadership",
  },
  {
    name: "Saul Japson",
    title: "Associate Deputy Administrator",
    initials: "SJ",
    photoSrc: photoJapson,
    href: "/resources/leadership",
  },
  {
    name: "Jillian Wyant",
    title: "Chief of Staff",
    initials: "JW",
    href: "/resources/leadership",
  },
  {
    name: "Laura Stanton",
    title: "Acting Commissioner, Federal Acquisition Service",
    initials: "LS",
    photoSrc: photoStanton,
    href: "/resources/leadership",
  },
  {
    name: "Michael Gelber",
    title: "Acting Commissioner, Public Buildings Service",
    initials: "MG",
    photoSrc: photoGelber,
    href: "/resources/leadership",
  },
  {
    name: "Larry Allen",
    title: "Associate Administrator, Office of Government-wide Policy",
    initials: "LA",
    photoSrc: photoAllen,
    href: "/resources/leadership",
  },
  {
    name: "Aluanda Drain",
    title: "Associate Administrator, Office of Civil Rights",
    initials: "AD",
    photoSrc: `${GSA_PHOTO}ph-AluandaDrain-150x170.jpg`,
    href: "/resources/leadership",
  },
  {
    name: "Robert J. Carter",
    title: "Associate Administrator, Office of Mission Assurance",
    initials: "RC",
    photoSrc: `${GSA_PHOTO}ph-RobertCarter-150x170.jpg`,
    href: "/resources/leadership",
  },
  {
    name: "Arron Helm",
    title: "Chief Human Capital Officer, Office of Human Resources Management",
    initials: "AH",
    photoSrc: `${GSA_PHOTO}Arron-Helm-150x170_0.jpg`,
    href: "/resources/leadership",
  },
  {
    name: "David A. Shive",
    title: "Chief Information Officer, Office of the Chief Information Officer",
    initials: "DS",
    photoSrc: photoShive,
    href: "/resources/leadership",
  },
  {
    name: "Nimisha Agarwal",
    title: "Chief Financial Officer, Office of the Chief Financial Officer",
    initials: "NA",
    photoSrc: `${GSA_PHOTO}ph-NimishaAgarwal-150x170.jpg`,
    href: "/resources/leadership",
  },
  {
    name: "Bob Stafford",
    title:
      "Chief Administrative Services Officer, Office of Administrative Services",
    initials: "BS",
    photoSrc: `${GSA_PHOTO}ph-BobStafford-150x170.jpg`,
    href: "/resources/leadership",
  },
  {
    name: "Greg Justice",
    title: "Associate Administrator, Office of Small Business",
    initials: "GJ",
    photoSrc: photoJustice,
    href: "/resources/leadership",
  },
  {
    name: "Paul Ingrassia",
    title: "Acting General Counsel, Office of General Counsel",
    initials: "PI",
    photoSrc: photoIngrassia,
    href: "/resources/leadership",
  },
  {
    name: "Robert C. Erickson",
    title: "Deputy Inspector General, Office of the Inspector General",
    initials: "RE",
    photoSrc: `${GSA_PHOTO}ph-RobertErickson-150x170.jpg`,
    href: "/resources/leadership",
  },
  {
    name: "Erica S. Beardsley",
    title: "Chair, Civilian Board of Contract Appeals",
    initials: "EB",
    photoSrc: `${GSA_PHOTO}ph-EricaBeardsley-150x170.jpg`,
    href: "/resources/leadership",
  },
];
