import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { USERS } from 'query/queryKeys';
import { restoreUser } from 'apis/user';

// toast
import ToastService from 'services/toast.service';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';
import strings from 'constants/strings';

const {
  buttons,
  pages: { user: userPageStrings }
} = strings;

const RestoreAuthor = ({ open, onClose, selectedItem }) => {
  const mutation = useMutation(restoreUser, {
    onMutate: async () => {},
    onError: async (err) => {
      ToastService.destroyAll();
      const message = getAPIErrorMessage(err);
      ToastService.error(`${userPageStrings.mutations.restoreFailed} ${selectedItem.name}, reason: ${message}`);
    },
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`${userPageStrings.mutations.restoreSuccess} ${selectedItem.name}`);
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
      <DialogTitle>{userPageStrings.restore}</DialogTitle>
      <DialogContent>
        {userPageStrings.prompt.restoreUser} &quot;{selectedItem.name}&quot;
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

RestoreAuthor.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default RestoreAuthor;
