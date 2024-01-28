// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'elements',
      title: 'Elements',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'category',
          title: 'Category',
          type: 'item',
          url: '/home/category',
          target: false
        },
        {
          id: 'culture',
          title: 'Culture',
          type: 'item',
          url: '/home/culture',
          target: false
        },
        {
          id: 'ground-type',
          title: 'Ground Type',
          type: 'item',
          url: '/home/ground-type',
          target: false
        },
        {
          id: 'ressource',
          title: 'Ressource',
          type: 'item',
          url: '/home/ressource',
          target: false
        }
      ]
    }
  ]
};

export default pages;
