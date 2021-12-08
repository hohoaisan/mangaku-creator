import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { AUTHORS } from 'query/queryKeys';
import { restoreAuthor } from 'apis/author';

// toast
import ToastService from 'services/toast.service';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

const RestoreAuthor = ({ open, onClose, selectedItem }) => {
  const mutation = useMutation(restoreAuthor, {
    onMutate: async () => {},
    onError: async (err) => {
      ToastService.destroyAll();
      const message = getAPIErrorMessage(err);
      ToastService.success(`Unable to restore author ${selectedItem.name}, reason: ${message}`);
    },
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`Restored author ${selectedItem.name}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries(AUTHORS);
      onClose();
    }
  });
  const onSubmit = () => {
    mutation.mutate(selectedItem.id);
  };
  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle>Restore Author</DialogTitle>
      <DialogContent>Are you sure want to restore this author &quot;{selectedItem.name}&quot;</DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={mutation.isLoading}>
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={mutation.isLoading}>
          Confirm
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
