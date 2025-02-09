import { create } from "zustand";
import FrontPage from "../components/Pages/FrontPage";
import { isEnvBrowser } from "../utils/misc";

export type AnimCategoryProps = {
  category: string;
  label: string;
  icon: string;
}

export type AnimationProps = {
  command: string;
  label: string;
  type: 'walk' | 'animation' | 'expression' | 'shared';
  category?: string;
  expressions?: string[];
  walks?: string[];
  pedTypes?: string[];
  animations?: {
    name: string;
    dict: string;
    label?: string;
  }[];
}

type AnimationStoreProps = {
    // Add your store properties here
  open: boolean;
  sequenceBox?: boolean;
  pageId: string;
  page: React.ReactNode;
  categories: AnimCategoryProps[];
  animations: AnimationProps[];
  setPage: (page: React.ReactNode, pageId: string) => void;
} 

export const useAnimations = create<AnimationStoreProps>((set) => ({
  open: isEnvBrowser(),
  page: <FrontPage />,
  sequenceBox: false,
  pageId: 'front',
  categories: [
  ],

  animations: [
    {
      command: 'emote',
      label: 'SElf Thot Instagrams  sasasasas',
      category: 'vip',
      type: 'animation',
      animations: [
        {
          name: 'wave',
          dict: 'anim@mp_player_intcelebrationfemale@wave'
        },
        {
          name: 'wave',
          dict: 'anim@mp_player_intcelebrationfemale@wave'
        },
        {
          name: 'wave',
          dict: 'anim@mp_player_intcelebrationfemale@wave'
        },
        {
          name: 'wave',
          dict: 'anim@mp_player_intcelebrationfemale@wave'
        },
        {
          name: 'wave',
          dict: 'anim@mp_player_intcelebrationfemale@wave'
        },
        {
          name: 'wave2',
          dict: 'anim@mp_player_intcelebrationmale@wave'
        },
        {
          name: 'wave3',
          dict: 'anim@mp_player_intcelebrationpaired@wave'
        },
        {
          name: 'wave3',
          dict: 'anim@mp_player_intcelebrationpaired@wave'
        },
        {
          name: 'wave3',
          dict: 'anim@mp_player_intcelebrationpaired@wave'
        },
      ]
    },
    {
      command: 'emote',
      type: 'walk',
      label: 'Walking',
      category: 'emotes',
      walks: [
        'walk',
        'walk2',
        'walk3',
      ]
    },
    {
      command: 'emote',
      type: 'expression',
      label: 'Walking',
      category: 'emotes',
      expressions: [
        'walk',
        'walk2',
        'walk3',
      ]
    },
    {
      command: 'emote',
      type: 'shared',
      label: 'Walking',
      category: 'emotes',
      walks: [
        'walk',
        'walk2',
        'walk3',
      ]
    },


  ],

  setPage:(page: React.ReactNode, pageId: string) => set({ page, pageId }),
}))