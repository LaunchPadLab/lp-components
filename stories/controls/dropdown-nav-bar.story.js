import React from 'react'
import { storiesOf } from '@storybook/react'
import { DropdownNavBar as StaticDropdownNavBar } from 'src'
import dynamicInput from '../dynamic-input'

const DropdownNavBar = dynamicInput({})(StaticDropdownNavBar)

const mainPaths = {
  Exp: { name: 'Experiences', path: 'experiences-australia-zoo' },
  Wild: { name: 'Wildlife', path: 'wildlife' },
  Visit: { name: 'Visit Us', path: 'visit-us' },
  About: { name: 'About Us', path: 'about-us' },
}

const menuItems = [
  {
    name: mainPaths.Exp.name,
    id: 1613,
    path: mainPaths.Exp.path,
    imageId: 1675,
    imagePath: 'wp-content/uploads/2019/01/EXPERIENCES3-1.jpg',
    childItems: [
      {
        name: 'Animal Encounters',
        id: 1614,
        path: `${mainPaths.Exp.path}/animal-encounters/`,
      },
      {
        name: 'Zoo Keeper for a Day',
        id: 1615,
        path: `${mainPaths.Exp.path}/zoo-keeper-for-a-day/`,
      },
      {
        name: 'Wildlife Photos',
        id: 1616,
        path: `${mainPaths.Exp.path}/wildlife-photos/`,
      },
      {
        name: 'Exhibits',
        id: 1617,
        path: `${mainPaths.Exp.path}/exhibits/`,
      },
      {
        name: 'Conservation Shows',
        id: 1618,
        path: `${mainPaths.Exp.path}/show-times/`,
      },
      {
        name: 'Tours',
        id: 1619,
        path: `${mainPaths.Exp.path}/tours/`,
      },
      {
        name: 'Expeditions',
        id: 2823,
        path: `${mainPaths.Exp.path}/australia-zoo-expeditions/`,
      },
      {
        name: 'Gift Ideas',
        id: 2393,
        path: `${mainPaths.Exp.path}/gift-ideas/`,
      },
    ],
  },
  {
    name: mainPaths.Wild.name,
    id: 1622,
    path: mainPaths.Wild.path,
    imageId: 1674,
    imagePath: 'wp-content/uploads/2019/01/WILDLIFE3.jpg',
    childItems: [
      {
        name: 'Our Animals',
        id: 1623,
        path: `${mainPaths.Wild.path}/our-animals/`,
      },
      {
        name: 'Zoo Flora',
        id: 1624,
        path: `${mainPaths.Wild.path}/zoo-flora/`,
      },
      {
        name: 'Top 10 Highlights',
        id: 1625,
        path: `${mainPaths.Wild.path}/top-10-highlights/`,
      },
    ],
  },
  {
    name: mainPaths.Visit.name,
    id: 1626,
    path: mainPaths.Visit.path,
    imageId: 1673,
    imagePath: 'wp-content/uploads/2019/01/VISIT_US3.jpg',
    childItems: [
      {
        name: 'Tickets',
        id: 1680,
        path: `https://tickets.australiazoo.com.au`,
      },
      {
        name: 'Annual Pass',
        id: 1681,
        path: `${mainPaths.Visit.path}/annual-pass/`,
      },
      {
        name: 'Zoo Map',
        id: 1627,
        path: `${mainPaths.Visit.path}/zoo-map/`,
      },
      {
        name: 'Event Calendar',
        id: 1628,
        path: `${mainPaths.Visit.path}/event-calendar/`,
      },
      {
        name: 'How to Get Here',
        id: 1629,
        path: `${mainPaths.Visit.path}/how-to-get-here/`,
      },
      {
        name: 'Plan Your Day',
        id: 1678,
        path: `${mainPaths.Visit.path}/plan-your-day/`,
      },
      {
        name: 'Where to Eat',
        id: 1630,
        path: `${mainPaths.Visit.path}/where-to-eat/`,
      },
      {
        name: 'Where to Shop',
        id: 1631,
        path: `${mainPaths.Visit.path}/where-to-shop/`,
      },
      {
        name: 'Where to Stay',
        id: 1632,
        path: `${mainPaths.Visit.path}/where-to-stay/`,
      },
      {
        name: 'How to Prepare',
        id: 1633,
        path: `${mainPaths.Visit.path}/how-to-prepare/`,
      },
      {
        name: 'Services and Facilities',
        id: 1676,
        path: `${mainPaths.Visit.path}/services-facilities/`,
      },
      {
        name: 'Birthday Club',
        id: 2169,
        path:
          'https://onlinesales.centaman.net/AustraliaZoo/JoinTheClub/BirthdayClub/tabid/72/Default.aspx',
      },
      {
        name: 'Chinese Information',
        id: 1677,
        path: `${mainPaths.Visit.path}/chinese-information/`,
      },
    ],
  },
  {
    name: mainPaths.About.name,
    id: 1634,
    path: mainPaths.About.path,
    imageId: 1672,
    imagePath: 'wp-content/uploads/2019/01/ABOUT_US3.jpg',
    childItems: [
      {
        name: 'The Irwin Family',
        id: 1635,
        path: `${mainPaths.About.path}/the-irwins/`,
      },
      {
        name: 'History',
        id: 1637,
        path: `${mainPaths.About.path}/history/`,
      },
      {
        name: 'Awards',
        id: 3222,
        path: `${mainPaths.About.path}/awards/`,
      },
      {
        name: 'Our Mission',
        id: 1638,
        path: `${mainPaths.About.path}/our-mission/`,
      },
      {
        name: 'Community Partners',
        id: 1679,
        path: `${mainPaths.About.path}/community-partners/`,
      },
      {
        name: 'Our Sponsors',
        id: 1640,
        path: `${mainPaths.About.path}/our-sponsors/`,
      },
      {
        name: 'Employment',
        id: 1932,
        path: `${mainPaths.About.path}/employment/`,
      },
      {
        name: 'Media Resources / Enquiry',
        id: 1688,
        path: `${mainPaths.About.path}/media-enquiry/`,
      },
      {
        name: 'Crikey Magazine',
        id: 1686,
        path: `${mainPaths.About.path}/crikey-mag/`,
      },
      {
        name: 'Crikey! Club',
        id: 1755,
        path: `https://crikeyclub.com.au/login.php`,
      },
      {
        name: 'FAQs',
        id: 1636,
        path: `${mainPaths.About.path}/faq/`,
      },
      {
        name: 'Contact Us',
        id: 1657,
        path: 'contact/',
      },
    ],
  },
]

storiesOf('DropdownNavBar', module).add('default', () => (
  <DropdownNavBar
    baseUrl="https://www.australiazoo.com.au"
    menuItems={menuItems}
  />
))
