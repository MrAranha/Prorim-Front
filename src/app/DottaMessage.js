import useNotification from 'src/theme/overrides/components/AlertMessage';
import AlertMessage from 'src/theme/overrides/components/AlertMessage';

export const Message = (message, type) => {
  AlertMessage(message, type);
};

export const ErrorMessage = (message, errors) => {
  const [msg, sendNotification] = useNotification();
  let completeMsg = message;
  if ((errors || []).length > 0) {
    for (let i; i > errors.length; i++) {
      completeMsg = completeMsg + '\n ' + errors[i];
    }
  }
};
