import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';
import { localStorageGetItem } from 'src/utils/storage-available';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  gear: icon('ic_gear'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

const role = localStorageGetItem('role');

export function useNavData() {
  const data =
    role === 'A'
      ? [
          // OVERVIEW
          // ----------------------------------------------------------------------

          {
            subheader: 'Menu',
            items: [{ title: 'Lembretes', path: paths.dashboard.root, icon: ICONS.dashboard }],
          },

          // MANAGEMENT
          // ----------------------------------------------------------------------
          {
            subheader: 'Administração',
            items: [
              {
                title: 'Usuários',
                path: paths.dashboard.group.root,
                icon: ICONS.user,
                children: [
                  {
                    title: 'Gerenciar Usuários',
                    path: paths.dashboard.group.usuarios,
                    icon: ICONS.gear,
                  },
                  {
                    title: 'Laudos',
                    path: paths.dashboard.laudos,
                    icon: ICONS.gear,
                  },
                  {
                    title: 'Receituário',
                    path: paths.dashboard.receituario,
                    icon: ICONS.gear,
                  },
                ],
              },
            ],
          },
        ]
      : [
          {
            subheader: 'Menu',
            items: [{ title: 'Lembretes', path: paths.dashboard.root, icon: ICONS.dashboard }],
          },
        ];
  return data;
}
