import { useState } from 'react';

export function useModal() {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    message: "",
    type: "success"
  });

  const showModal = (message, type = "success") => {
    setModalConfig({ isOpen: true, message, type });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  return { modalConfig, showModal, closeModal };
}