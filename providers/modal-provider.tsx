"use client";
import AddTransaction from "@/components/Modals/AddTransaction/AddTransaction";
import EditTransaction from "@/components/Modals/EditTransaction/EditTransaction";
import LogoutModal from "@/components/Modals/LogoutModal/LogoutModal";
import ProfileSettings from "@/components/Modals/ProfileSettings/ProfileSettings";
import { useModal } from "@/lib/hooks/use-modal-store";

export const ModalProvider = () => {
  const { type, isOpen } = useModal();

  if (!isOpen) return null;

  return (
    <>
      {type === "ADD_TRANSACTION" && <AddTransaction />}
      {type === "EDIT_TRANSACTION" && <EditTransaction />}
      {type === "PROFILE_SETTINGS" && <ProfileSettings />}
      {type === "LOGOUT_CONFIRM" && <LogoutModal />}
    </>
  );
};
