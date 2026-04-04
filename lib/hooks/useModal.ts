// Состояние меню/модалок на основе uiStore.
import { useCallback } from 'react';
import { useUiStore } from '@/store/uiStore';

export const useModal = () => {
  const {
    isBurgerMenuOpen,
    isUserPanelOpen,
    isUserSettingsModalOpen,
    isCategoriesModalOpen,
    isEditTransactionModalOpen,
    openBurgerMenu,
    closeBurgerMenu,
    toggleBurgerMenu,
    openUserPanel,
    closeUserPanel,
    toggleUserPanel,
    openUserSettingsModal,
    closeUserSettingsModal,
    openCategoriesModal,
    closeCategoriesModal,
    openEditTransactionModal,
    closeEditTransactionModal,
  } = useUiStore();

  const closeAllModals = useCallback(() => {
    closeBurgerMenu();
    closeUserPanel();
    closeUserSettingsModal();
    closeCategoriesModal();
    closeEditTransactionModal();
  }, [
    closeBurgerMenu,
    closeUserPanel,
    closeUserSettingsModal,
    closeCategoriesModal,
    closeEditTransactionModal,
  ]);

  return {
    isBurgerMenuOpen,
    isUserPanelOpen,
    isUserSettingsModalOpen,
    isCategoriesModalOpen,
    isEditTransactionModalOpen,
    openBurgerMenu,
    closeBurgerMenu,
    toggleBurgerMenu,
    openUserPanel,
    closeUserPanel,
    toggleUserPanel,
    openUserSettingsModal,
    closeUserSettingsModal,
    openCategoriesModal,
    closeCategoriesModal,
    openEditTransactionModal,
    closeEditTransactionModal,
    closeAllModals,
  };
};
