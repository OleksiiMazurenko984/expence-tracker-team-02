"use client";
import { useModal } from "@/lib/hooks/use-modal-store";

function TestPage() {
  const { onOpen } = useModal();

  //? Це тестова сторінка просто щоб показати як викликати модалку на вашій сторінці
  //? просто на кнопку додаєте цю функцію і імпортуєте її зі стору
  //? передати потрібно рядок типу вашої модалки всі типи в файлі стору ModalType "../../providers/modal-provider.tsx"
  //? і папки з компонентами вашої модалки я вже додав

  return (
    <button style={{ color: "white" }} onClick={() => onOpen("LOGOUT_CONFIRM")}>
      Exit Account
    </button>
  );
}

export default TestPage;
