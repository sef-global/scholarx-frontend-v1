export interface EmailModalProps {
  isModalVisible: boolean;
  onCancel: () => void;
  userEmail: string;
  onConfirm: () => void;
}
