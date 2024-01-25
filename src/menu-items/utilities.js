// // assets
// import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// // constant
// const icons = {
//   IconTypography,
//   IconPalette,
//   IconShadow,
//   IconWindmill
// };

// // ==============================|| UTILITIES MENU ITEMS ||============================== //

// const utilities = {
//   id: 'utilities',
//   title: 'Utilities',
//   type: 'group',
//   children: [
//     {
//       id: 'util-typography',
//       title: 'Typography',
//       type: 'item',
//       url: '/utils/util-typography',
//       icon: icons.IconTypography,
//       breadcrumbs: false
//     },
//     {
//       id: 'util-color',
//       title: 'Color',
//       type: 'item',
//       url: '/utils/util-color',
//       icon: icons.IconPalette,
//       breadcrumbs: false
//     },
//     {
//       id: 'util-shadow',
//       title: 'Shadow',
//       type: 'item',
//       url: '/utils/util-shadow',
//       icon: icons.IconShadow,
//       breadcrumbs: false
//     },
//     {
//       id: 'icons',
//       title: 'Icons',
//       type: 'collapse',
//       icon: icons.IconWindmill,
//       children: [
//         {
//           id: 'tabler-icons',
//           title: 'Tabler Icons',
//           type: 'item',
//           url: '/icons/tabler-icons',
//           breadcrumbs: false
//         },
//         {
//           id: 'material-icons',
//           title: 'Material Icons',
//           type: 'item',
//           external: true,
//           target: '_blank',
//           url: 'https://mui.com/material-ui/material-icons/',
//           breadcrumbs: false
//         }
//       ]
//     }
//   ]
// };

// export default utilities;

// assets
import { IconBrandChrome, IconHelp, IconKey } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconKey };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/home/sample-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
