import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// // sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const Category = Loadable(lazy(() => import('views/category')));
const Culture = Loadable(lazy(() => import('views/culture')));
const GroundType = Loadable(lazy(() => import('views/ground-type')));
const Ressource = Loadable(lazy(() => import('views/ressource')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/home',
  element: <MainLayout />,
  children: [
    {
      path: '/home',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'category',
      element: <Category />
    },
    {
      path: 'culture',
      element: <Culture />
    },
    {
      path: 'ground-type',
      element: <GroundType />
    },
    {
      path: 'ressource',
      element: <Ressource />
    }
  ]
};

export default MainRoutes;
