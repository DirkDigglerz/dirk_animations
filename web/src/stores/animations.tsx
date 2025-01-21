import { create } from "zustand";
import FrontPage from "../components/Pages/FrontPage";
import AnimationPage from "../components/Pages/Animations";
import { isEnvBrowser } from "../utils/misc";

export type AnimCategoryProps = {
  category: string;
  label: string;
  icon: string;
}

export type AnimationProps = {
  command: string;
  label: string;
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
  pageId: string;
  page: React.ReactNode;
  categories: AnimCategoryProps[];
  animations: AnimationProps[];
  setPage: (page: React.ReactNode, pageId: string) => void;
} 

export const useAnimations = create<AnimationStoreProps>((set) => ({
  open: isEnvBrowser(),
  page: <FrontPage />,
  pageId: 'front',
  categories: [
    {
      category: 'expressions',
      label: 'Expressions',
      icon: 'fa fa-smile'
    },
    {
      category: 'walks',
      label: 'Walks',
      icon: 'fa fa-walking'
    },
    {
      category: 'shared',
      label: 'Shared', 
      icon: 'fas fa-users',
    },
    {
      category: 'animals',
      label: 'Animals',
      icon: 'fa fa-paw'
    },
  ],

  animations: [
    {
      command: 'emote',
      label: 'SElf Thot Instagrams  sasasasas',
      category: 'emotes',
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
      label: 'Wave',
      category: 'emotes',
      animations: [
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
      label: 'Wave',
      category: 'emotes',
      animations: [
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

  ],

  setPage:(page: React.ReactNode, pageId: string) => set({ page, pageId }),
}))