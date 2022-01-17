import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { USERS } from 'query/queryKeys';
import { deleteUser } from 'apis/user';

// toast
import ToastService from 'services/toast.service';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import strings from 'constants/strings';

const {
  buttons,
  pages: { user: userPageStrings }
} = strings;

const DeleteUser = ({ open, onClose, selectedItem }) => {
  const mutation = useMutation(deleteUser, {
    onMutate: async () => {},
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`${userPageStrings.mutations.deleteSuccess} ${selectedItem.name}`);
    },
    onError: async (err) => {
      ToastService.destroyAll();
      const message = getAPIErrorMessage(err);
      ToastService.success(`${userPageStrings.mutations.deleteFailed} ${selectedItem.name}, reason: ${message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries(USERS);
      onClose();
    }
  });
  const onSubmit = () => {
    mutation.mutate(selectedItem.id);
  };
  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle>{userPageStrings.delete}</DialogTitle>
      <DialogContent>
        {userPageStrings.prompt.deleteUser} &quot;{selectedItem.name}&quot;
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={mutation.isLoading}>
          {buttons.close}
        </Button>
        <Button onClick={onSubmit} disabled={mutation.isLoading}>
          {buttons.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteUser.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default DeleteUser;
