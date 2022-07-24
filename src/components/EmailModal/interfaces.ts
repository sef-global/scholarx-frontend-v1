export interface EmailModalProps {
  isModalVisible: boolean;
  onCancel: () => void | null;
  userEmail: string;
  onConfirm: () => void | null;
}
